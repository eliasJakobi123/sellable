#!/bin/bash

# Quick setup script for Stripe products

echo "🚀 Setting up Stripe products for Sellable..."
echo ""

# Check if stripe is installed
if ! npm list stripe >/dev/null 2>&1; then
  echo "📦 Installing Stripe package..."
  npm install stripe
  echo ""
fi

# Your Stripe Secret Key
# Set this as an environment variable or replace with your key
export STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY:-sk_test_YOUR_STRIPE_SECRET_KEY_HERE}

# Create products
echo "🔧 Creating Stripe products..."
node scripts/create-stripe-products.js

echo ""
echo "✅ Done! Check the output above for Product IDs and Price IDs."
