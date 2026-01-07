#!/bin/bash

# Setup Environment Variables Script
# Erstellt .env.local mit allen notwendigen Stripe-Konfigurationen

echo "🔧 Setting up .env.local file..."
echo ""

# Prüfe ob .env.local bereits existiert
if [ -f .env.local ]; then
  echo "⚠️  .env.local already exists!"
  read -p "Do you want to overwrite it? (y/N): " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
  fi
fi

# Erstelle .env.local
cat > .env.local << 'ENVEOF'
# Supabase Configuration
# Fülle diese Werte aus deinem Supabase Dashboard
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY_HERE

# Stripe Publishable Key - Hole aus: https://dashboard.stripe.com/test/apikeys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE

# Stripe Price IDs - Hole aus Stripe Dashboard
# Gehe zu: https://dashboard.stripe.com/test/products
# Klicke auf jedes Produkt und kopiere die Price ID (beginnt mit price_)
# Starter: prod_TjnN5vARA7EvQR
NEXT_PUBLIC_STRIPE_PRICE_STARTER=price_XXXXX
# Professional: prod_TjnNpVXweLVQmA
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL=price_XXXXX
# Enterprise: prod_TjnNQhOxm33DwP
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE=price_XXXXX

# Stripe Webhook Secret - Wird nach Webhook-Erstellung generiert
# Run: STRIPE_SECRET_KEY=sk_test_... WEBHOOK_URL=https://... node scripts/setup-stripe-webhooks.js
STRIPE_WEBHOOK_SECRET=whsec_XXXXX

# OpenAI (falls benötigt)
OPENAI_API_KEY=your_openai_key_here
ENVEOF

echo "✅ .env.local created!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Fülle die Supabase Keys aus (falls noch nicht vorhanden)"
echo "2. Hole den Stripe Publishable Key:"
echo "   https://dashboard.stripe.com/test/apikeys"
echo "3. Hole die Price IDs:"
echo "   https://dashboard.stripe.com/test/products"
echo "   - Klicke auf jedes Produkt"
echo "   - Kopiere die Price ID (beginnt mit price_)"
echo ""
echo "📖 Siehe auch: GET_PRICE_IDS.md für detaillierte Anleitung"
echo ""

