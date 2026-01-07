# 🔐 Vercel Environment Variables - Komplette Liste

Diese Datei enthält **ALLE** Environment Variables, die du in Vercel einrichten musst.

## 📋 Schnell-Referenz: Alle Variablen auf einen Blick

Kopiere diese Liste und füge jede Variable in Vercel → Settings → Environment Variables hinzu.

---

## 1. Supabase Configuration

### `NEXT_PUBLIC_SUPABASE_URL`
- **Typ:** Public (im Browser sichtbar)
- **Wert:** `https://akbuasvekhvsmfelfxrm.supabase.co` (oder deine Supabase URL)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- **Beschreibung:** Die URL deines Supabase-Projekts

### `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Typ:** Public (im Browser sichtbar)
- **Wert:** Dein Supabase Anon/Public Key (findest du in Supabase Dashboard → Settings → API)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- **Beschreibung:** Der öffentliche API-Key für Supabase (sicher für Client-Side)

### `SUPABASE_SERVICE_ROLE_KEY`
- **Typ:** Secret (nur Server-Side)
- **Wert:** Dein Supabase Service Role Key (findest du in Supabase Dashboard → Settings → API)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- **⚠️ WICHTIG:** Dieser Key hat Admin-Rechte! Niemals im Client-Code verwenden!

---

## 2. Stripe Configuration

### `STRIPE_SECRET_KEY`
- **Typ:** Secret (nur Server-Side)
- **Wert:** Dein Stripe Secret Key
  - Test: `sk_test_YOUR_STRIPE_SECRET_KEY_HERE`
  - Live: `sk_live_YOUR_STRIPE_SECRET_KEY_HERE` (für Production)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- **⚠️ WICHTIG:** Geheim halten! Niemals im Client-Code verwenden!
- **Wo finden:** Stripe Dashboard → Developers → API keys → Secret key

### `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Typ:** Public (im Browser sichtbar)
- **Wert:** Dein Stripe Publishable Key
  - Test: `pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE`
  - Live: `pk_live_YOUR_STRIPE_PUBLISHABLE_KEY_HERE` (für Production)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- **Beschreibung:** Der öffentliche Stripe-Key für Client-Side (sicher für Browser)
- **Wo finden:** Stripe Dashboard → Developers → API keys → Publishable key

---

## 3. Stripe Price IDs

### `NEXT_PUBLIC_STRIPE_PRICE_STARTER`
- **Typ:** Public (im Browser sichtbar)
- **Wert:** `price_1SmJmUH4PAadPBVakV8maTos`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- **Beschreibung:** Stripe Price ID für den Starter-Plan

### `NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL`
- **Typ:** Public (im Browser sichtbar)
- **Wert:** `price_1SmJmVH4PAadPBVaSwb41TvG`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- **Beschreibung:** Stripe Price ID für den Professional-Plan

### `NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE`
- **Typ:** Public (im Browser sichtbar)
- **Wert:** `price_1SmJmWH4PAadPBVaP1GpxWhz`
- **Environment:** ✅ Production, ✅ Preview, ✅ Development
- **Beschreibung:** Stripe Price ID für den Enterprise-Plan

---

## 4. Stripe Webhook Secret

### `STRIPE_WEBHOOK_SECRET`
- **Typ:** Secret (nur Server-Side)
- **Wert:** Dein Stripe Webhook Signing Secret (beginnt mit `whsec_`)
- **Environment:** ✅ Production (nur Production!)
- **⚠️ WICHTIG:** 
  - Dieser Wert wird nach dem Webhook-Setup in Stripe generiert
  - Nur für Production verwenden
  - Siehe "Stripe Webhook Setup" in `VERCEL_DEPLOYMENT.md`

---

## 📝 Schritt-für-Schritt Anleitung

### In Vercel einrichten:

1. Gehe zu deinem Vercel-Projekt
2. Klicke auf **Settings** → **Environment Variables**
3. Für jede Variable oben:
   - Klicke auf **"Add New"**
   - **Key:** Name der Variable (z.B. `NEXT_PUBLIC_SUPABASE_URL`)
   - **Value:** Der entsprechende Wert
   - **Environment:** Wähle die entsprechenden Environments (siehe oben)
   - Klicke auf **"Save"**

### Beispiel-Screenshot-Beschreibung:

```
┌─────────────────────────────────────────┐
│ Add Environment Variable                │
├─────────────────────────────────────────┤
│ Key: NEXT_PUBLIC_SUPABASE_URL          │
│ Value: https://akbuasvekhvsmfelfxrm... │
│                                         │
│ ☑ Production                            │
│ ☑ Preview                                │
│ ☑ Development                            │
│                                         │
│ [Cancel]  [Save]                        │
└─────────────────────────────────────────┘
```

---

## ✅ Checkliste

Nach dem Hinzufügen aller Variablen, prüfe:

- [ ] Alle 9 Variablen sind hinzugefügt
- [ ] `NEXT_PUBLIC_*` Variablen sind für alle Environments gesetzt
- [ ] Secret-Variablen (`STRIPE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_WEBHOOK_SECRET`) sind nur für Production/Preview gesetzt
- [ ] Alle Werte sind korrekt (keine Tippfehler)
- [ ] Keine Leerzeichen vor/nach den Werten
- [ ] Stripe Webhook Secret ist nach Webhook-Setup hinzugefügt

---

## 🔍 Wo finde ich die Werte?

### Supabase Keys:
1. Gehe zu [Supabase Dashboard](https://supabase.com/dashboard)
2. Wähle dein Projekt
3. Gehe zu **Settings** → **API**
4. Finde:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ Geheim!

### Stripe Keys:
1. Gehe zu [Stripe Dashboard](https://dashboard.stripe.com)
2. Gehe zu **Developers** → **API keys**
3. Finde:
   - **Secret key** → `STRIPE_SECRET_KEY` ⚠️ Geheim!
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Stripe Price IDs:
1. Gehe zu [Stripe Dashboard](https://dashboard.stripe.com)
2. Gehe zu **Products**
3. Klicke auf jedes Produkt → Finde die **Price ID** (beginnt mit `price_`)

### Stripe Webhook Secret:
1. Gehe zu [Stripe Dashboard](https://dashboard.stripe.com)
2. Gehe zu **Developers** → **Webhooks**
3. Klicke auf deinen Webhook-Endpoint
4. Finde **Signing secret** → `STRIPE_WEBHOOK_SECRET` ⚠️ Geheim!

---

## ⚠️ Sicherheitshinweise

1. **Niemals** Secret Keys im Client-Code verwenden
2. **Niemals** Secret Keys in Git committen (sind bereits in `.gitignore`)
3. **Niemals** Secret Keys öffentlich teilen
4. **Immer** Production und Test Keys getrennt halten
5. **Regelmäßig** Keys rotieren (besonders bei Sicherheitsvorfällen)

---

## 🆘 Häufige Fehler

### "Environment variable not found"
- Prüfe, ob die Variable in Vercel hinzugefügt wurde
- Prüfe, ob der Name exakt übereinstimmt (Groß-/Kleinschreibung!)
- Prüfe, ob die Variable für das richtige Environment gesetzt ist

### "Invalid API key"
- Prüfe, ob der Wert vollständig kopiert wurde (keine abgeschnittenen Werte)
- Prüfe, ob keine Leerzeichen vor/nach dem Wert sind
- Prüfe, ob du den richtigen Key verwendest (Test vs. Live)

### "Webhook signature verification failed"
- Prüfe, ob `STRIPE_WEBHOOK_SECRET` korrekt ist
- Prüfe, ob der Webhook in Stripe korrekt konfiguriert ist
- Prüfe, ob die Webhook-URL in Stripe mit deiner Vercel-URL übereinstimmt

---

**Nach dem Hinzufügen aller Variablen: Führe ein Redeploy durch!**

