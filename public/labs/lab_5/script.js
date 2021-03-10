function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const var mymap = L.map('mapid').setView([51.505, -0.09], 13); //fix me with proper coords
  //DO REMAINING TUTORIAL
  return map;
}

async function dataHandler(mapObjectFromFunction) {
const form = document.querySelector('#search-form');
const search = document.querySelector('#search');
const targetlist = document.querySelector('target-list');

const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const cities = [];
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex); // || place.state.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map((place) => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const addressLine1 = place.address_line_1;
    const {category} = place;
    const restaurantName = place.name;
    return `
      <li>
      <div class = "suggestions li box is-small has-background-orange">
        <span class="name">${restaurantName}</span>
        <br>
        <span class="category">${category}</span>
        <br>
        <span class="address">${addressLine1}</span>
        <br>
        <span class="city">${cityName}</span>
      </div>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.input');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

const json = await data.json();
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
form addEventListener('submit', async (event) => {
  targetList.innerText = ' ';


  event.preventDefault();
  //make sure resturaunts show up on map with code - note for charles
  const filtered = data.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
  const topfive = filtered.slice(0, 5);

// add code for filtering top 5 



})

}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;