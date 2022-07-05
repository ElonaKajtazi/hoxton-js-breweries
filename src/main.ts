let state = {
  usState: "",
  breweries: [],
};

//Q: Witch state are we looking for?
//Q: What breweries do we need to display?
function getBrweriesForState() {
// find breweries in this state
// put them in state
// render
}

function renderHeader(){
//     <h1>List of Breweries</h1>
// <header class="search-bar">
//   <form id="search-breweries-form" autocomplete="off">
//     <label for="search-breweries"><h2>Search breweries:</h2></label>
//     <input id="search-breweries" name="search-breweries" type="text" />
//   </form>
// </header>
}

function renderBreweryList (){

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
//     // More list elements

}
function render() {
let mainEl = document.querySelector("main");
if (mainEl === null) return
mainEl.textContent = "";

renderHeader();
renderBreweryList();


}

function listenToSelectStateForm() {
  let formEl = document.querySelector<HTMLFormElement>("#select-state-form");
  formEl?.addEventListener("submit", (event) => {
    event.preventDefault();
    // @ts-ignore
    let usState = formEl["select-state"].value
    state.usState = usState;
    getBrweriesForState();

    // console.log(`Looking for breweries in ${formEl["select-state"].value}`);
  });
}

listenToSelectStateForm();
