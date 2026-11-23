# EPICODE - Piattaforma Quiz d'Esame

![Logo Epicode](./assets/img/epicode-logo.png)

**Progetto realizzato dal Team 5**

Questa repository contiene il codice sorgente di un'applicazione web interattiva per la gestione di quiz d'esame a tempo, sviluppata per **EPICODE**. La piattaforma è progettata per valutare le conoscenze in ambito informatico e di sviluppo web attraverso un percorso dinamico a risposta multipla.

**Stato del progetto:** in fase di finalizzazione. Questo file viene aggiornato man mano che il progetto viene realizzato.

## Indice

1. [Funzionalità](#funzionalità)
2. [Anteprima](#anteprima)
3. [Tecnologie utilizzate](#tecnologie-utilizzate)
4. [Come eseguire il progetto locale](#come-eseguire-il-progetto-locale)
5. [Struttura del progetto](#struttura-del-progetto)
6. [Architettura](#architettura)
7. [Albero del DOM](#albero-del-dom)
8. [Come funziona](#come-funziona)
9. [Convenzioni di codice](#convenzioni-di-codice)
10. [Il Team 5 e il flusso di lavoro](#il-team-5-e-il-flusso-di-lavoro)

---

## Funzionalità

L'applicazione ha un'interfaccia moderna e reattiva, con uno stile visivo curato e un flusso utente strutturato in tre fasi principali:

1. **Schermata di benvenuto:** presentazione delle istruzioni di svolgimento dell'esame e pulsante **Inizia**.
2. **Sessione di Quiz Interattiva:** domande casuali a risposta multipla e Vero/Falso.
3. **Schermata dei Risultati:** risultati del quiz mostrati in forma percentuale e grafica.

### Funzionalità principali

- **Timer:** mostra a schermo il tempo residuo per rispondere alla domanda.
- **Contatore:** mostra progressivamente il numero delle domande totali e della domanda visualizzata.
- **Domande in ordine casuale:** seleziona casualmente una domanda dall'array.
- **Risposte in ordine casuale:** mostra le risposte disponibili in ordine casuale.
- **Pallini progressivi dinamici:** una sequenza di pallini si aggiorna in base alle risposte date o saltate.
- **Responso risposta:** dopo la selezione viene visualizzato immediatamente un responso sulla correttezza.
- **Visualizzazione esito:** mostra l'esito in forma percentuale, scritta e grafica.
- **Renderizzazione tabella risposte:** mostra domande, risposte selezionate dall'utente e risposte corrette.

## Anteprima

### Pagina di benvenuto
![Pagina di benvenuto](assets/img/welcome.png)

### Quiz
![Quiz](assets/img/quiz.png)

### Risultati
![Risultati](assets/img/result1.png)

### Lista domande
![Lista domande](assets/img/result2.png)

### Risultato simpatico
![Risultato simpatico](assets/img/result3.png)

## Tecnologie utilizzate

- **HTML5:** strutturazione semantica dell'interfaccia utente.
- **CSS3:** styling moderno e layout responsive.
- **JavaScript (ES6+):** gestione dello stato dell'applicazione, timer dinamico, logica del quiz e calcolo del punteggio finale.

## Come eseguire il progetto locale

**1. Clona il repository:**

```bash
git clone https://github.com/Fabioiad2/Team-5-Progetto-Build-week-1
```

**2. Apri l'applicazione:** apri `index.html` nel browser oppure utilizza **Live Server** su VS Code.

## Struttura del progetto

```text
.
├── index.html                  # Pagina unica con il contenitore #app
├── README.md
└── assets/
    ├── css/
    │   └── style.css          # Stile
    ├── img/
    │   ├── bg.jpg             # Sfondo
    │   ├── epicode-logo.png   # Logo Epicode
    │   ├── epicode-logo1.png  # Logo Epicode piccolo
    │   ├── gatti1.jpg         # Foto gatto simpatico
    │   ├── quiz.png           # Screenshot del quiz
    │   ├── result1.png        # Screenshot dei risultati
    │   ├── result2.png        # Screenshot della lista
    │   ├── result3.png        # Screenshot del risultato simpatico
    │   └── welcome.png        # Screenshot della pagina di benvenuto
    └── js/
        └── script.js          # Tutte le funzionalità
```

## Architettura

L'app segue il pattern **Stato → Render → Eventi**.

- **Stato:** la variabile `currentScreen` gestisce lo stato dell'applicazione.
- **Render:** la funzione `render()` utilizza uno `switch` per renderizzare a seconda dello stato, che può assumere tre valori: `welcome`, `quiz` e `results`.
- **Eventi:** all'inizializzazione `currentScreen` è impostata su `welcome`. Il bottone `start` cambia lo stato, avvia `timer()` e chiama `render()`.

Nello stato `isQuiz` viene renderizzata la domanda con risposte cliccabili, un bottone `skip` per saltare la domanda e un bottone `restart` per ricominciare. Quando si clicca una risposta:

1. Vengono disabilitate le opzioni e i bottoni per impedire selezioni multiple.
2. L'opzione viene evidenziata in verde o rosso; in caso di errore viene evidenziata anche la risposta corretta.
3. La coppia domanda-risposta dell'utente viene salvata come oggetto nell'array `givenAnswers`.
4. Le risposte corrette vengono salvate in `greenArray`.
5. `setTimeout()` ritarda di due secondi il `render()` successivo, permettendo di vedere il feedback grafico.
6. Al completamento del quiz, lo stato diventa `results` e viene chiamato `render()`.

Nello stato `isResult` vengono mostrati la percentuale, la scritta **Promosso** o **Bocciato**, il grafico a ciambella e il bottone **Visualizza risposte**, che apre la tabella delle domande con risposte dell'utente e risposte corrette. Il bottone `restart` ricarica la pagina. Se non si risponde a nessuna domanda, un **easter egg** mostra un gatto al posto del grafico con la domanda «Perché non hai risposto a nessuna domanda?».

## Albero del DOM

### Welcome

```html
<main id="app">
  <div class="welcome">
    <h2 class="title">Benvenuto al tuo esame!</h2>
    <p class="intro">...<span>20 secondi</span>...</p>
    <button class="start">Inizia</button>
  </div>
</main>
```

### Quiz

```html
<main id="app">
  <div class="container">
    <div id="counter">Domanda: X su 10</div>
  </div>
  <div id="timer"><p>20</p></div>
  <h2 class="question">Testo Domanda</h2>
  <div class="questionnaire">
    <ul class="answers">
      <li><button class="optionButton correct">Risposta</button></li>
    </ul>
    <div class="buttonQ">
      <button class="skip">Salta</button>
      <button class="restartQ">Ricomincia</button>
    </div>
    <div class="divDot"><div class="purple"></div></div>
  </div>
</main>
```

La classe della risposta può essere `correct` oppure `wrong`, a seconda dell'esito.

### Result

```html
<main id="app">
  <div class="results">
    <h2 class="resultsTitle">Risultati</h2>
    <p>Quiz completato!</p>
    <div id="graph" class="graph">
      <span class="percentage">XX%</span>
    </div>
    <article>
      <ul class="legend">
        <li><div class="colorGreen"></div><p>Corrette</p></li>
        <li><div class="colorRed"></div><p>Errate</p></li>
        <li><div class="colorGray"></div><p>Nulle</p></li>
      </ul>
    </article>
    <div id="isPassedContainer" class="passed">
      <p>Promosso / Bocciato</p>
    </div>
    <div class="buttonsResult">
      <button class="restart">Ricomincia</button>
      <button class="displayQ">Visualizza risposte</button>
    </div>
    <div class="tableContainer">
      <table class="hide">
        <thead>
          <tr><th>Domande</th><th>Risposte</th><th>Soluzione</th></tr>
        </thead>
        <tbody>
          <tr><td>...</td><td>...</td><td>...</td></tr>
        </tbody>
      </table>
    </div>
    <div class="easterEgg"></div>
  </div>
</main>
```

La classe dell'esito può essere `passed` oppure `failed`.

## Come funziona

Le domande sono oggetti contenuti nell'array `QUESTIONS`. Ogni oggetto possiede una proprietà `question`, una proprietà `correct_answer` con la risposta corretta e un array `incorrect_answers` con le risposte errate.

```javascript
{
  question: "In Java, quale keyword si usa per impedire che una variabile venga modificata?",
  correct_answer: "final",
  incorrect_answers: ["static", "private", "public"]
}
```

### 1. Schermata di benvenuto

- Presentazione delle istruzioni di svolgimento dell'esame.
- Pulsante **Inizia** per avviare la sessione di test.

### 2. Sessione di Quiz Interattiva

- 10 domande casuali su Informatica, Programmazione e Cultura Tech.
- Contatore della domanda corrente e del totale.
- Timer di 20 secondi per domanda, in alto a destra.
- Domande a risposta multipla e Vero/Falso.
- Feedback immediato: **verde** per la risposta corretta, **rosso** per quella errata.
- Pulsanti **Salta** e **Ricomincia**.
- Pallini progressivi che indicano le domande a cui si è risposto o che sono state saltate.

#### Timer

La funzione `timer()`:

1. Mostra il tempo rimanente in ordine decrescente da 20 a 1.
2. Gestisce una classe che colora il timer di rosso quando mancano 5 secondi.
3. Quando manca 1 secondo disabilita opzioni e bottoni e gestisce una classe che colora di verde la risposta corretta.
4. Inserisce una risposta vuota nell'array `givenAnswers` tramite `push()` e passa alla domanda successiva.

#### Contatore

La funzione `counter()` aggiorna `counterNum` a ogni click sulle risposte e mostra la domanda corrente e il numero totale delle domande. All'ultima domanda cambia lo stato in `results`.

#### Domande in ordine casuale

Dentro `isQuiz()`, una callback a `randomLength()` seleziona un indice casuale usando `Math.floor()` e `Math.random()`. Il metodo `splice()` rimuove e restituisce l'elemento selezionato, evitando che la stessa domanda venga ripetuta.

#### Risposte in ordine casuale

Un loop all'interno di `isQuiz()` raggruppa le risposte in un array e le seleziona casualmente tramite `randomLength()`. Il metodo `splice()` rimuove la risposta scelta e la inserisce nella lista mostrata a schermo, garantendo iterazioni senza ripetizioni.

#### Pallini progressivi dinamici

Dentro `isQuiz()` vengono creati i pallini. Un filtro seleziona gli indici delle risposte date e li colora, indicando quali domande hanno ricevuto una risposta e quali no.

#### Responso risposta

Una condizione dentro `isQuiz()`, attivata al click su una risposta, verifica se è corretta e assegna la classe grafica corrispondente. In caso di errore viene evidenziata anche la risposta corretta.

### 3. Schermata dei Risultati

- Calcolo automatico della percentuale.
- Indicatore dell'esito dell'esame.
- Grafico a ciambella con risposte corrette, errate e nulle.
- Leggenda dei colori.
- Pulsante **Ricomincia**.
- Pulsante **Visualizza risposte** per il riepilogo completo.

#### Visualizzazione esito

All'interno di `isResult()`, `calculatePercentage()` confronta le risposte dell'array `givenAnswers`, conservate nella proprietà `answers`, con le risposte corrette nell'array `greenArray`. La percentuale di corrispondenza viene arrotondata all'intero più vicino.

La percentuale viene confrontata con la costante `PASS_THRESHOLD` fornita dal cliente: se è maggiore della soglia, appare **Promosso**; altrimenti **Bocciato**.

#### Renderizzazione tabella risposte

All'interno di `isResult()` viene generata la struttura della tabella con un `thead` statico. Il metodo `forEach()` popola dinamicamente una riga per domanda con tre colonne: **Domanda**, **Risposta dell'utente** e **Risposta corretta**.

`forEach()` itera gli oggetti di `givenAnswers`, genera tre `td` e usa le proprietà `question` e `answer` per compilare le prime due colonne. La terza colonna usa l'elemento di `greenArray` allo stesso indice. La tabella diventa visibile al click sul pulsante dedicato.

### 4. Regole del Quiz

- Il test comprende **10 domande** casuali.
- Ogni domanda ha un limite di **20 secondi**.
- Si può selezionare una sola risposta per domanda.
- Dopo la risposta o allo scadere del tempo si passa alla domanda successiva.
- La durata stimata è di circa **3 minuti**.
- È possibile ricominciare il quiz in qualsiasi momento.

### Aspetto grafico

L'applicazione presenta un'interfaccia moderna con sfondo scuro sfumato in viola e logo EPICODE in alto. Al centro è presente un riquadro bianco fumo con angoli arrotondati che mostra il benvenuto, le regole e il pulsante **Inizia**.

Tutti i pulsanti hanno un effetto `hover`: al passaggio del cursore si colorano di viola chiaro e il cursore diventa un puntatore.

Durante il quiz viene mantenuto lo stesso stile grafico. Nel riquadro sono presenti la domanda corrente, un timer rettangolare che diventa rosso quando il tempo sta per scadere, le risposte disposte verticalmente e i pallini progressivi. Le risposte errate vengono evidenziate in rosso, quelle corrette in verde.

I bottoni **Salta** e **Ricomincia** sono uniformi agli altri pulsanti. Sotto di essi si trova una sequenza di dieci pallini bianco fumo, con bordo scuro e ombra leggera. Dopo ogni risposta, un pallino assume una tonalità viola simile allo sfondo.

Al termine del quiz viene mostrato un grafico a ciambella che distingue risposte corrette, errate e nulle, accompagnato da una leggenda. L'esito comprende una percentuale e la scritta **Promosso/Bocciato** con una faccina. I pulsanti permettono di riavviare il quiz o mostrare la tabella delle risposte.

Se l'utente non seleziona nessuna risposta, un simpatico gatto si sovrappone al grafico e chiede perché non abbia risposto alle domande.

## Convenzioni di codice

- `camelCase` per le variabili e maiuscolo per le costanti.
- Variabili, funzioni, costanti e chiavi degli oggetti in inglese, con nomi intuitivi.
- Commenti per facilitare la comprensione del codice.
- Solo `const` e `let`, mai `var`.
- `querySelector()` e `querySelectorAll()` per il DOM.
- `addEventListener()`, mai `onclick` inline nell'HTML.

## Il Team 5 e il flusso di lavoro

| Persona | Ruolo |
|---|---|
| Miriam Caridi | Team leader |
| Fabio Iadicicco | Gestore Git, JavaScript |
| Lisa Irene Sciacca | README, CSS |
| Adriano Sant'Angelo | JavaScript |
| Charlie Cenni | CSS |
| Matteo Brucculeri | JavaScript |

### Organizzazione del lavoro

- **Live Share:** secondo le necessità, un membro del team ha fatto da host e ha lavorato insieme agli altri sul codice in contemporanea.
- **Gestione Git:** una sola persona gestisce repository, branch, merge e pull request, con il supporto del team.
- **Repository:** il progetto è ospitato sul profilo Git della persona che gestisce Git.

---

**EPICODE — Build Week 1 | Team 5**
