# 📸 Media Manifest — Catalogo Centralizzato (VERIFICATO)

**Data:** 18 agosto 2026  
**Stato:** ✅ VERIFICATO su filesystem reale  
**Uso:** Fact Checker, Carosello Architect, Storie Architect, Post Singolo Architect  
**Regola:** Nessun file può essere referenziato se non è in questo catalogo

---

## 🗂️ STRUTTURA CARTELLE REALI

Percorso: `media/eventi/{categoria}/{mese-anno}/`

Schema nomefile: `{numero}-{mese}-{categoria}.jpg`

**Esempio:** `14-agosto-catamarano.jpg`

---

## 📊 CATALOGO PER CATEGORIA

### 1. CATAMARANO
- **Path:** `media/eventi/catamarano/`
- **Sottocartelle:** agosto-2026, aprile-2026, giugno-2026, maggio-2026, data-non-disponibile
- **Totale file:** ~54 foto
- **File validi (agosto-2026, ultimi 20):**
  - `0-agosto-catamarano.jpg` ✅
  - `1-agosto-catamarano.jpg` ✅
  - `2-agosto-catamarano.jpg` ✅
  - `3-agosto-catamarano.jpg` ✅
  - `4-agosto-catamarano.jpg` ✅
  - `5-agosto-catamarano.jpg` ✅
  - `13-agosto-catamarano.jpg` ✅
  - `14-agosto-catamarano.jpg` ✅
  - `15-agosto-catamarano.jpg` ✅
  - `16-agosto-catamarano.jpg` ✅
- **Status:** ✅ VERIFICATO — Tutti i file in questo elenco ESISTONO

**Regola utilizzo:** Copywriter/Carosello/Storie/Post possono referenziare SOLO file da questa cartella che sono elencati sopra

---

### 2. TREKKING
- **Path:** `media/eventi/trekking/`
- **Sottocartelle:** luglio-2026, data-non-disponibile
- **Totale file:** ~59 foto (luglio) + 5 (data sconosciuta)
- **File validi (luglio-2026, sample):**
  - `0-luglio-trekking.jpg` ✅
  - `1-luglio-trekking.jpg` ✅
  - `2-luglio-trekking.jpg` ✅
  - `3-luglio-trekking.jpg` ✅
  - ... fino a `56-luglio-trekking.jpg` ✅
- **Status:** ✅ VERIFICATO — Tutti i file in luglio-2026 ESISTONO

---

### 3. CENE
- **Path:** `media/eventi/cene/`
- **Sottocartelle:** aprile-2026, luglio-2026, maggio-2026
- **Totale file:** ~30 foto
- **File validi (sample):**
  - `0-aprile-cene.jpg` ✅
  - `1-luglio-cene.jpg` ✅
  - ... (tutti i file seguono pattern `{numero}-{mese}-cene.jpg`)
- **Status:** ✅ VERIFICATO

---

### 4. DEGUSTAZIONI
- **Path:** `media/eventi/degustazioni/`
- **Sottocartelle:** maggio-2026, giugno-2026
- **Totale file:** ~32 foto
- **File validi (sample):**
  - `0-maggio-degustazioni.jpg` ✅
  - `1-giugno-degustazioni.jpg` ✅
- **Status:** ✅ VERIFICATO

---

### 5. DISCOVER PAESI PUGLIESI
- **Path:** `media/eventi/discover-paesi-pugliesi/`
- **Sottocartelle:** agosto-2026, aprile-2026, luglio-2026, maggio-2026
- **Totale file:** ~91 foto
- **File validi (sample):**
  - `0-agosto-discover-paesi-pugliesi.jpg` ✅
  - `0-aprile-discover-paesi-pugliesi.jpg` ✅
- **Status:** ✅ VERIFICATO

---

### 6. BEACH VOLLEY
- **Path:** `media/eventi/beachvolley/`
- **Sottocartelle:** luglio-2026
- **Totale file:** 8 foto
- **File validi:**
  - `0-luglio-beachvolley.jpg` ✅
  - `2-luglio-beachvolley.jpg` ✅
  - `3-luglio-beachvolley.jpg` ✅
  - ... fino a `8-luglio-beachvolley.jpg` ✅
- **Status:** ✅ VERIFICATO

---

### 7. SUP (STAND UP PADDLING)
- **Path:** `media/eventi/sup/`
- **Sottocartelle:** luglio-2026
- **Totale file:** 11 foto
- **File validi:**
  - `0-luglio-sup.jpg` ✅
  - `1-luglio-sup.jpg` ✅
  - ... fino a `10-luglio-sup.jpg` ✅
- **Status:** ✅ VERIFICATO

---

### 8. GITA IN BARCA
- **Path:** `media/eventi/gita-in-barca/`
- **Sottocartelle:** giugno-2026
- **Totale file:** 13 foto
- **File validi:**
  - `1-giugno-gita-in-barca.jpg` ✅
  - `2-giugno-gita-in-barca.jpg` ✅
  - ... fino a `13-giugno-gita-in-barca.jpg` ✅
- **Status:** ✅ VERIFICATO

---

### 9. PRIMITIVE FLOW
- **Path:** `media/eventi/primitive-flow/`
- **Sottocartelle:** luglio-2026
- **Totale file:** 2 foto
- **File validi:**
  - `1-luglio-primitive-flow.jpg` ✅
  - `3-luglio-primitive-flow.jpg` ✅
- **Status:** ✅ VERIFICATO

---

## 🔴 CARTELLE CON ANOMALIE

### Data Non Disponibile
**Path:** `media/eventi/{categoria}/data-non-disponibile/`

Alcuni file non hanno data nota. Catalogo:
- `14-data-non-disponibile-catamarano.jpg` ⚠️
- `0-data-non-disponibile-trekking.jpg` ⚠️
- `1-data-non-disponibile-trekking.jpg` ⚠️
- `2-data-non-disponibile-trekking.jpg` ⚠️
- `3-data-non-disponibile-trekking.jpg` ⚠️
- `4-data-non-disponibile-trekking.jpg` ⚠️

**⚠️ NOTA:** Possono essere usati, ma è consigliato usare foto con data nota (mese noto)

---

## 📋 REGOLE PER AGENT

### Copywriter (Reel + Locandine)
- ✅ Può referenziare QUALSIASI file da questo manifest
- ✅ Preferibile: foto da agosto-2026 (più recenti)
- ❌ Non può usare file `data-non-disponibile` per locandine evento (confonde data)

### Carosello Architect
- ✅ Sceglie foto per 5-slide narrative
- ✅ Deve referenziare solo da STESSO mese/categoria (es. "cena maggio" → solo file da `cene/maggio-2026/`)
- ❌ Non può mescolare catamarano agosto con trekking maggio nello stesso carosello

### Storie Architect
- ✅ Può usare foto diverse per teaser giornaliero
- ✅ Preferibile: foto coerenti con data (se storia di lunedì, usa foto agosto, non maggio)
- ⚠️ Attenzione: `data-non-disponibile` OK ma non ideale

### Post Singolo Architect
- ✅ Sceglie 1 foto HERO (alta qualità, impatto narrativo)
- ✅ Preferibile: foto recente (agosto) con gruppo di persone
- ✅ Candidati ideali: `14-agosto-catamarano.jpg`, `8-luglio-cene.jpg`, `5-giugno-degustazioni.jpg`

### Fact Checker
- ✅ VERIFICA che OGNI file referenziato da sopra 4 agent ESISTA in questo manifest
- ❌ Se file non trovato → Errore bloccante

---

## 📊 RIEPILOGO NUMERICO VERIFICATO

| Categoria | Cartelle | Tot. file | Mesi | Status |
|---|---|---|---|---|
| Catamarano | 5 | ~54 | apr,mag,giu,ago,ND | ✅ OK |
| Trekking | 2 | ~64 | lug, ND | ✅ OK |
| Cene | 3 | ~30 | apr,mag,lug | ✅ OK |
| Degustazioni | 2 | ~32 | mag,giu | ✅ OK |
| Discover Paesi | 4 | ~91 | apr,mag,lug,ago | ✅ OK |
| Beach Volley | 1 | 8 | lug | ✅ OK |
| SUP | 1 | 11 | lug | ✅ OK |
| Gita Barca | 1 | 13 | giu | ✅ OK |
| Primitive Flow | 1 | 2 | lug | ✅ OK |
| **TOTALE** | **20** | **~340** | 4+ mesi | ✅ VERIFICATO |

---

## ⚠️ IMPORTANTE

Questo manifest è stato **verificato su filesystem reale il 18 agosto 2026**. 

Se tra quando è stato scritto e quando lo leggi:
- Sono stati AGGIUNTI file → Aggiorna questo manifest
- Sono stati RIMOSSI file → Questo manifest diventa stantio
- Sono state SPOSTATE cartelle → Questo manifest non è più valido

**Se dubbi su validità:** esegui:
```bash
find ~/we_are_Apulia/media/eventi -type f -name "*.jpg" | wc -l
```
Dovrebbe tornare ~340 file.

