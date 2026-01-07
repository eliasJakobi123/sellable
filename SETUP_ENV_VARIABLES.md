# 🔧 Environment Variables Setup

## Was du brauchst:

1. **Stripe Secret Key** ✅ (hast du bereits)
2. **Stripe Publishable Key** - Hole aus: https://dashboard.stripe.com/test/apikeys
3. **Stripe Price IDs** - Siehe `GET_PRICE_IDS.md`
4. **Supabase Keys** - Falls noch nicht vorhanden

## Schnell-Setup:

### 1. Erstelle `.env.local` Datei im Root-Verzeichnis:

```bash
# Kopiere diese Datei und fülle die Werte aus
cp .env.local.example .env.local
```

### 2. Fülle die Werte aus:

```bash
# Supabase (falls noch nicht vorhanden)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Stripe (bereits vorhanden)
STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY_HERE

# Stripe Publishable Key (hole aus Dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Stripe Price IDs (siehe GET_PRICE_IDS.md)
NEXT_PUBLIC_STRIPE_PRICE_STARTER=price_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL=price_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE=price_xxxxx

# Stripe Webhook Secret (nach Webhook-Erstellung)
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

### 3. Price IDs holen:

**Option A: Stripe Dashboard (Empfohlen)**
1. Gehe zu: https://dashboard.stripe.com/test/products
2. Klicke auf jedes Produkt und kopiere die Price ID

**Option B: Script lokal ausführen**
```bash
STRIPE_SECRET_KEY=sk_test_... node scripts/get-stripe-prices.js
```

### 4. Publishable Key holen:

1. Gehe zu: https://dashboard.stripe.com/test/apikeys
2. Kopiere den "Publishable key" (beginnt mit `pk_test_`)

## ✅ Fertig!

Nach dem Ausfüllen sollte alles funktionieren.

