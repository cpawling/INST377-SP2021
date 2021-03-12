function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map('mapid').setView([38.9907561,-76.9384114], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY3Bhd2luc3QiLCJhIjoiY2ttM3d0djFuMGsxbzJvbzJ6dmdnZ3hlcSJ9.kvJqb2mlSULFZ6YKqvPZCw'
}).addTo(mymap);

var marker = L.marker([38.9907561,-76.9384114]).addTo(mymap);
console.log('mymap', mymap)

const popup = L.popup();

function onMapClick(e) {
  popup
    .setlongLatitude(e.longLatitude)
    .setContent(`You clicked the map at ${e.longLatitude.toString()}`)
    .openOn(mymap);
}

mymap.on('click', onMapClick);

return mymap;
}



async function dataHandler(mapObjectFromFunction) {


const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const search = document.querySelector('#input');
const formElem = document.querySelector('#formElem');
const suggestions = document.querySelector('.suggestions');
const replyMessage = document.querySelector('.reply-message');
const request = await fetch(endpoint);
const data = await request.json();


  function displayzip(event, zipcodes) {
    function findMatches(wordToMatch) {
      return zipcodes.filter((place) => {
        const regex = new RegExp(wordToMatch, "gi");
        return place.zip.match(regex);
      });
    }


  const matchArray = findMatches(event.target.value, zipcodes);

  zipcodes.forEach((item) => {
    const longLatitude = item.geocoded_column_1.coordinates;
    console.log('markerLongLat', longLatitude[0], longLatitude[1]);
    const marker = L.marker([longLatitude[1], longLatitude[0]]).addTo(mapObjectFromFunction);
    const html = matchArray.map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city;
      const zipCode = place.zip;
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
          <span class="zipcode">${zipCode}</span>
          <br>
          <span class="city">${cityName}</span>
        </div>
        </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
});
}


  // use your assignment 1 data handling code h ere
  // and target mapObjectFromFunction to attach markers
  formElem.addEventListener('submit', (events) => {
    events.preventDefault();
    console.log('submit activated', search.value);
    //make sure resturaunts show up on map with code - note for charles
    const filtered = data.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
    const topfive = filtered.slice(0, 5);
    // add code for filtering top 5

    if (topfive.length < 1) {
      replyMessage.classList.add('box');
      replyMessage.innerText = 'No matches found';
      return
    }

    displayzip(events, topfive);
   


  const {coordinates} = topfive[0]?.geocoded_column_1;
  console.log('view coords',coordinates);
  mapObjectFromFunction.panTo([coordinates[1],coordinates[0]], 0);
  });
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;




