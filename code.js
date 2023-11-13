import { cards } from "./cards.js";
const gameEl = document.getElementById("game");
let lastCard = null;
let lastCardEl = null;

// 1. En array med alla kort-objekt är importerade och ligger i cards. Med forEach Lägg till en property
//    showing: false till varje kort för att hålla reda på om kortet visas eller inte.

cards.forEach((card) => (card.showing = false));

// 2. Skapa en funktion createCard. Som tar ett card-objekt och ett index som input och skapar
//    ett img element och lägger till det på sidan i gameEl. Gör så här:
// - skapa ett ett img-element med document.createElement("img")
// - sätt attribut med setAttribute på img-elementet ange tex:
//    imgElement.setAttrubut("src", "images/backside.png") för baksidan på kortet.
//    om card.showing är true använd `images/${card.file}` annars använd "images/backside.png"
// - lägg till width och height till imgElementet
//    width ska vara 100 och height ska vara 145
// - lägg till id = index på card elementet så att du kommer åt det senare
// - använd appendChild för att lägga till kortet till gameEl

function createCard(card, index) {
  const imgElement = document.createElement("img");
  imgElement.setAttribute(
    "src",
    card.showing ? `images/${card.file}` : "images/backside.png"
  );
  imgElement.setAttribute("width", "100");
  imgElement.setAttribute("height", "145");
  imgElement.setAttribute("id", index);
  gameEl.appendChild(imgElement);

  imgElement.addEventListener("click", () => handleCardClick(card, imgElement));
}

// 3. Använd for-loop eller forEach för att loopa igenom alla cards och anropa funktionen
//    createCard med varje kort och varje index (i). Nu ska alla kort synas på sidan.
//    Om du använder forEach måste du lägga till i som andra paremeter i arrow-function.
//    Då räknar i:et från 0 och uppåt

cards.forEach((card, index) => createCard(card, index));

// 4. Lägg till addEventListner på korten i funktionen createCard. När man klickar ska
//    kortet ändras från showing: false till showing:true

// 5 Använd en global variabel lastCard och lastCardEl för att hålla reda på vilket kort man klickade på senast.
//   kolla när man klickar på ett kort om det har samma värde som lastCard (card.num)

// 6 (Ganska svårt) Få ihop hela spelet med det du skrivit ovan.

// Step 6: Implementing the Game Logic
function handleCardClick(card, cardEl) {
  if (card.showing) return; // Prevents clicking the same card

  card.showing = true;
  cardEl.setAttribute("src", `images/${card.file}`);

  if (lastCard && lastCard !== card) {
    if (lastCard.num === card.num) {
      // Logic for a match
      lastCard = null;
      lastCardEl = null;
    } else {
      // Logic for no match
      setTimeout(() => {
        card.showing = false;
        lastCard.showing = false;
        cardEl.setAttribute("src", "images/backside.png");
        lastCardEl.setAttribute("src", "images/backside.png");
        lastCard = null;
        lastCardEl = null;
      }, 1000); // Flip the cards back over after a delay
    }
  } else {
    lastCard = card;
    lastCardEl = cardEl;
  }
}
