'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
let coords = [];
const API_KEY = '772497457103131750458x9836';
///////////////////////////////////////
getCoords();
// btn.addEventListener('click',  ()=>{whereAmI(coords)} )
whereAmI([-33.933,18.474])
function getCoords() {
  navigator.geolocation.getCurrentPosition(geoPosition => {
    const { latitude, longitude } = geoPosition.coords;
    coords = [latitude, longitude]; 
  });
}

function whereAmI([lat, long]) { 
   
  return getJSON(`https://geocode.xyz/${lat},${long}?geoit=json&auth=${API_KEY}`) 
    .then(data=>{
        const {country, city} = data; 
        console.log(`You are in ${city}, ${country}`)
        return country;
    })
    .then(countryName => getCountryData(countryName))
    .catch(error => console.log(error));
}


function getJSON(url,errorMessage='Something whent wrong!'){

    return fetch(url).then(response => {
        if (!response.ok)
            throw new Error(`${errorMessage} ${response.status}`)
        return response.json()
    })

}


function getCountryData(countryName){
    return getJSON(`https://restcountries.com/v3.1/name/${countryName}`)
     .then(([data])=> processCountryData(data))
     .then(countryData=> renderCountry(countryData))
     .catch(error=> console.log(error))
     .finally(()=>{
        countriesContainer.style.opacity =1;
     })

}


function renderCountry(data){
    
    countriesContainer.insertAdjacentHTML(`beforeend`,`<article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row"><span>🗣️</span>${data.language}</p>
            <p class="country__row"><span>💰</span>${data.currency}</p>
          </div>
        </article>`);
    
}

function processCountryData(data){
    const countryData ={};


    countryData.flag = data.flags.png
    countryData.name = data.name.common;
    countryData.region = data.region;
    countryData.population = data.population;
    countryData.language =  Object.values(data.languages).at(-1);
    countryData.currency =  Object.keys(data.currencies).at(-1);
   
    return countryData;

}