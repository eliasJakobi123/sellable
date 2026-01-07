# 🔑 Price IDs aus Stripe Dashboard holen

Da die automatische Abfrage nicht funktioniert, hole die Price IDs manuell:

## Methode 1: Stripe Dashboard (Empfohlen)

1. Gehe zu: https://dashboard.stripe.com/test/products
2. Klicke auf jedes Produkt:
   - **Starter** (prod_TjnN5vARA7EvQR)
   - **Professional** (prod_TjnNpVXweLVQmA)
   - **Enterprise** (prod_TjnNQhOxm33DwP)
3. Unter "Pricing" siehst du die Price IDs (beginnen mit `price_`)
4. Kopiere die monatliche Price ID für jeden Plan

## Methode 2: Stripe CLI

```bash
# Installiere Stripe CLI falls nicht vorhanden
# https://stripe.com/docs/stripe-cli

# Login
stripe login

# Liste alle Prices für Starter
stripe prices list --product prod_TjnN5vARA7EvQR

# Liste alle Prices für Professional
stripe prices list --product prod_TjnNpVXweLVQmA

# Liste alle Prices für Enterprise
stripe prices list --product prod_TjnNQhOxm33DwP
```

## Methode 3: Script lokal ausführen

Falls du Stripe lokal installiert hast:

```bash
STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY_HERE node scripts/get-stripe-prices.js
```

## Was du brauchst:

Nach dem Holen der Price IDs, trage sie in `.env.local` ein:

```
NEXT_PUBLIC_STRIPE_PRICE_STARTER=price_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL=price_xxxxx
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE=price_xxxxx
```

## Publishable Key holen:

1. Gehe zu: https://dashboard.stripe.com/test/apikeys
2. Kopiere den "Publishable key" (beginnt mit `pk_test_`)
3. Trage ihn in `.env.local` ein als `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

