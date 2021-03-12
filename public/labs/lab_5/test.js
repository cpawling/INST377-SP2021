
const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const zipcodes = [];
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => zipcodes.push(...data));

function findMatches(wordToMatch, zipcodes) {
  return zipcodes.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.zip.match(regex); // || place.state.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, zipcodes);
  const topfive = filtered.slice(0, 5);

  const html = topFive.map(place => {
    const regex = new RegExp(this.value, 'gi');
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

  const searchInput = document.querySelector('.input');
  const suggestions = document.querySelector('.suggestions');
  
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);
}