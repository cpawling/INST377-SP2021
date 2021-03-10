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

const data = await fetch('/api');
const json = await data.json();
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
form addEventListener('submit', async (event) => {

// add code for filtering top 5 



})

}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;