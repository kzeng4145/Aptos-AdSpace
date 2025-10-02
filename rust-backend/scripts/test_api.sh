#!/bin/bash

# AdSpace Backend API Test Script
echo "🎯 Testing AdSpace Backend API"
echo "================================"

BASE_URL="http://localhost:3001"

# Test health endpoint
echo "1. Testing health endpoint..."
curl -s "$BASE_URL/health" | jq '.' || echo "Health check failed"

echo -e "\n2. Testing creators endpoint..."
curl -s "$BASE_URL/creators" | jq '.' || echo "Creators endpoint failed"

echo -e "\n3. Testing ad slots endpoint..."
curl -s "$BASE_URL/ad-slots" | jq '.' || echo "Ad slots endpoint failed"

echo -e "\n4. Testing bid creation..."
curl -s -X POST "$BASE_URL/bids" \
  -H "Content-Type: application/json" \
  -d '{
    "ad_slot_id": "650e8400-e29b-41d4-a716-446655440000",
    "bidder_address": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    "amount": 0.05,
    "currency": "ETH"
  }' | jq '.' || echo "Bid creation failed"

echo -e "\n5. Testing analytics endpoint..."
curl -s "$BASE_URL/analytics/550e8400-e29b-41d4-a716-446655440000" | jq '.' || echo "Analytics endpoint failed"

echo -e "\n✅ API testing completed!"
