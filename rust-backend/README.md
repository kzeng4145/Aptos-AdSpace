# 🎯 AdSpace Backend - Rust API

A high-performance Rust backend for the decentralized ad marketplace, built with Axum and PostgreSQL.

## 🚀 Features

- **High-Performance API** - Built with Axum web framework
- **Database Integration** - PostgreSQL with SQLx
- **Blockchain Support** - Ethereum integration with ethers-rs
- **Real-time Analytics** - Creator performance tracking
- **Bid Management** - Decentralized bidding system
- **CORS Support** - Frontend integration ready

## 🛠️ Tech Stack

- **Framework**: Axum (async web framework)
- **Database**: PostgreSQL with SQLx
- **Blockchain**: Ethereum (ethers-rs)
- **Authentication**: JWT tokens
- **Serialization**: Serde
- **Async Runtime**: Tokio

## 📋 Prerequisites

- Rust 1.70+
- PostgreSQL 13+
- Node.js (for frontend integration)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install Rust (if not already installed)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install PostgreSQL
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql postgresql-contrib
```

### 2. Database Setup

```bash
# Create database
createdb adspace

# Run migrations
cd rust-backend
sqlx migrate run
```

### 3. Environment Configuration

```bash
# Copy environment file
cp env.example .env

# Edit with your configuration
nano .env
```

### 4. Run the Server

```bash
# Development mode
cargo run

# Production mode
cargo run --release
```

## 📡 API Endpoints

### Health & Status
- `GET /` - API information
- `GET /health` - Health check

### Creators
- `GET /creators` - List all creators
- `GET /creators/:id` - Get specific creator

### Ad Slots
- `GET /ad-slots` - List active ad slots
- `GET /ad-slots/:id` - Get specific ad slot

### Bidding
- `POST /bids` - Create new bid
- `GET /bids/:id` - Get bid details

### Analytics
- `GET /analytics/:creator_id` - Get creator analytics

## 🗄️ Database Schema

### Creators Table
```sql
CREATE TABLE creators (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    subscribers BIGINT NOT NULL,
    engagement_rate DECIMAL(5,2) NOT NULL,
    verified BOOLEAN NOT NULL
);
```

### Ad Slots Table
```sql
CREATE TABLE ad_slots (
    id UUID PRIMARY KEY,
    creator_id UUID REFERENCES creators(id),
    title VARCHAR(255) NOT NULL,
    duration INTEGER NOT NULL,
    current_bid DECIMAL(18,8) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) NOT NULL
);
```

### Bids Table
```sql
CREATE TABLE bids (
    id UUID PRIMARY KEY,
    ad_slot_id UUID REFERENCES ad_slots(id),
    bidder_address VARCHAR(42) NOT NULL,
    amount DECIMAL(18,8) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    status VARCHAR(20) NOT NULL,
    transaction_hash VARCHAR(66)
);
```

## 🔧 Development

### Running Tests
```bash
cargo test
```

### Database Migrations
```bash
# Create new migration
sqlx migrate add migration_name

# Run migrations
sqlx migrate run

# Revert migration
sqlx migrate revert
```

### Code Formatting
```bash
cargo fmt
```

### Linting
```bash
cargo clippy
```

## 🚀 Deployment

### Docker Deployment
```dockerfile
FROM rust:1.70 as builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/target/release/adspace-backend /usr/local/bin/
CMD ["adspace-backend"]
```

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `ETHEREUM_RPC_URL` - Ethereum RPC endpoint
- `JWT_SECRET` - JWT signing secret
- `PORT` - Server port (default: 3001)

## 🔗 Frontend Integration

The Rust backend is designed to work seamlessly with your Next.js frontend:

```typescript
// Example API call from frontend
const response = await fetch('http://localhost:3001/creators');
const creators = await response.json();
```

## 📊 Performance

- **High Throughput** - Handles thousands of requests per second
- **Low Latency** - Sub-millisecond response times
- **Memory Efficient** - Minimal memory footprint
- **Type Safe** - Compile-time error prevention

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.
