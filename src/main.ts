let state = {
  usState: "",
  breweries: [],
};

//Q: Witch state are we looking for?
//Q: What breweries do we need to display?
function getBrweriesForState() {
  fetch("https://api.openbrewerydb.org/breweries")
    .then((resp) => resp.json())
    .then((getBreweriesFromServer) => {
      state.breweries = getBreweriesFromServer;
      console.log(state.breweries);
    });

  // find breweries in this state
  // put them in state
  // render
}

function renderHeader() {
  //     <h1>List of Breweries</h1>
  // <header class="search-bar">
  //   <form id="search-breweries-form" autocomplete="off">
  //     <label for="search-breweries"><h2>Search breweries:</h2></label>
  //     <input id="search-breweries" name="search-breweries" type="text" />
  //   </form>
  // </header>
}

function renderBreweryList() {
  //   <article>
  //   <ul class="breweries-list">
  //   </ul>
  // </article>
}
function renderSingleBrewery() {
  //     <li>
  //       <h2>Snow Belt Brew</h2>
  //       <div class="type">micro</div>
  //       <section class="address">
  //         <h3>Address:</h3>
  //         <p>9511 Kile Rd</p>
  //         <p><strong>Chardon, 44024</strong></p>
  //       </section>
  //       <section class="phone">
  //         <h3>Phone:</h3>
  //         <p>N/A</p>
  //       </section>
  //       <section class="link">
  //         <a href="null" target="_blank">Visit Website</a>
  //       </section>
  //     </li>

}
function renderBrewery() {
  // getting the main section from html
  let mainEl = document.querySelector("main");
  if (mainEl === null) return;
  mainEl.textContent = "";
  // rendering the the header
  let titleEl = document.createElement("h1");
  titleEl.textContent = "List of Breweries";

  let headerEl = document.createElement("header");
  headerEl.className = ("search-bar");

  let formEl = document.createElement("form");
  formEl.id = "search-breweries-form";
  formEl.autocomplete = "off";

  let labelEl = document.createElement("label");
  labelEl.htmlFor = "search-breweries";

  let h2El = document.createElement("h2");
  h2El.textContent = "Search breweries:";

  let inputEl = document.createElement("input");
  inputEl.id = "search-breweries";
  inputEl.name = "search-breweries";
  inputEl.type = "text";

//rendering the aarticle section that contains the list of breweries
  let articleEl = document.createElement("article");

  let ulEl = document.createElement("ul");
  ulEl.className = "breweries-list";

// rendering the list item of breweries
  let liEl = document.createElement("li");

  let h2El2 = document.createElement("h2");
  h2El2.textContent = "Snow Belt Brew";

  let divEl = document.createElement("div");
  divEl.className = "type";
  divEl.textContent = "micro";

  let sectionEl = document.createElement("section");
  sectionEl.className = "address";

  let h3El = document.createElement("h3");
  h3El.textContent = "Address:";

  let pEl = document.createElement("p");
  pEl.textContent = "9511 Kile Rd";

  let pEl2 = document.createElement("p");
  pEl2.textContent = "<strong>Chardon, 44024</strong>";

  let sectionEl2 = document.createElement("section");
  sectionEl2.className = "phone";

  let h3El2 = document.createElement("h3");
  h3El2.textContent = "Phone:";

  let pEl3 = document.createElement("p");
  pEl3.textContent = "N/A";

  let sectionEl3 = document.createElement("section");
  sectionEl3.className = "link";

  let aEl = document.createElement("a");
  aEl.href = "null";
  aEl.target = "_blank";
  aEl.textContent = "Visit Website";
  

  headerEl.append(formEl);
  formEl.append(labelEl, inputEl);
  labelEl.append(h2El);

  articleEl.append(ulEl);
  ulEl.append(liEl);
  liEl.append(h2El2, divEl, sectionEl, sectionEl2, sectionEl3);
  sectionEl.append(h3El, pEl, pEl2);
  sectionEl2.append(h3El2, pEl3);
  sectionEl3.append(aEl);


  mainEl.append(titleEl, headerEl, articleEl);
  
}
function render() {

  renderBrewery();

}

function listenToSelectStateForm() {
  let formEl = document.querySelector<HTMLFormElement>("#select-state-form");
  formEl?.addEventListener("submit", (event) => {
    event.preventDefault();
    // @ts-ignore
    let usState = formEl["select-state"].value;
    state.usState = usState;
    getBrweriesForState();

    // console.log(`Looking for breweries in ${formEl["select-state"].value}`);
  });
}

listenToSelectStateForm();
render();
