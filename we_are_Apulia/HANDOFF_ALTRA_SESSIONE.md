# 🔄 HANDOFF — Istruzioni per Sessione Successiva

**Data creazione:** 17 agosto 2026  
**Sessione precedente:** Analisi completa pipeline + QA audit + modifiche skill carosello  
**Obiettivo sessione successiva:** Fixare i punti critici e completare l'implementazione

---

## 📋 SEZIONE 1: FILE DA LEGGERE PRIMA (Contesto & Analisi)

Leggi questi per capire cosa è stato fatto e cosa resta da fare:

### QA Report (Analisi completa pipeline)
- **Markdown:** `file:///Users/cristian/we_are_Apulia/qa-audit/QA_REPORT_WE_ARE_APULIA.md`
- **HTML (leggibile):** `file:///Users/cristian/we_are_Apulia/qa-audit/qa_report.html`
- **Artifact (sintesi visuale):** https://claude.ai/code/artifact/13e82eee-7766-4d16-a10f-e1ccc96cf9f4
- **⚠️ IMPORTANTE:** Contiene tutte le criticità, priorità, e roadmap. Leggi PRIMA di fare qualsiasi modifica.

### Architettura Pipeline (Dipendenze reali dei 6 agent)
- **File:** `file:///Users/cristian/we_are_Apulia/PIPELINE_ARCHITECTURE.md`
- **Cosa serve sapere:** Buffer 45 minuti tra gli agent è inefficiente, serve passare a trigger API in cascata
- **Criticità segnalata:** AND-join Analista+Trend Scout → Copywriter (state file race condition)

### Contesto Progetto
- **File:** `file:///Users/cristian/we_are_Apulia/CLAUDE.md`
- **Cosa ha:** Palette brand (#C2724F terracotta + #D4A574 oro), content pillars, hook library, KPI
- **Usa per:** Validare che le modifiche mantengano la coerenza brand

---

## 🎯 SEZIONE 2: FILE MODIFICATI (Work Items Completati)

Questi file SONO STATI MODIFICATI e sono pronti. Aprili per capire cosa è cambiato:

### Skill Carosello Architect — MODIFICATA
- **Principale:** `file:///Users/cristian/we_are_Apulia/.claude/skills/apulia-carosello-architect/SKILL.md`
  - **Cosa è nuovo:** Integrazione Higgsfield MCP per rendering visivo (Nano Banana Pro)
  - **Cosa cambia:** Non più testo solo, ma slide generate con immagini
  - **Vincolo:** "Non alterare la foto reale" — le foto vengono referenziate, non modificate

- **Guida stile:** `file:///Users/cristian/we_are_Apulia/.claude/skills/apulia-carosello-architect/references/visual-style.md`
  - **Cosa ha:** Palette coerente, tipografia, regole posizionamento testo su slide
  - **Usa per:** Validare che i caroselli generati rispettino lo stile

### ⚠️ DUPLICAZIONE CRITICA
La skill carosello esiste in **DUE POSTI** identici (problema strutturale segnalato nel QA report):

1. **Repo (versione "vera"):** `/Users/cristian/we_are_Apulia/.claude/skills/apulia-carosello-architect/`
2. **Live (Claude Desktop):** `~/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/b9346dbe-6272-4f97-a5a8-c77452181d4f/9e2ab7de-79d0-468d-a5d8-9e34a6ca1b42/skills/apulia-carosello-architect/`

**Se le modifichi, devi ricordarti di sincronizzare ENTRAMBE manualmente** (o sistema il problema con una soluzione permanente: symlink o copia centralizzata).

---

## 📦 SEZIONE 3: FILE CREATI NUOVI (Output della sessione precedente)

Questi file NON ESISTEVANO prima e sono stati creati da zero:

### QA Audit Output
- `file:///Users/cristian/we_are_Apulia/qa-audit/QA_REPORT_WE_ARE_APULIA.md` — Report completo
- `file:///Users/cristian/we_are_Apulia/qa-audit/qa_report.html` — Formattato leggibile

### Artifact Pubblicati (Links privati)
- **Dashboard Report Agenti:** https://claude.ai/code/artifact/44fa802f-6bc3-41e3-a418-fd3f27e60fa3
  - Output concreto dei 4 agent (Copywriter, Carosello, Storie, Post)
  
- **QA Report Artifact:** https://claude.ai/code/artifact/13e82eee-7766-4d16-a10f-e1ccc96cf9f4
  - Sintesi criticità + roadmap priorità

- **Architettura Pipeline Artifact:** https://claude.ai/code/artifact/9b1d3603-ed1f-4d43-b31d-75fb9ddd5eb6
  - Documento tecnico trigger API

---

## 🔴 SEZIONE 4: WORK ITEMS — COSA FARE SUBITO (Ordine priorità)

Leggi il QA report per i dettagli completi. Qui la sintesi ordine esecuzione:

### PRIORITÀ 1: Trigger API in Cascata (4h) — CRITICITÀ MASSIMA
**Cosa:** Eliminare il buffer 45 minuti tra agent, usare trigger API reali
**File di riferimento:** `file:///Users/cristian/we_are_Apulia/PIPELINE_ARCHITECTURE.md` (sezioni 3-5)
**Dettagli nel QA report:** Sezione "Buffer inefficiente"

**Step esatti:**
1. Su `claude.ai/code/routines`, per OGNI routine (Copywriter, Dashboard, Fact Checker, Copy Reviewer):
   - Clicca "Edit routine"
   - Sezione "Trigger" → "Add another trigger" → scegli **API**
   - Genera token e salvalo in env var (`COPYWRITER_FIRE_TOKEN`, etc.)
2. Aggiungi i comandi `curl` ai prompt (vedi PIPELINE_ARCHITECTURE.md sezioni 3.1, 3.2, 3.3)
3. Crea la cartella `pipeline_state/` nel repo per l'AND-join logic (Analista + Trend Scout)

**Valida con:** Lancia Analista manualmente, verifica che Dashboard parta automaticamente, poi Trend Scout, verifica che Copywriter parta (non due volte)

---

### PRIORITÀ 2: media_manifest.md (3h) — CRITICITÀ MASSIMA
**Cosa:** Catalogo CENTRALIZZATO di tutte le foto disponibili
**Perché:** Carosello/Storie/Post non sanno quali foto usare → generano nomi di file che non esistono
**File da creare:** `file:///Users/cristian/we_are_Apulia/media_manifest.md`

**Struttura (guida):**
```
# Media Manifest — Catalogo Foto

## Cartelle disponibili
- media/eventi/catamarano/agosto-2026/ (15 foto, tutte ✅ verificate)
- media/eventi/trekking/luglio-2026/ (8 foto, 4 anomalie segnalate*)
- media/degustazioni/vigna/ (6 foto)
- media/cene/trullo/ (12 foto)

## Per cartella:
- Lista file nomi
- Data scatto
- Descrizione breve
- Status ✅ OK / ⚠️ WARNING / ❌ ERRORE

*Nota anomalia: album_17.jpg marcato trekking ma è catamarano (trovato da Carosello Architect, verificato)
```

**Valida con:** Fact Checker deve leggere questo file e confermare che TUTTE le foto referenziate da Copywriter/Carosello/Storie/Post esistono davvero

---

### PRIORITÀ 3: Dashboard Monitoraggio Pipeline (2h)
**Cosa:** Pagina che mostra stato LIVE del pipeline (in esecuzione / completato / errori)
**Dove:** `file:///Users/cristian/we_are_Apulia/dashboard-pipeline/index.html`
**Dati source:** Legge `pipeline_state/{data}.json` + log delle sessioni agent
**Output:** Mostra quando Analista finisce, quando Copywriter parte, ETA completamento

**Minimo vitale:**
- Row per ogni agent (nome, stato, ora inizio/fine)
- Se uno non parte quando dovrebbe, flag rosso
- Link alle sessioni su `claude.ai/code/routines`

---

### PRIORITÀ 4: Sincronizzazione Skill Carosello (1h)
**Cosa:** Eliminare la duplicazione repo/live oppure creare una procedura di sync
**Opzione A (Consigliato):** Crea uno script bash che copia dalla repo alla live prima di usare la skill
**Opzione B:** Elimina la copia live, usa symlink (se possibile con Claude Desktop)
**Opzione C:** Lavora solo sulla live, non sul repo (sconsigliato — perde versionamento)

---

### PRIORITÀ 5: Testare Render Carosello End-to-End (2h)
**Cosa:** Verificare che la skill carosello generi davvero le immagini via Higgsfield senza alterare le foto reali
**File:** Usa `apulia-carosello-architect` SKILL
**Test concreto:**
1. Chiedi alla skill di generare 1 carosello "Cena al Trullo"
2. Verifica che referenzi `media/cene/trullo/*.jpg` (foto REALE)
3. Verifica che Higgsfield NON MODIFICHI la foto, solo AGGIUNGA testo overlay
4. Verifica che il testo rispetti la palette terracotta

**Se fallisce:** Debug nel QA report sezione "Rendering visivo"

---

## 📂 SEZIONE 5: FILE ESTERNI (Non ancora integrati)

Questi file sono in una cartella di download, NON ancora integrati nel repo. Priorità bassa:

### `famous-repurpose-ig` (PRIORITÀ MEDIA — integrare)
- **Location:** `/Users/cristian/Downloads/drive-download-20260817T135038Z-1-001/famous-repurpose-ig/`
- **Cosa fa:** Converte video/testo in carosello IG
- **Usa per:** Riutilizzare contenuti vecchi (video reel → carosello)
- **Status:** Non integrata, candidata per futuro

### `famous-reel-editor` (PRIORITÀ BASSA — riadattare)
- **Location:** `/Users/cristian/Downloads/drive-download-20260817T135038Z-1-001/famous-reel-editor/`
- **Problema:** Stile sbagliato (palette non coerente con brand)
- **Action:** Rileggere STYLE.md, adattare ai colori terracotta

### `famous-ig-carousel` (⚠️ NON USARE TAL QUALE)
- **Location:** `/Users/cristian/Downloads/drive-download-20260817T135038Z-1-001/famous-ig-carousel/`
- **Motivo sconsiglio:** È stata rimpiazzata dalla versione integrata in `apulia-carosello-architect`
- **Se la usi:** Rischi duplicazione di lavoro e palette incoerente

---

## ✅ SEZIONE 6: Checklist Handoff

Prima di terminare questa sessione, verifica:

- [ ] Ho letto `QA_REPORT_WE_ARE_APULIA.md` completamente
- [ ] Ho letto `PIPELINE_ARCHITECTURE.md` e capito il grafo dipendenze
- [ ] Ho localizzato i file modificati (skill carosello) e i file creati (QA audit)
- [ ] Ho notato la duplicazione skill (repo + live) e so come risolverla
- [ ] Ho capito l'ordine priorità (Trigger API > media_manifest > Dashboard > Sync skill > Test render)
- [ ] Ho i link agli artifact privati e so dove trovarli

---

## 🆘 Se qualcosa non è chiaro

**Domanda:** Dove trovo il file X?  
**Risposta:** Cerca il path completo nella Sezione 1-5 sopra.

**Domanda:** Come faccio il trigger API?  
**Risposta:** Leggi PIPELINE_ARCHITECTURE.md sezioni 3 (agent) e 5 (setup UI).

**Domanda:** Mi serve il file Y, ma non c'è nel repo  
**Risposta:** Probabilmente è nello scratchpad della sessione precedente (temporaneo). Richiedi a quella sessione di copiarlo nel repo, oppure ricrealo.

---

## 📌 Nota Finale

Questa sessione ha:
- ✅ Analizzato la pipeline completa
- ✅ Creato QA report con criticità
- ✅ Modificato skill carosello per integrazione Higgsfield
- ✅ Creato report output dei 4 agent (organizzato, non dispersivo)
- ✅ Preparato questo handoff

**Prossima sessione deve:**
- Implementare trigger API in cascata (work item #1)
- Creare media_manifest.md (work item #2)
- Fare il resto in ordine di priorità

**Non è necessario ricominciare da zero — i file sono tutti pronti, questo documento guida il "cosa fare next".**

Buona fortuna! 🚀
