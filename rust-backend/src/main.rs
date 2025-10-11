use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::Json,
    routing::{get, post},
    Router,
};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::TraceLayer;
use tracing_subscriber;

mod blockchain;
use blockchain::AdSpaceContract;

#[derive(Clone)]
pub struct AppState {
    pub db_pool: sqlx::PgPool,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Creator {
    pub id: String,
    pub name: String,
    pub platform: String,
    pub subscribers: u64,
    pub engagement_rate: f64,
    pub verified: bool,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct AdSlot {
    pub id: String,
    pub creator_id: String,
    pub title: String,
    pub description: String,
    pub duration: u32, // seconds
    pub platform: String,
    pub current_bid: f64,
    pub currency: String,
    pub expires_at: chrono::DateTime<chrono::Utc>,
    pub status: String, // "active", "completed", "cancelled"
}

#[derive(Serialize, Deserialize)]
pub struct Bid {
    pub id: String,
    pub ad_slot_id: String,
    pub bidder_address: String,
    pub amount: f64,
    pub currency: String,
    pub timestamp: chrono::DateTime<chrono::Utc>,
    pub status: String, // "pending", "accepted", "rejected"
}

#[derive(Serialize, Deserialize)]
pub struct CreateBidRequest {
    pub ad_slot_id: String,
    pub bidder_address: String,
    pub amount: f64,
    pub currency: String,
}

#[derive(Serialize, Deserialize)]
pub struct Analytics {
    pub creator_id: String,
    pub total_views: u64,
    pub total_engagement: u64,
    pub revenue: f64,
    pub successful_campaigns: u32,
    pub avg_engagement_rate: f64,
}

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt::init();

    // Load environment variables
    dotenv::dotenv().ok();

    // Database connection
    let database_url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "postgresql://localhost/adspace".to_string());
    
    let db_pool = sqlx::PgPool::connect(&database_url)
        .await
        .expect("Failed to connect to database");

    // Run migrations
    sqlx::migrate!("./migrations")
        .run(&db_pool)
        .await
        .expect("Failed to run migrations");

    let app_state = AppState { db_pool };

    // Build our application with routes
    let app = Router::new()
        .route("/", get(root))
        .route("/health", get(health_check))
        .route("/creators", get(get_creators))
        .route("/creators/:id", get(get_creator))
        .route("/ad-slots", get(get_ad_slots))
        .route("/ad-slots/:id", get(get_ad_slot))
        .route("/bids", post(create_bid))
        .route("/bids/:id", get(get_bid))
        .route("/analytics/:creator_id", get(get_analytics))
        .layer(
            CorsLayer::new()
                .allow_origin(Any)
                .allow_methods(Any)
                .allow_headers(Any),
        )
        .layer(TraceLayer::new_for_http())
        .with_state(app_state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3001")
        .await
        .unwrap();
    
    println!("🚀 AdSpace Backend running on http://0.0.0.0:3001");
    axum::serve(listener, app).await.unwrap();
}

async fn root() -> &'static str {
    "🎯 AdSpace Backend API - Decentralized Ad Marketplace"
}

async fn health_check() -> Json<serde_json::Value> {
    Json(serde_json::json!({
        "status": "healthy",
        "service": "adspace-backend",
        "version": "1.0.0"
    }))
}

async fn get_creators(State(state): State<AppState>) -> Result<Json<Vec<Creator>>, StatusCode> {
    let creators = sqlx::query_as!(
        Creator,
        "SELECT id, name, platform, subscribers, engagement_rate, verified FROM creators"
    )
    .fetch_all(&state.db_pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(creators))
}

async fn get_creator(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<Creator>, StatusCode> {
    let creator = sqlx::query_as!(
        Creator,
        "SELECT id, name, platform, subscribers, engagement_rate, verified FROM creators WHERE id = $1",
        id
    )
    .fetch_optional(&state.db_pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
    .ok_or(StatusCode::NOT_FOUND)?;

    Ok(Json(creator))
}

async fn get_ad_slots(State(state): State<AppState>) -> Result<Json<Vec<AdSlot>>, StatusCode> {
    let ad_slots = sqlx::query_as!(
        AdSlot,
        "SELECT id, creator_id, title, description, duration, platform, current_bid, currency, expires_at, status FROM ad_slots WHERE status = 'active'"
    )
    .fetch_all(&state.db_pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(ad_slots))
}

async fn get_ad_slot(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<AdSlot>, StatusCode> {
    let ad_slot = sqlx::query_as!(
        AdSlot,
        "SELECT id, creator_id, title, description, duration, platform, current_bid, currency, expires_at, status FROM ad_slots WHERE id = $1",
        id
    )
    .fetch_optional(&state.db_pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
    .ok_or(StatusCode::NOT_FOUND)?;

    Ok(Json(ad_slot))
}

async fn create_bid(
    State(state): State<AppState>,
    Json(payload): Json<CreateBidRequest>,
) -> Result<Json<Bid>, StatusCode> {
    let bid_id = uuid::Uuid::new_v4().to_string();
    let timestamp = chrono::Utc::now();

    let bid = sqlx::query_as!(
        Bid,
        "INSERT INTO bids (id, ad_slot_id, bidder_address, amount, currency, timestamp, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, ad_slot_id, bidder_address, amount, currency, timestamp, status",
        bid_id,
        payload.ad_slot_id,
        payload.bidder_address,
        payload.amount,
        payload.currency,
        timestamp,
        "pending"
    )
    .fetch_one(&state.db_pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(bid))
}

async fn get_bid(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<Bid>, StatusCode> {
    let bid = sqlx::query_as!(
        Bid,
        "SELECT id, ad_slot_id, bidder_address, amount, currency, timestamp, status FROM bids WHERE id = $1",
        id
    )
    .fetch_optional(&state.db_pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
    .ok_or(StatusCode::NOT_FOUND)?;

    Ok(Json(bid))
}

async fn get_analytics(
    State(state): State<AppState>,
    Path(creator_id): Path<String>,
) -> Result<Json<Analytics>, StatusCode> {
    let analytics = sqlx::query_as!(
        Analytics,
        "SELECT creator_id, total_views, total_engagement, revenue, successful_campaigns, avg_engagement_rate FROM analytics WHERE creator_id = $1",
        creator_id
    )
    .fetch_optional(&state.db_pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
    .ok_or(StatusCode::NOT_FOUND)?;

    Ok(Json(analytics))
}
