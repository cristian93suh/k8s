# 🚀 Setup Trigger API in Cascata — Guida Step-by-Step

**Scopo:** Eliminare il buffer 45 minuti tra gli agent. Fare sì che ogni agent chiami il successivo appena finisce (zero attesa, dipendenze reali).

**Tempo totale setup:** ~30 minuti (UI manuale su claude.ai)  
**Prerequisiti:** Accesso a https://claude.ai/code/routines

---

## FASE 1: Generare i Token API (5 min)

Per ogni routine che verrà triggerata via API, devi generare un token di autorizzazione.

**Routine che riceveranno trigger API:**
1. Copywriter (`trig_01AKBGtWiMqbeCM5feKX77se`)
2. Dashboard (`trig_01Q8wjjPVrLCnqk2YYnjYvsj`)
3. Fact Checker (`trig_01VadvGdmWAF1qrEZL7o3Xym`)
4. Copy Reviewer (`trig_01SvDepDtR55zhQToXiJq4zb`)

### Passo 1.1 — Per OGNI routine sopra, aggiungi un trigger API

```
Per ciascuna delle 4 routine:

1. Vai a https://claude.ai/code/routines
2. Trova la routine (es. "Apulia Editorial Copywriter")
3. Clicca l'icona matita ("Edit routine") in alto a destra
4. Scorri a "Trigger"
5. Clicca "Add another trigger"
6. Scegli "API" dal dropdown
7. Clicca "Save routine"
```

### Passo 1.2 — Genera il token

Dopo il salvataggio:
```
1. Torna alla pagina routine
2. Nella sezione Trigger, per il nuovo trigger "API", clicca "Generate token"
3. ⚠️ IMPORTANTE: Copia il token SUBITO (si vede una sola volta!)
4. Incollalo in un file temporaneo (vedi Passo 1.3)
```

### Passo 1.3 — Salva i 4 token in questo file

Crea un file temporaneo per raccogliere i token (cancellalo dopo):

```
COPYWRITER_FIRE_TOKEN = [incolla token qui]
DASHBOARD_FIRE_TOKEN = [incolla token qui]
FACT_CHECKER_FIRE_TOKEN = [incolla token qui]
COPY_REVIEWER_FIRE_TOKEN = [incolla token qui]
```

---

## FASE 2: Aggiornare i Prompt delle Routine (15 min)

Adesso aggiungi il codice di trigger nei prompt di Analista, Trend Scout, e Copywriter.

### 2.1 — Prompt ANALISTA — Aggiungi in FONDO

Apri la routine Analista, vai a "Edit routine", sezione "Prompt", scorri in fondo, PRIMA del "---" finale (se c'è).

**Aggiungi:**

```bash
# [FINE ANALISI MAIN]
# Dopo aver fatto commit di playbook.md:

echo "🔗 Triggering downstream agents..."

# 1. Dashboard è semplice — dipende solo da playbook.md, chiamalo subito
curl -X POST https://api.anthropic.com/v1/claude_code/routines/trig_01Q8wjjPVrLCnqk2YYnjYvsj/fire \
  -H "Authorization: Bearer $DASHBOARD_FIRE_TOKEN" \
  -H "anthropic-beta: experimental-cc-routine-2026-04-01" \
  -H "anthropic-version: 2023-06-01" \
  && echo "✓ Dashboard triggered"

# 2. Per Copywriter: valuta AND-join (aspetta Trend Scout)
# Leggi lo state file, aggiorna, valuta se chiamare Copywriter
python3 << 'PYTHON_END'
import json
import subprocess
import os
from datetime import datetime

# File stato
state_file = "pipeline_state/" + datetime.now().strftime("%Y-%m-%d") + ".json"

# Crea/leggi state file
try:
    with open(state_file, 'r') as f:
        state = json.load(f)
except FileNotFoundError:
    state = {
        "data": datetime.now().strftime("%Y-%m-%d"),
        "analista_done": False,
        "trend_scout_done": False,
        "copywriter_fired": False
    }

# Segna analista come fatto
state["analista_done"] = True

# Scrivi state
with open(state_file, 'w') as f:
    json.dump(state, f, indent=2)

# Commit stato
subprocess.run(["git", "add", state_file], check=True)
subprocess.run(["git", "commit", "-m", f"[state] Analista completed - {datetime.now().isoformat()}"], check=True)
subprocess.run(["git", "push"], check=True)

# Rileggi (per evitare stale read)
with open(state_file, 'r') as f:
    state = json.load(f)

# Se entrambi genitori sono pronti E Copywriter non è stato ancora lanciato
if state.get("analista_done") and state.get("trend_scout_done") and not state.get("copywriter_fired"):
    print("✓ Trend Scout è già finito → Calling Copywriter")
    
    # Chiama Copywriter
    subprocess.run([
        "curl", "-X", "POST", 
        "https://api.anthropic.com/v1/claude_code/routines/trig_01AKBGtWiMqbeCM5feKX77se/fire",
        "-H", "Authorization: Bearer " + os.environ.get("COPYWRITER_FIRE_TOKEN"),
        "-H", "anthropic-beta: experimental-cc-routine-2026-04-01",
        "-H", "anthropic-version: 2023-06-01"
    ], check=False)
    
    # Segna come lanciato
    state["copywriter_fired"] = True
    with open(state_file, 'w') as f:
        json.dump(state, f, indent=2)
    
    subprocess.run(["git", "add", state_file], check=True)
    subprocess.run(["git", "commit", "-m", f"[state] Copywriter fired - {datetime.now().isoformat()}"], check=True)
    subprocess.run(["git", "push"], check=True)
else:
    print("⧐ Aspetta Trend Scout...")

PYTHON_END
```

---

### 2.2 — Prompt TREND SCOUT — Aggiungi in FONDO

Stessa cosa: apri routine, vai a prompt, aggiungi in fondo:

```bash
# [FINE TREND ANALYSIS]
# Dopo aver fatto commit di trend_audience.md:

echo "🔗 Checking AND-join status for Copywriter..."

python3 << 'PYTHON_END'
import json
import subprocess
import os
from datetime import datetime

# File stato
state_file = "pipeline_state/" + datetime.now().strftime("%Y-%m-%d") + ".json"

# Crea/leggi state file
try:
    with open(state_file, 'r') as f:
        state = json.load(f)
except FileNotFoundError:
    state = {
        "data": datetime.now().strftime("%Y-%m-%d"),
        "analista_done": False,
        "trend_scout_done": False,
        "copywriter_fired": False
    }

# Segna trend scout come fatto
state["trend_scout_done"] = True

# Scrivi state
with open(state_file, 'w') as f:
    json.dump(state, f, indent=2)

# Commit stato
subprocess.run(["git", "add", state_file], check=True)
subprocess.run(["git", "commit", "-m", f"[state] Trend Scout completed - {datetime.now().isoformat()}"], check=True)
subprocess.run(["git", "push"], check=True)

# Rileggi (per evitare stale read)
with open(state_file, 'r') as f:
    state = json.load(f)

# Se entrambi genitori sono pronti E Copywriter non è stato ancora lanciato
if state.get("analista_done") and state.get("trend_scout_done") and not state.get("copywriter_fired"):
    print("✓ Analista è già finito → Calling Copywriter")
    
    # Chiama Copywriter
    subprocess.run([
        "curl", "-X", "POST", 
        "https://api.anthropic.com/v1/claude_code/routines/trig_01AKBGtWiMqbeCM5feKX77se/fire",
        "-H", "Authorization: Bearer " + os.environ.get("COPYWRITER_FIRE_TOKEN"),
        "-H", "anthropic-beta: experimental-cc-routine-2026-04-01",
        "-H", "anthropic-version: 2023-06-01"
    ], check=False)
    
    # Segna come lanciato
    state["copywriter_fired"] = True
    with open(state_file, 'w') as f:
        json.dump(state, f, indent=2)
    
    subprocess.run(["git", "add", state_file], check=True)
    subprocess.run(["git", "commit", "-m", f"[state] Copywriter fired - {datetime.now().isoformat()}"], check=True)
    subprocess.run(["git", "push"], check=True)
else:
    print("⧐ Aspetta Analista...")

PYTHON_END
```

---

### 2.3 — Prompt COPYWRITER — Aggiungi in FONDO

Apri routine Copywriter, vai a prompt, aggiungi in fondo:

```bash
# [FINE COPYWRITER WORK]
# Dopo aver fatto commit di piano_editoriale.md:

echo "🔗 Triggering reviewers in parallel..."

# Chiama Fact Checker
curl -X POST https://api.anthropic.com/v1/claude_code/routines/trig_01VadvGdmWAF1qrEZL7o3Xym/fire \
  -H "Authorization: Bearer $FACT_CHECKER_FIRE_TOKEN" \
  -H "anthropic-beta: experimental-cc-routine-2026-04-01" \
  -H "anthropic-version: 2023-06-01" \
  && echo "✓ Fact Checker triggered"

# Chiama Copy Reviewer
curl -X POST https://api.anthropic.com/v1/claude_code/routines/trig_01SvDepDtR55zhQToXiJq4zb/fire \
  -H "Authorization: Bearer $COPY_REVIEWER_FIRE_TOKEN" \
  -H "anthropic-beta: experimental-cc-routine-2026-04-01" \
  -H "anthropic-version: 2023-06-01" \
  && echo "✓ Copy Reviewer triggered"
```

---

## FASE 3: Configura le Environment Variable (5 min)

I token devono essere accessibili come `$ENVIRONMENT_VARIABLE` nei prompt sopra.

Su `claude.ai/code/routines`, per ciascuna routine, vai a:
- "Edit routine" → sezione "Environment variables"
- Aggiungi:

**Per Analista e Trend Scout:**
```
COPYWRITER_FIRE_TOKEN = [token generato per Copywriter]
DASHBOARD_FIRE_TOKEN = [token generato per Dashboard]
```

**Per Copywriter:**
```
FACT_CHECKER_FIRE_TOKEN = [token generato per Fact Checker]
COPY_REVIEWER_FIRE_TOKEN = [token generato per Copy Reviewer]
```

---

## FASE 4: Crea la Cartella State File (1 min)

Nel repo, crea la cartella dove vivranno i file di stato:

```bash
mkdir -p pipeline_state/
touch pipeline_state/.gitkeep
git add pipeline_state/
git commit -m "Crea pipeline_state directory per AND-join tracking"
git push
```

---

## FASE 5: Testa il Tutto (2-3 min)

### Test Step 1: Lancia Analista manualmente

1. Su https://claude.ai/code/routines
2. Trova "Apulia Growth Analyst"
3. Clicca "Run now"
4. Aspetta che finisca
5. Controlla che:
   - ✓ `playbook.md` sia stato committato
   - ✓ La sessione di Dashboard sia partita (vedi sotto)
   - ✓ `pipeline_state/[data].json` sia stato creato con `analista_done: true`

### Test Step 2: Verifica che Dashboard sia partito

1. Torna a https://claude.ai/code/routines
2. Cerca "Apulia Performance Dashboard"
3. Controlla l'elenco "Run history" — dovrebbe esserci una nuova run avviata automaticamente
4. Se non c'è: debug nella sessione Analista, controlla se il `curl` è stato eseguito

### Test Step 3: Lancia Trend Scout manualmente

1. Torna a routines
2. Trova "Apulia Trend & Audience Scout"
3. Clicca "Run now"
4. Aspetta che finisca
5. Controlla che:
   - ✓ `trend_audience.md` sia stato committato
   - ✓ `pipeline_state/[data].json` adesso abbia sia `analista_done` che `trend_scout_done` a `true`
   - ✓ **Copywriter sia partito automaticamente** (vedi Run history)

### Test Step 4: Verifica cascata completa

1. Aspetta che Copywriter finisca
2. Controlla che sia Fact Checker che Copy Reviewer siano partiti automaticamente
3. Se uno non è partito: debug nella sessione Copywriter, controlla `curl`

---

## 🐛 Debugging — Se qualcosa non funziona

### Problema: "Copywriter non è partito"

**Checklist:**
1. ✓ Analista ha committato `playbook.md`? (`git log` per verificare)
2. ✓ Trend Scout ha committato `trend_audience.md`?
3. ✓ `pipeline_state/[data].json` esiste e ha entrambi i flag a `true`?
4. ✓ `COPYWRITER_FIRE_TOKEN` è nella env var di Analista/Trend Scout e non è vuoto?
5. ✓ Il `curl` è stato eseguito? (controlla sessione: `echo "✓ Copywriter triggered"` dovrebbe esserci nei log)

**Se tutto sembra OK ma non parte:**
- Il token potrebbe essere scaduto (rigenera)
- Il rate limit API potrebbe essere stato raggiunto (aspetta 1 min, riprova)
- Controlla il file `pipeline_state/[data].json` manualmente: potrebbe esserci un typo nei nomi dei flag

### Problema: "Copywriter è partito DUE VOLTE"

Questo significa che sia Analista che Trend Scout hanno eseguito il `curl` nello stesso secondo.

**Soluzione:** È una race condition teorica ma rara. Se succede:
1. Ferma una delle due sessioni di Copywriter (quella che ha fatto meno lavoro)
2. Verifica che `pipeline_state/[data].json` abbia `copywriter_fired: true`
3. Prossimo lunedì, se succede di nuovo, aggiungi un piccolo delay prima del `curl` (1-2 secondi)

---

## ✅ Checklist Completamento

- [ ] Ho generato 4 token API (Copywriter, Dashboard, Fact Checker, Copy Reviewer)
- [ ] Ho aggiunto trigger API a ciascuna routine su UI
- [ ] Ho aggiornato prompt di Analista (con Dashboard call + AND-join logic)
- [ ] Ho aggiornato prompt di Trend Scout (con AND-join logic)
- [ ] Ho aggiornato prompt di Copywriter (con 2 reviewer calls)
- [ ] Ho aggiunto environment variable a Analista (COPYWRITER + DASHBOARD tokens)
- [ ] Ho aggiunto environment variable a Trend Scout (COPYWRITER token)
- [ ] Ho aggiunto environment variable a Copywriter (FACT_CHECKER + COPY_REVIEWER tokens)
- [ ] Ho creato cartella `pipeline_state/` nel repo
- [ ] Ho testato: Analista → Dashboard parte automaticamente ✓
- [ ] Ho testato: Analista + Trend Scout → Copywriter parte 1 volta (non 2) ✓
- [ ] Ho testato: Copywriter → Fact Checker + Copy Reviewer partono ✓

---

## 📌 Conseguenze After Setup

**Prima (buffer 45 min):**
```
09:00 Analista parte
09:45 Copywriter parte (buffer, aspetta)
10:30 Reviewer partono (buffer, aspettano)
```

**Dopo (trigger API):**
```
09:00 Analista parte
09:15 Analista finito → Dashboard + AND-join check
09:16 Trend Scout finito → Copywriter parte (zero buffer!)
09:30 Copywriter finito → Reviewer partono (zero buffer!)
```

**Guadagno:** 45 minuti risparmiati, zero attesa, dipendenze reali.

