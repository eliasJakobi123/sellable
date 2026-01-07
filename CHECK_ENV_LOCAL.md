# ✅ .env.local Überprüfung

Überprüfe, ob deine `.env.local` Datei korrekt erstellt wurde:

## 📋 Checkliste - So sollte deine .env.local aussehen:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE

# Stripe Price IDs
NEXT_PUBLIC_STRIPE_PRICE_STARTER=price_1SmJmUH4PAadPBVakV8maTos
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL=price_1SmJmVH4PAadPBVaSwb41TvG
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE=price_1SmJmWH4PAadPBVaP1GpxWhz

# Stripe Webhook Secret (später nach Webhook-Setup)
STRIPE_WEBHOOK_SECRET=whsec_XXXXX

# OpenAI (falls benötigt)
OPENAI_API_KEY=your_openai_key_here
```

## ✅ Überprüfungs-Punkte:

### 1. Stripe Keys
- [ ] `STRIPE_SECRET_KEY` beginnt mit `sk_test_` und ist vollständig
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` beginnt mit `pk_test_` und ist vollständig

### 2. Price IDs
- [ ] `NEXT_PUBLIC_STRIPE_PRICE_STARTER=price_1SmJmUH4PAadPBVakV8maTos`
- [ ] `NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL=price_1SmJmVH4PAadPBVaSwb41TvG`
- [ ] `NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE=price_1SmJmWH4PAadPBVaP1GpxWhz`

### 3. Format
- [ ] Keine Leerzeichen vor/nach dem `=`
- [ ] Keine Anführungszeichen um die Werte (außer bei Kommentaren)
- [ ] Jede Variable in eigener Zeile
- [ ] Keine doppelten Variablen

### 4. Supabase Keys (falls vorhanden)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` gesetzt
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` gesetzt
- [ ] `SUPABASE_SERVICE_ROLE_KEY` gesetzt

## 🔍 Quick-Check Commands:

Führe diese Commands in deinem Terminal aus:

```bash
# Prüfe ob Datei existiert
ls -la .env.local

# Zeige alle Stripe-relevanten Variablen
grep STRIPE .env.local

# Zeige alle Price IDs
grep PRICE .env.local

# Prüfe Format (sollte keine Fehler geben)
cat .env.local | grep -v "^#" | grep -v "^$" | grep "="
```

## ❌ Häufige Fehler:

1. **Leerzeichen um `=`**
   - ❌ Falsch: `KEY = value`
   - ✅ Richtig: `KEY=value`

2. **Anführungszeichen**
   - ❌ Falsch: `KEY="value"`
   - ✅ Richtig: `KEY=value`

3. **Fehlende NEXT_PUBLIC_ Prefix**
   - ❌ Falsch: `STRIPE_PRICE_STARTER=...`
   - ✅ Richtig: `NEXT_PUBLIC_STRIPE_PRICE_STARTER=...`

4. **Falsche Price IDs**
   - Prüfe dass alle mit `price_` beginnen
   - Keine Tippfehler

## ✅ Wenn alles korrekt ist:

1. Datei sollte im Root-Verzeichnis liegen (gleicher Ordner wie `package.json`)
2. Alle Stripe-Keys sollten vollständig sein
3. Alle Price IDs sollten korrekt sein
4. Format sollte korrekt sein (keine Leerzeichen, keine Anführungszeichen)

## 🚀 Testen:

Nach der Überprüfung kannst du testen:

```bash
# Next.js Server starten
npm run dev

# Sollte ohne Fehler starten
# In der Browser-Konsole sollten keine Stripe-Fehler sein
```

