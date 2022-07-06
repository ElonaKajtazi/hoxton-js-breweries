// Deliverables
// - A user can enter a US state and view a list of breweries in that state ✅
//     - The list should have a maximum of 10 breweries on display ✅
// - From the list of breweries, a user can view the following details about each brewery:
//     - Name ✅
//     - Type of brewery ✅
//     - Address ✅
//     - Phone Number ✅
// - By clicking on a brewery item, a user can visit the website of a brewery ✅
// Instructions
// - Download the files from https://codesandbox.io/s/day-18-external-api-hoxton-breweries-simplified-template-v4jg6e ✅
// - Read the "Open Brewery DB" documentation: https://www.openbrewerydb.org/documentation/01-listbreweries ✅
// - Use the list-section.html template as a reference ✅
// - When a user enters a US state into the search bar (and hits enter): ✅
// - Fetch a list of 10 breweries from the API for that state ✅
// - Render the results on the page ✅
// - Render a form with an input that allows the user to filter by brewery name at the top of the results ⚒️

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
  nameFilter: string;
};
let state: State = {
  usState: "",
  breweries: [],
  nameFilter: "",
};

//Q: Witch state are we looking for? (state.usState)
//Q: What breweries do we need to display? (state.breweries)

function getBrweriesForState() {
  fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${state.usState}&per_page=10&by_name=${state.nameFilter}`
  )
    .then((resp) => resp.json())
    .then((getBreweriesFromServer) => {
      state.breweries = getBreweriesFromServer;
      render();
    });
}
// function getFilteredBreweries() {
//   let filteredBreweries = state.breweries.filter((brewery) => {
//     return brewery.name.toLowerCase().includes(state.nameFilter.toLowerCase());
//   });
//   return filteredBreweries;
// }

function renderBreweryListItem(brewery: Brewery, ulEl: HTMLUListElement) {
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
}
function renderNameSearchForm() {
  let formEl = document.createElement("form");
  formEl.id = "search-breweries-form";
  formEl.autocomplete = "off";
  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    state.nameFilter = inputEl.value;
    getBrweriesForState();
    // render();
  });

  let labelEl = document.createElement("label");
  labelEl.htmlFor = "search-breweries";

  let h2El = document.createElement("h2");
  h2El.textContent = "Search breweries:";

  let inputEl = document.createElement("input");
  inputEl.id = "search-breweries";
  inputEl.name = "search-breweries";
  inputEl.type = "text";

  formEl.append(labelEl, inputEl);
  labelEl.append(h2El);

  return formEl;
  // headerEl.append(formEl);

}
function renderBrewery() {
  // getting the main section from html
  let mainEl = document.querySelector("main");
  if (mainEl === null) return;
  // mainEl.textContent = "";
  // rendering the the header
  let titleEl = document.createElement("h1");
  titleEl.textContent = "List of Breweries";

  let headerEl = document.createElement("header");
  headerEl.className = "search-bar";

  let formEl = renderNameSearchForm();

  //rendering the aarticle section that contains the list of breweries

  let articleEl = document.createElement("article");

  let ulEl = document.createElement("ul");
  ulEl.className = "breweries-list";

  // rendering the list item of breweries
  
  for (let brewery of state.breweries) {
    renderBreweryListItem(brewery, ulEl);
  }
  articleEl.append(ulEl);
  mainEl.append(titleEl, headerEl, articleEl);

  headerEl.append(formEl);
  
}

function render() {
  let mainEl = document.querySelector("main");
  if (mainEl === null) return;
  mainEl.textContent = "";
  renderAside();
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
  });
}

listenToSelectStateForm();
render();
window.state = state;
// function renderAside(){
//   let mainEl = document.querySelector("main");
//   if (mainEl === null) return;
//   mainEl.innerHTML = `<aside class="filters-section">
//   <h2>Filter By:</h2>
//   <!-- Type of brewery - Challenge #1 -->
//   <form id="filter-by-type-form" autocompete="off">
//     <label for="filter-by-type">
//       <h3>Type of Brewery</h3>
//     </label>
//     <select name="filter-by-type" id="filter-by-type">
//       <option value="">Select a type...</option>
//       <option value="micro">Micro</option>
//       <option value="regional">Regional</option>
//       <option value="brewpub">Brewpub</option>
//     </select>
//   </form>
//   <!-- Cities  - Challenge #2 -->
//   <div class="filter-by-city-heading">
//     <h3>Cities</h3><button class="clear-all-btn">clear all</button>
//   </div>
//   <form id="filter-by-city-form">
//     <input type="checkbox" name="williamsville" value="williamsville">
//     <label for="williamsville">Williamsville</label> <input type="checkbox" name="holland patent"
//       value="holland patent">
//     <label for="holland patent">Holland Patent</label>
//     <input type="checkbox" name="holbrook" value="holbrook">
//     <label for="more">More cities ...</label>
//     <input type="checkbox" name="more" value="more">
//   </form>

// </aside>`;
// }

function renderAside() {
  let mainEl = document.querySelector("main");
  if (mainEl === null) return;

  let asideEl = document.createElement("aside");
  asideEl.className = "filters-section";

  let h2El = document.createElement("h2");
  h2El.textContent = "Filter By:";

  let formEl = document.createElement("form");
  formEl.id = "filter-by-type-form";
  formEl.autocomplete = "off";

  let labelEl = document.createElement("label");
  labelEl.htmlFor = "filter-by-type";

  let h3El = document.createElement("h3");
  h3El.textContent = "Type of Brewery";

  let selectEl = document.createElement("select");
  selectEl.name = "filter-by-type";
  selectEl.id = "filter-by-type";

  let optionEl = document.createElement("option");
  optionEl.value = "";

  optionEl.textContent = "Select a type...";
  let optionEl2 = document.createElement("option");
  optionEl2.value = "micro";
  optionEl2.textContent = "Micro";

  let optionEl3 = document.createElement("option");
  optionEl3.value = "regional";
  optionEl3.textContent = "Regional";

  let optionEl4 = document.createElement("option");
  optionEl4.value = "brewpub";
  optionEl4.textContent = "Brewpub";

  selectEl.append(optionEl, optionEl2, optionEl3, optionEl4);
  formEl.append(labelEl, h3El, selectEl);

  //   <!-- Cities  - Challenge #2 -->
  //   <div class="filter-by-city-heading">
  //     <h3>Cities</h3><button class="clear-all-btn">clear all</button>
  //   </div>
  //   <form id="filter-by-city-form">
  //     <input type="checkbox" name="williamsville" value="williamsville">
  //     <label for="williamsville">Williamsville</label> <input type="checkbox" name="holland patent"
  //       value="holland patent">
  //     <label for="holland patent">Holland Patent</label>
  //     <input type="checkbox" name="holbrook" value="holbrook">
  //     <label for="more">More cities ...</label>
  //     <input type="checkbox" name="more" value="more">
  //   </form>
  // </aside>

  let divEl = document.createElement("div");
  divEl.className = "filter-by-city-heading";
  let h3El2 = document.createElement("h3");
  h3El2.textContent = "Cities";
  let buttonEl = document.createElement("button");
  buttonEl.className = "clear-all-btn";
  buttonEl.textContent = "clear all";
  divEl.append(h3El2, buttonEl);

  let formEl2 = document.createElement("form");
  formEl2.id = "filter-by-city-form";
  let inputEl = document.createElement("input");
  inputEl.type = "checkbox";
  inputEl.name = "williamsville";
  inputEl.value = "williamsville";
  let labelEl2 = document.createElement("label");
  labelEl2.htmlFor = "williamsville";
  labelEl2.textContent = "Williamsville";
  let inputEl2 = document.createElement("input");
  inputEl2.type = "checkbox";
  inputEl2.name = "holland patent";
  inputEl2.value = "holland patent";
  let labelEl3 = document.createElement("label");
  labelEl3.htmlFor = "holland patent";
  labelEl3.textContent = "Holland Patent";
  let inputEl3 = document.createElement("input");
  inputEl3.type = "checkbox";
  inputEl3.name = "holbrook";
  inputEl3.value = "holbrook";
  let labelEl4 = document.createElement("label");
  labelEl4.htmlFor = "holbrook";
  labelEl4.textContent = "Holbrook";
  let inputEl4 = document.createElement("input");
  inputEl4.type = "checkbox";
  inputEl4.name = "more";
  inputEl4.value = "more";
  let labelEl5 = document.createElement("label");
  labelEl5.htmlFor = "more";
  labelEl5.textContent = "More cities ...";
  formEl2.append(
    inputEl,
    labelEl2,
    inputEl2,
    labelEl3,
    inputEl3,
    labelEl4,
    inputEl4,
    labelEl5
  );

  asideEl.append(divEl, formEl2);
  asideEl.append(h2El, formEl, divEl, formEl2);

  mainEl.append(asideEl);
}
