# 🚀 PIPELINE ARCHITETTURA V3 — DATA-DRIVEN (NUOVA)

**Data:** 18 agosto 2026  
**Status:** ✅ APPROVATO DA UTENTE  
**Changes:** VG-SC eliminata, .md → MEMORIA, Copywriter 5×5+AskUserQuestion

---

## 📊 CONFRONTO ARCHITETTURE

| Aspetto | V2 (ATTUALE) | V3 (NUOVA) | Delta |
|---|---|---|---|
| File .md scritti | 8 | 0 | -100% |
| File .md letti | 8 | 0 | -100% |
| VG-SC skill | Sì (invocata) | No | Incorporata in Copywriter |
| Token I/O file | ~25K | ~2K | -92% |
| Copywriter autonomia | Alto (sceglie TOP-1 solo) | BASSO (5 temi × 5 varianti, TU scegli) | Utente involved |
| Feedback learning | No | Sì (salvato memoria) | ∞ affina |
| **TOTALE token/week** | **~105K** | **~80K** | **-24%** |
| **Utente CONTROLLO** | LOW | TOTAL | 🎯 |

---

## 🔄 NUOVO FLUSSO LUNEDÌ 09:00-10:50

```
MEMORIA INIZIALE
└─ user_preferences.json (da settimana precedente)
   ├─ chosen_themes: ["Gruppo indeciso"]
   ├─ liked_hook_patterns: ["Domanda provocatoria", "Numero preciso"]
   ├─ disliked_patterns: ["Generic aspirational"]
   └─ discarded_variants_history: [...]
```

---

## ⏱️ FASE 1: ANALISTA (09:00-09:15) — MEMORIA ONLY

```
INPUT: 
  - Instagram API (followers, reach, engagement)
  - Web research (competitor, trend)
  - user_preferences.json (preferenze storiche TUE)

PROCESO:
  1. Analizza dati reali
  2. Genera 5 TEMI candidati (VG-SC Fase 1 interno)
  3. Valuta vs preferenze TUE (user_preferences.json)
  4. SALVA in MEMORIA:
     └─ analysis_data = {
        "top_5_themes": [
          {
            "theme_id": 1,
            "name": "Gruppo indeciso",
            "psychological_lever": "comfort zone paradox",
            "source": "competitor @kessart analisi",
            "why_works": "matcher con audience pain",
            "matches_user_preferences": true  // ← È simile a scelte precedenti
          },
          {
            "theme_id": 2,
            "name": "Sconosciuti → amici",
            ...
          },
          ... × 5
        ],
        "competitor_analysis": {...},
        "account_status": {
          "followers": 801,
          "goal": 1000,
          "deadline": "2026-08-31",
          "pace_percentage": "36%"
        },
        "trend_analysis": {...}
     }

OUTPUT: 
  - analysis_data in MEMORIA (zero file)
  - (optional) playbook.md per TUA LETTURA solo (audit)
  
TRIGGER: Copywriter parte
```

---

## ⏱️ FASE 2: COPYWRITER APULIA EDITORIAL PLUS (09:20-10:00)

### Step A: Leggi dati e preferenze

```python
analysis_data = memoria["analysis_data"]  # 5 temi da Analista
user_preferences = memoria["user_preferences"]  # Tue scelte storiche

# Prepara contexto per generazione reel
themes = analysis_data["top_5_themes"]
```

### Step B: Per OGNI tema, genera 5 VARIANTI REEL

```python
for theme in themes:  # 5 temi
  for variant_num in range(1, 6):  # 5 varianti per tema
    
    # VG-SC Fase 2-3-4 INTERNO
    hook = genera_hook(tema, variant_num, user_preferences)
    # Hook ≤12 parole, trigger+target
    # Esempio: "Quante volte il TACO dice NO?" (7 parole)
    
    script = genera_script_30sec(tema, hook, variant_num)
    # Applica VG-SC Fase 2 (attrae) + Fase 3 (filtra)
    
    caption = genera_caption_4ingredient(tema, hook, variant_num)
    # Fase 4: Attrae + Filtra + Posiziona + Stimola
    
    cta = genera_cta_specifico(tema, variant_num)
    # "Scrivi DECISO nei commenti" (non generico)
    
    hashtag_8 = genera_hashtag(tema)
    
    SALVA in MEMORIA:
    reel_variants[theme.id][variant_num] = {
      "hook": hook,
      "script": script,
      "caption": caption,
      "cta": cta,
      "hashtag": hashtag_8
    }

MEMORIA adesso contiene:
└─ reel_data = {
  "theme_1": {
    "variant_1": {...reel completo...},
    "variant_2": {...},
    ... × 5
  },
  "theme_2": {...},
  ... × 5
}
```

### Step C: AskUserQuestion — TU SCEGLI

```
┌────────────────────────────────────────┐
│ SCEGLI IL TEMA PER LA SETTIMANA       │
│ (vedi tutti i 5 temi + motivazione)   │
│                                        │
│ ◯ 1. Gruppo indeciso (comfort paradox)│
│ ◯ 2. Sconosciuti → amici (belonging)  │
│ ◯ 3. Weekend indimenticabile (FOMO+)  │
│ ◯ 4. Esperienza autentica (anti-fake) │
│ ◯ 5. Decisione facile (autonomia)     │
│                                        │
│ TU SCEGLI: tema 1                      │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ PER TEMA 1 VEDI 5 VARIANTI REEL       │
│ (Hook diversi, stesso tema)            │
│                                        │
│ Variante 1: Hook "Quante volte TACO?" │
│ Variante 2: Hook "42 persone arrivano"│
│ Variante 3: Hook "Comfort zone broken"│
│ Variante 4: Hook "Ti senti in trappola?" │
│ Variante 5: Hook "Delegare è liberante" │
│                                        │
│ ☑ Mantieni: 1,3,5                     │
│ ☐ Mantieni: 2,4                       │
│                                        │
│ TU SCEGLI: 1,3,5                       │
└────────────────────────────────────────┘
```

**OUTPUT AskUserQuestion:**
```
{
  "chosen_theme_id": 1,
  "chosen_theme_name": "Gruppo indeciso",
  "kept_variant_ids": [1, 3, 5],
  "discarded_variant_ids": [2, 4],
  "timestamp": "2026-08-24T09:45:00Z"
}
```

### Step D: Salva feedback in MEMORIA

```python
# AGGIORNA user_preferences.json per PROSSIMA generazione
user_preferences = {
  "last_chosen_theme": "Gruppo indeciso",
  "last_chosen_theme_id": 1,
  "last_kept_variants": [1, 3, 5],
  "last_discarded_variants": [2, 4],
  
  # History per affinamento
  "theme_choice_history": [
    {"week": "2026-08-24", "theme": "Gruppo indeciso", "theme_id": 1},
    {"week": "2026-08-17", "theme": "Sconosciuti → amici", "theme_id": 2},
    ...
  ],
  
  "liked_hook_patterns": ["Domanda provocatoria", "Numero preciso", "Comfort paradox"],
  "disliked_patterns": ["Generic aspirational", "Too sad"],
  
  # Per prossima generazione Analista
  "preferred_theme_psychology": ["comfort zone", "group dynamics"],
  "disliked_psychology": ["pure FOMO", "aspiration overload"]
}

SALVA in MEMORIA per lunedì prossimo
```

### Step E: Genera OUTPUT FINALE

```python
# Prendi solo i reel che hai SCELTO
kept_reels = [
  reel_data[theme_1][variant_1],
  reel_data[theme_1][variant_3],
  reel_data[theme_1][variant_5]
]

# Genera LOCANDINE evento (indipendenti da tema)
locandine = [
  {
    "evento": "Astronomia 21/08",
    "posti": 1,
    "caption": "Quella notte che guardammo le stelle..."
  },
  {
    "evento": "Cena 22/08",
    "posti": 5,
    "caption": "5 posti rimasti. Cena tra sconosciuti..."
  }
]

# SALVA in MEMORIA (zero file .md!)
copywriter_output = {
  "chosen_theme": "Gruppo indeciso",
  "kept_reel_variants": kept_reels,  # 3 reel complete
  "locandine": locandine,  # 2 evento
  "timestamp": "2026-08-24T10:00:00Z"
}

MEMORIA NOW CONTAINS:
├─ analysis_data (da Analista)
├─ reel_data (tutti i 25 reel, anche quelli scartati)
├─ copywriter_output (3 reel scelti + 2 locandine)
├─ user_preferences (aggiornate con feedback TUO)
└─ (zero .md files)
```

---

## ⏱️ FASE 2-PARALLEL: CAROSELLO / STORIE / POST (09:20-09:45)

**Tutti leggono MEMORIA (zero file .md)**

### CAROSELLO ARCHITECT

```
INPUT MEMORIA:
  - analysis_data["top_5_themes"]
  - user_preferences["preferred_theme_psychology"]

PROCESSO:
  1. Nota che tema scelto è "Gruppo indeciso"
  2. Genera 2 varianti carosello PER QUEL TEMA
  3. Applica VG-SC Fase 2-3-4
  4. Referenzia foto da media_manifest.md (REALE!)
  5. SALVA in MEMORIA:
     └─ carosello_data = {
        "theme": "Gruppo indeciso",
        "variante_A": {
          "slide_1": {"text": "Il tuo gruppo non sa mai...", "photo_ref": "14-agosto-catamarano.jpg"},
          ... × 5 slide
        },
        "variante_B": {...}
     }
```

### STORIE ARCHITECT

```
INPUT MEMORIA:
  - analysis_data (tema + dati account)
  - copywriter_output (evento + deadline)

PROCESSO:
  1. Genera 4 giorni storie (12-14 total)
  2. Ogni storia: testo + foto_ref + sticker_type
  3. Riferisce foto REALI da media_manifest.md
  4. SALVA in MEMORIA:
     └─ storie_data = {
        "giorno_1": [...storie...],
        ... × 4
     }
```

### POST SINGOLO ARCHITECT

```
INPUT MEMORIA: idem

PROCESSO:
  1. Sceglie 1 FOTO HERO (da media_manifest.md)
  2. Genera caption VG-SC Fase 1-4
  3. SALVA in MEMORIA:
     └─ post_data = {
        "photo_ref": "14-agosto-catamarano.jpg",
        "caption": "...VG-SC completa...",
        "hashtag": [8]
     }
```

---

## ⏱️ FASE 3: REVIEWER PARALLELIZZATI (10:00-10:15)

**Tutti leggono MEMORIA direttamente, scrivono in MEMORIA**

```
FACT CHECKER
├─ Legge carosello_data, storie_data, post_data da MEMORIA
├─ Verifica foto da media_manifest.md (FILE reale)
├─ SCRIVE in MEMORIA:
│  └─ fact_check_result = {
│     "status": "OK",
│     "photos_verified": [...],
│     "errors": []
│  }

COPY REVIEWER
├─ Legge tutti i dati da MEMORIA
├─ Verifica VG-SC Fase 1-4 compliance
├─ SCRIVE in MEMORIA:
│  └─ copy_check_result = {
│     "status": "OK",
│     "vg_sc_scores": {...},
│     "corrections": []
│  }

COHERENCE REVIEWER
├─ Legge tutti i dati
├─ Verifica conflitti cross-format
├─ SCRIVE in MEMORIA:
│  └─ coherence_result = {
│     "conflicts": [],
│     "status": "OK"
│  }
```

---

## ⏱️ FASE 4: FAMOUS-IG-CAROUSEL SKILL (10:15-10:45)

```
INPUT MEMORIA: carosello_data

PROCESSO:
  1. Legge carosello.md (testo slide)
  2. Genera immagini Higgsfield (Nano Banana Pro)
  3. Applica palette CORRETTA: #1B4B6B + #C9622A
  4. Salva PNG direttamente:
     └─ caroselli_output/2026-08-24/ (10 PNG)
```

---

## ⏱️ FASE 5: DASHBOARD COMPILER (10:45-11:00)

```
INPUT MEMORIA:
  - analysis_data (tema + trend + competitor)
  - copywriter_output (reel scelti + locandine)
  - carosello_data (caroselli)
  - storie_data (storie)
  - post_data (post)
  - fact_check_result (status)
  - copy_check_result (status)
  - coherence_result (status)
  - 10 PNG da famous-ig-carousel
  - user_preferences (TUE SCELTE evidenziate)

PROCESSO:
  1. Assembla UN UNICO HTML con TUTTE le sezioni
  2. HIGHLIGHTS: 
     └─ "TEMA SCELTO: Gruppo indeciso"
     └─ "VARIANTI MANTENUTE: 1, 3, 5"
     └─ "ALTRE OPZIONI DISPONIBILI: 2, 4 (scartate da te)"
  3. Pubblica ARTIFACT HTML

OUTPUT:
  └─ artifact-dashboard-2026-08-24.html
     ├─ Sezione 1: Analisi (5 temi, TUO scelto evidenziato)
     ├─ Sezione 2: Reel (3 varianti TUE + 2 altre nella sidebar)
     ├─ Sezione 3-7: Contenuti (carosello, storie, post per TUO tema)
     ├─ Sezione 8: Review (status OK/warning)
     ├─ Sezione 9: Performance (growth analysis)
     └─ Sezione 10: Download caroselli (10 PNG)
```

---

## 🗄️ MEMORIA STRUCTURE (SCHEMA)

```json
{
  "week": "2026-08-24",
  
  "analysis_data": {
    "top_5_themes": [{...}, ...],
    "competitor_analysis": {...},
    "account_status": {...},
    "trend_analysis": {...}
  },
  
  "reel_data": {
    "theme_1": {
      "variant_1": {...reel completo...},
      ... × 5
    },
    ... × 5 themes
  },
  
  "user_choice": {
    "chosen_theme_id": 1,
    "kept_variant_ids": [1, 3, 5],
    "discarded_variant_ids": [2, 4],
    "timestamp": "..."
  },
  
  "copywriter_output": {
    "kept_reel_variants": [...3 reel...],
    "locandine": [...2...]
  },
  
  "carosello_data": {...},
  "storie_data": {...},
  "post_data": {...},
  
  "fact_check_result": {...},
  "copy_check_result": {...},
  "coherence_result": {...},
  
  "user_preferences": {
    "theme_choice_history": [...],
    "liked_patterns": [...],
    "disliked_patterns": [...]
  }
}
```

---

## 📊 TIMELINE V3

```
09:00 │ ANALISTA + TREND SCOUT (parallelo)
09:15 │ Analista finito, MEMORIA = analysis_data
      │ Copywriter parte, CAROSELLO/STORIE/POST partono
09:20 │ Copywriter: 5 temi × 5 varianti generate
09:45 │ AskUserQuestion: Tu scegli tema + varianti
10:00 │ Copywriter: Salva output finale in MEMORIA
      │ REVIEWER parallelizzati (leggono MEMORIA)
10:15 │ FAMOUS-IG-CAROUSEL genera PNG
10:45 │ DASHBOARD COMPILER assembla HTML finale
11:00 │ ARTIFACT DASHBOARD PUBBLICATO ✅
```

**DURATA: 2h (09:00 → 11:00)** (vs 1h 50min prima, ma con TU COINVOLTO)

---

## 💰 RISPARMIO TOKEN FINALE

| Componente | V2 | V3 | Delta |
|---|---|---|---|
| File .md I/O | 25K | 2K | -23K |
| VG-SC skill | 5K | 0 | -5K |
| **TOTALE** | **~105K** | **~80K** | **-25K (24%)** |

---

## 🎯 COSA OTTIENI DI NUOVO

```
✅ CONTROLLO TOTALE
   └─ Vedi 5 temi, TU scegli quale fare

✅ LEARNING LOOP
   └─ Sistema ricorda tue scelte, affina prossima generazione

✅ VELOCE
   └─ Meno file I/O, più memoria in-process

✅ TRASPARENTE
   └─ Vedi TUTTE le opzioni (anche scartate) nell'artifact finale

✅ REEL PERSONALIZZATI
   └─ I 3 reel che ricevi sono quelli CHE VUOI, non quelli che Copywriter sceglie
```

---

## 🚀 PROSSIMI STEP (DOMENICA)

1. **Elimina** `~/.claude/skills/vg-sc/` (SKILL rimossa)
2. **Aggiorna prompt Copywriter** per 5×5+AskUserQuestion
3. **Implementa MEMORIA** sistema (JSON in-process)
4. **Setup trigger API** come pianificato (no cambia)
5. **TEST** lunedì mattina con nuovo flusso

**Status:** ✅ PRONTO PER IMPLEMENTAZIONE

