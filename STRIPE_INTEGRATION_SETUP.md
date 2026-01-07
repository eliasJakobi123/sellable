# 🚀 Stripe Integration Setup Guide

Komplette Anleitung zur Einrichtung der Stripe-Integration für Sellable.

## 📋 Übersicht

Die Stripe-Integration ist komplett implementiert und umfasst:

- ✅ Datenbank-Migrationen (subscriptions, usage_tracking)
- ✅ Backend API Routes (checkout, portal, webhook, subscription, usage)
- ✅ Rate Limiting in Product-Erstellung
- ✅ Frontend Subscription Settings
- ✅ Pricing-Seite Integration

## 🔧 Setup-Schritte

### 1. Datenbank-Migration ausführen

Führe die Migration in Supabase aus:

```sql
-- Siehe: supabase/migrations/008_stripe_subscriptions.sql
```

Oder führe die Migration über Supabase Dashboard aus.

### 2. Stripe Price IDs holen

Du hast bereits die Product IDs:
- Starter: `prod_TjnN5vARA7EvQR`
- Professional: `prod_TjnNpVXweLVQmA`
- Enterprise: `prod_TjnNQhOxm33DwP`

**Jetzt brauchst du die Price IDs:**

```bash
STRIPE_SECRET_KEY=sk_test_... node scripts/get-stripe-prices.js
```

Das Script gibt dir die Price IDs, die du in `.env.local` eintragen musst.

### 3. Environment Variables setzen

Füge diese zu deiner `.env.local` hinzu:

```bash
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE

# Stripe Price IDs (nach Ausführung von get-stripe-prices.js)
NEXT_PUBLIC_STRIPE_PRICE_STARTER=price_xxx
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL=price_yyy
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE=price_zzz

# Stripe Webhook Secret (nach Webhook-Erstellung)
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 4. Dependencies installieren

```bash
npm install stripe @stripe/stripe-js
```

### 5. Webhook einrichten

**Für lokale Entwicklung (mit ngrok):**

```bash
# 1. ngrok starten
ngrok http 3000

# 2. Webhook erstellen
STRIPE_SECRET_KEY=sk_test_... WEBHOOK_URL=https://xxx.ngrok.io/api/stripe/webhook node scripts/setup-stripe-webhooks.js

# 3. Webhook Secret in .env.local eintragen
```

**Für Produktion:**

```bash
STRIPE_SECRET_KEY=sk_... WEBHOOK_URL=https://your-domain.com/api/stripe/webhook node scripts/setup-stripe-webhooks.js
```

## 📊 Pläne und Limits

| Plan | Preis | Monatliches Limit |
|------|-------|-------------------|
| Free | $0 | 2 Produkte |
| Starter | $9 | 10 Produkte |
| Professional | $19 | 25 Produkte |
| Enterprise | $49 | 100 Produkte |

## 🔄 Workflow

### User Journey:

1. **Neuer User** meldet sich an → automatisch Free Plan (2 Produkte/Monat)
2. **Upgrade** über Settings → Stripe Checkout → automatische Limit-Erhöhung
3. **Downgrade/Cancel** über Stripe Customer Portal → automatische Limit-Senkung
4. **Monatliche Reset** → automatisch am 1. jedes Monats

### Rate Limiting:

- Vor jeder Produkt-Erstellung wird das monatliche Limit geprüft
- Bei Limit-Überschreitung: Fehlermeldung mit Upgrade-Hinweis
- Limits werden sofort angepasst bei Upgrade/Downgrade

## 🎯 Features

### Backend APIs:

- `/api/stripe/create-checkout-session` - Erstellt Stripe Checkout Session
- `/api/stripe/create-portal-session` - Öffnet Stripe Customer Portal
- `/api/stripe/webhook` - Verarbeitet Stripe Webhooks
- `/api/user/subscription` - Gibt Subscription-Info zurück
- `/api/user/usage` - Gibt Usage-Statistiken zurück

### Frontend:

- **Settings-Seite**: Subscription-Management mit Upgrade-Modal
- **Pricing-Seite**: Buttons leiten zu Settings/Auth weiter
- **Usage-Anzeige**: Zeigt verwendete/verbleibende Produkte

## 🧪 Testing

### Test-Scripts:

```bash
# Price IDs holen
STRIPE_SECRET_KEY=sk_test_... node scripts/get-stripe-prices.js

# Test-Subscription erstellen
STRIPE_SECRET_KEY=sk_test_... PRICE_ID=price_xxx node scripts/create-test-subscription.js

# Aufräumen
STRIPE_SECRET_KEY=sk_test_... node scripts/cleanup-stripe.js
```

### Manuelle Tests:

1. User anmelden → Free Plan
2. 2 Produkte erstellen → sollte funktionieren
3. 3. Produkt erstellen → sollte mit Limit-Fehler fehlschlagen
4. Upgrade zu Starter → Stripe Checkout
5. Nach Upgrade → 10 Produkte können erstellt werden
6. Customer Portal → Subscription verwalten

## ⚠️ Wichtige Hinweise

1. **Free Plan** braucht kein Stripe-Produkt - User können sich einfach anmelden
2. **Price IDs** müssen in Environment Variables gesetzt werden
3. **Webhook Secret** ist kritisch für Subscription-Updates
4. **Monatliche Resets** erfolgen automatisch am 1. jedes Monats
5. **Limits** werden sofort angepasst bei Plan-Änderungen

## 🐛 Troubleshooting

### "Price ID not configured"
→ Setze `NEXT_PUBLIC_STRIPE_PRICE_*` in `.env.local`

### "Webhook signature verification failed"
→ Überprüfe `STRIPE_WEBHOOK_SECRET` in `.env.local`

### "Monthly limit reached"
→ Normal bei Limit-Erreichung. Upgrade für mehr Produkte.

### Subscription wird nicht aktualisiert
→ Überprüfe Webhook-Endpunkt und Stripe Dashboard Logs

## 📚 Weitere Dokumentation

- Stripe Dashboard: https://dashboard.stripe.com/test
- Stripe API Docs: https://stripe.com/docs/api
- Scripts: `scripts/README-stripe.md`

---

**Viel Erfolg! 🚀**

