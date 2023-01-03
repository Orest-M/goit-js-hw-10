import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

list.style.listStyle = 'none';

const DEBOUNCE_DELAY = 300;
let countriesArray = [];

input.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

function fetchCountries(name) {
  countriesArray = [];
  list.innerHTML = '';
  info.innerHTML = '';

  name = input.value;

  if (input.value.length > 0) {
    const URL = fetch(`https://restcountries.com/v3.1/name/${name}`).then(
      resp => {
        if (!resp.ok) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        }

        return resp.json();
      }
    );

    if (URL.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
      return;
    }

    for (const i of URL) {
      const y = {
        name: i.name.official,
        capital: i.capital,
        population: i.population,
        flag: i.flags.svg,
        languages: i.languages,
      };

      countriesArray.push(y);
    }

    createLi();

    // console.log(countriesArray);

    if (countriesArray.length === 1) {
      createInfo();
    }
  }
}

// import { fetchCountries } from './js/fetchCountries.js';

fetchCountries();

function createLi() {
  for (const i of countriesArray) {
    // console.log(i);

    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.gap = '10px';
    li.style.alignItems = 'center';
    li.innerHTML = `<img src="${i.flag}" alt="country flag" width="30px">
            <p>${i.name}</p>`;

    list.append(li);
  }
}

function createInfo() {
  list.innerHTML = '';

  info.innerHTML = `<div style="display: flex; gap: 10px; align-items: center;">
                    <img src="${countriesArray[0].flag}" alt="country flag" width="50px">
                    <p style="font-weight: 700; font-size: 30px">${countriesArray[0].name}</p>
                </div>
                <ul style="list-style: none; padding: 0px;">
                    <li style="padding-bottom: 20px; font-size: 20px"><span style="font-weight: 600; font-size: 20px">Capital:&nbsp</span>${countriesArray[0].capital}</li>
                    <li style="padding-bottom: 20px; font-size: 20px"><span style="font-weight: 600; font-size: 20px">Population:&nbsp</span>${countriesArray[0].population}</li>
                    <li style="; font-size: 20px"><span style="font-weight: 600; font-size: 20px">Languages:&nbsp</span>${countriesArray[0].languages}</li>
                </ul>`;
}
