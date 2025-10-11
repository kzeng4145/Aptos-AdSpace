-- Create creators table
CREATE TABLE creators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    subscribers BIGINT NOT NULL DEFAULT 0,
    engagement_rate DECIMAL(5,2) NOT NULL DEFAULT 0.0,
    verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ad_slots table
CREATE TABLE ad_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID NOT NULL REFERENCES creators(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL, -- seconds
    platform VARCHAR(50) NOT NULL,
    current_bid DECIMAL(18,8) NOT NULL DEFAULT 0.0,
    currency VARCHAR(10) NOT NULL DEFAULT 'ETH',
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bids table
CREATE TABLE bids (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ad_slot_id UUID NOT NULL REFERENCES ad_slots(id),
    bidder_address VARCHAR(42) NOT NULL, -- Ethereum address
    amount DECIMAL(18,8) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'ETH',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    transaction_hash VARCHAR(66), -- Ethereum transaction hash
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics table
CREATE TABLE analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID NOT NULL REFERENCES creators(id),
    total_views BIGINT NOT NULL DEFAULT 0,
    total_engagement BIGINT NOT NULL DEFAULT 0,
    revenue DECIMAL(18,8) NOT NULL DEFAULT 0.0,
    successful_campaigns INTEGER NOT NULL DEFAULT 0,
    avg_engagement_rate DECIMAL(5,2) NOT NULL DEFAULT 0.0,
    period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_creators_platform ON creators(platform);
CREATE INDEX idx_creators_verified ON creators(verified);
CREATE INDEX idx_ad_slots_status ON ad_slots(status);
CREATE INDEX idx_ad_slots_expires_at ON ad_slots(expires_at);
CREATE INDEX idx_bids_ad_slot_id ON bids(ad_slot_id);
CREATE INDEX idx_bids_bidder_address ON bids(bidder_address);
CREATE INDEX idx_bids_status ON bids(status);
CREATE INDEX idx_analytics_creator_id ON analytics(creator_id);

-- Insert sample creators
INSERT INTO creators (id, name, platform, subscribers, engagement_rate, verified) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Markiplier', 'YouTube', 378000000, 15.2, true),
('550e8400-e29b-41d4-a716-446655440001', 'Emma Chamberlain', 'YouTube', 12000000, 8.5, true),
('550e8400-e29b-41d4-a716-446655440002', 'MrBeast', 'YouTube', 200000000, 12.8, true),
('550e8400-e29b-41d4-a716-446655440003', 'Charli D''Amelio', 'TikTok', 150000000, 9.2, true),
('550e8400-e29b-41d4-a716-446655440004', 'Mark Rober', 'YouTube', 50000000, 11.5, true);

-- Insert sample ad slots
INSERT INTO ad_slots (id, creator_id, title, description, duration, platform, current_bid, currency, expires_at, status) VALUES
('650e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', '30 seconds on YouTube', 'Pre-roll ad slot for gaming content', 30, 'YouTube', 0.05, 'ETH', NOW() + INTERVAL '4 days 7 hours', 'active'),
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '15 seconds on TikTok', 'Sponsored content integration', 15, 'TikTok', 0.03, 'ETH', NOW() + INTERVAL '2 days 12 hours', 'active'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '60 seconds on YouTube', 'Main channel integration', 60, 'YouTube', 0.08, 'ETH', NOW() + INTERVAL '6 days 3 hours', 'active');

-- Insert sample analytics
INSERT INTO analytics (creator_id, total_views, total_engagement, revenue, successful_campaigns, avg_engagement_rate, period_start, period_end) VALUES
('550e8400-e29b-41d4-a716-446655440000', 2400000, 364800, 12.4, 15, 15.2, NOW() - INTERVAL '30 days', NOW()),
('550e8400-e29b-41d4-a716-446655440001', 1800000, 153000, 8.7, 12, 8.5, NOW() - INTERVAL '30 days', NOW()),
('550e8400-e29b-41d4-a716-446655440002', 5000000, 640000, 25.6, 28, 12.8, NOW() - INTERVAL '30 days', NOW());
