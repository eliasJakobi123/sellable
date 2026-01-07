# ⚡ Vercel Environment Variables - Quick Reference

## 📋 Alle Environment Variables für Vercel

Kopiere diese Liste und füge sie in **Vercel → Settings → Environment Variables** ein.

---

### ✅ Supabase (3 Variablen)

| Variable | Wert | Environments |
|----------|------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://akbuasvekhvsmfelfxrm.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Dein Supabase Anon Key | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | Dein Supabase Service Role Key | Production, Preview, Development |

---

### ✅ Stripe (6 Variablen)

| Variable | Wert | Environments |
|----------|------|--------------|
| `STRIPE_SECRET_KEY` | `sk_test_YOUR_STRIPE_SECRET_KEY_HERE` | Production, Preview, Development |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE` | Production, Preview, Development |
| `NEXT_PUBLIC_STRIPE_PRICE_STARTER` | `price_1SmJmUH4PAadPBVakV8maTos` | Production, Preview, Development |
| `NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL` | `price_1SmJmVH4PAadPBVaSwb41TvG` | Production, Preview, Development |
| `NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE` | `price_1SmJmWH4PAadPBVaP1GpxWhz` | Production, Preview, Development |
| `STRIPE_WEBHOOK_SECRET` | `whsec_XXXXX` (nach Webhook-Setup) | Production |

---

## 🎯 Gesamt: 9 Environment Variables

**Hinweis:** `STRIPE_WEBHOOK_SECRET` wird erst nach dem Webhook-Setup in Stripe hinzugefügt.

---

## 📝 Schritt-für-Schritt

1. Gehe zu **Vercel → Dein Projekt → Settings → Environment Variables**
2. Klicke auf **"Add New"**
3. Füge jede Variable aus der Tabelle oben hinzu
4. Wähle die entsprechenden **Environments** (siehe Tabelle)
5. Klicke auf **"Save"**
6. Wiederhole für alle 9 Variablen

---

## ⚠️ Wichtig

- **Secret Keys** (`STRIPE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_WEBHOOK_SECRET`) niemals im Client-Code verwenden!
- **NEXT_PUBLIC_*** Variablen sind im Browser sichtbar (sicher für öffentliche Keys)
- Nach dem Hinzufügen: **Redeploy** durchführen!

---

**Detaillierte Anleitung:** Siehe `VERCEL_ENV_VARIABLES.md`

