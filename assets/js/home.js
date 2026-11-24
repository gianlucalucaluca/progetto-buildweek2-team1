/* ============================================================
   home.js — costruzione della Home
   ============================================================

   COSA DEVI FARE
   1) initPage("home")  // monta sidebar + player
   2) Costruisci queste righe (sezioni) nella .home:
       a - "Riprodotti di recente" (da getHistory())  -- mostra solo se non vuot
        - "I tuoi preferiti"       (da getFavourites()) -- mostra solo se non vuota
        - "Suggerimenti pop"       (fetch search term=pop entity=song limit=12)
        - "Suggerimenti rock"      (fetch search term=rock entity=song limit=12)
        - "Suggerimenti hits"   (fetch search term=hits pop entity=song limit=12)
   3) Le tre fetch dei suggerimenti vanno in PARALLELO con Promise.all setted
   4) Ogni card è una Track: cover, titolo, artista, button play, button cuore (favourite)
   5) Click card -> window.player.play(track)
   6) Click cover senza play -> link a album.html?id=albumId (opzionale)
*/

const player = initPage("home");

const home = document.querySelector(".home");

/*
  renderRow(rowTitle, tracks)
  - crea una <section class="row"> con titolo h2 e griglia .grid di .card per ogni track
  - aggancia click handler che chiamano player.play(track) e toggleFavourite(track)
*/
const renderRow = (rowTitle, tracks) => {
  // Se ".home" non esiste o "tracks" non è un array con almeno un brano, esce subito
  if (!home || !Array.isArray(tracks) || tracks.length === 0) return;

  // <section> rigs
  const section = document.createElement("section");
  // Aggiunge la classe "row" alla sezione
  section.classList.add("row");

  // titolo
  const heading = document.createElement("h2");
  // Inserisce il testo del titolo passato in ingresso Suggerimenti pop
  heading.textContent = rowTitle;

  // contenitore card
  const grid = document.createElement("div");
  // Aggiunge la classe "grid" al contenitore
  grid.classList.add("grid");

  tracks.forEach((track) => {
    // Usa la funzione secondaria
    const card = createTrackCard(track);
    // Inserisce la card appena creata dentro la griglia
    grid.appendChild(card);
  });

  section.appendChild(heading);
  section.appendChild(grid);
  home.appendChild(section);
};
/*
  loadHome()
  - chiama Promise.all sulle 3 fetch di suggerimenti
  - costruisce le righe nell'ordine: history, favourites, pop, rock, hits
*/
const loadHome = async () => {
  // TODO
};

loadHome();

/*
const createTrackCard = (track) => {

div.card[dataset.trackId] = track.id

div.card-image-wrap[img:src = bigArt(track.cover), alt = track.title]

button.card-play["▶"]

button.card-fav["♡"] = is-fav isFavourite(track.id) 

p.card-title[track.title]

p.card-sub[track.artist]

-appendChild in ordine: riquadro(img), card(riquadro + play + cuore + titolo + artista)-

wrap.appendChild(img) 
card.appendChild div.card-image-wrap
card.appendChild button.card-play["▶"]
card.appendChild button.card-fav["♡"] = is-fav
card.appendChild p.card-title[track.title]
card.appendChild p.card-sub[track.artist]

return card; */
