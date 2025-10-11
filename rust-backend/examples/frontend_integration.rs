// Example of how to integrate the Rust backend with your Next.js frontend

use reqwest;
use serde_json::Value;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = reqwest::Client::new();
    let base_url = "http://localhost:3001";

    // Example: Fetch creators from the backend
    println!("🎯 Fetching creators from AdSpace backend...");
    let creators_response = client
        .get(&format!("{}/creators", base_url))
        .send()
        .await?;
    
    let creators: Value = creators_response.json().await?;
    println!("Creators: {}", serde_json::to_string_pretty(&creators)?);

    // Example: Fetch ad slots
    println!("\n📺 Fetching ad slots...");
    let ad_slots_response = client
        .get(&format!("{}/ad-slots", base_url))
        .send()
        .await?;
    
    let ad_slots: Value = ad_slots_response.json().await?;
    println!("Ad Slots: {}", serde_json::to_string_pretty(&ad_slots)?);

    // Example: Create a bid
    println!("\n💰 Creating a bid...");
    let bid_data = serde_json::json!({
        "ad_slot_id": "650e8400-e29b-41d4-a716-446655440000",
        "bidder_address": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
        "amount": 0.05,
        "currency": "ETH"
    });

    let bid_response = client
        .post(&format!("{}/bids", base_url))
        .json(&bid_data)
        .send()
        .await?;
    
    let bid: Value = bid_response.json().await?;
    println!("Bid created: {}", serde_json::to_string_pretty(&bid)?);

    // Example: Fetch analytics
    println!("\n📊 Fetching analytics...");
    let analytics_response = client
        .get(&format!("{}/analytics/550e8400-e29b-41d4-a716-446655440000", base_url))
        .send()
        .await?;
    
    let analytics: Value = analytics_response.json().await?;
    println!("Analytics: {}", serde_json::to_string_pretty(&analytics)?);

    println!("\n✅ Frontend integration example completed!");
    Ok(())
}
