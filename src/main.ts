type Brewery = {
  id: string;
  name: string;
  brewery_type: string;
  street: null;
  address_2: string | null;
  address_3: string | null;
  city: string;
  state: string;
  county_province: string | null;
  postal_code: string;
  country: string;
  longitude: string | null;
  latitude: string | null;
  phone: string | null;
  website_url: string | null;
  updated_at: string;
  created_at: string;
};
type State = {
  usState: string;
  breweries: Brewery[];
};
let state: State = {
  usState: "",
  breweries: [],
};

//Q: Witch state are we looking for? (state.usState)
//Q: What breweries do we need to display? (state.breweries)
function getBrweriesForState() {
  fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.usState}`)
    .then((resp) => resp.json())
    .then((getBreweriesFromServer) => {
      state.breweries = getBreweriesFromServer;
      render();
    });
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
  headerEl.className = "search-bar";

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
  for (let brewery of state.breweries) {
    let liEl = document.createElement("li");

    let h2El2 = document.createElement("h2");
    h2El2.textContent = brewery.name;

    let divEl = document.createElement("div");
    divEl.className = "type";
    divEl.textContent = brewery.brewery_type;

    let sectionEl = document.createElement("section");
    sectionEl.className = "address";

    let h3El = document.createElement("h3");
    h3El.textContent = "Address:";

    let pEl = document.createElement("p");
    pEl.textContent = brewery.street;

    let pEl2 = document.createElement("p");
    let strongEl = document.createElement("strong");
    strongEl.textContent = `${brewery.city} ${brewery.postal_code}`;

    let sectionEl2 = document.createElement("section");
    sectionEl2.className = "phone";

    let h3El2 = document.createElement("h3");
    h3El2.textContent = "Phone:";

    let pEl3 = document.createElement("p");
    pEl3.textContent = brewery.phone ? brewery.phone : "N/A";

    let sectionEl3 = document.createElement("section");
    sectionEl3.className = "link";

    let aEl = document.createElement("a");
    if (brewery.website_url) {
      aEl.href = brewery.website_url;
      aEl.textContent = "Visit Website";
    } else {
      aEl.href = "#";
      aEl.textContent = "No Website";
    }

    ulEl.append(liEl);
    liEl.append(h2El2, divEl, sectionEl, sectionEl2, sectionEl3);
    sectionEl.append(h3El, pEl, pEl2);
    pEl2.append(strongEl);
    sectionEl2.append(h3El2, pEl3);
    sectionEl3.append(aEl);
    articleEl.append(ulEl);
    mainEl.append(titleEl, headerEl, articleEl);
  }
  headerEl.append(formEl);
  formEl.append(labelEl, inputEl);
  labelEl.append(h2El);
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
