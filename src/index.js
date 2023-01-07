import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

list.style.listStyle = 'none';

const DEBOUNCE_DELAY = 300;
let countriesArray = [];

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  cleanVar();

  const value = input.value.trim();

  if (value.length === 0) {
    return;
  }

  const func = fetchCountries(value);

  func
    .then(resp => {
      for (const i of resp) {
        const countriesInfoObject = {
          name: i.name.official,
          capital: i.capital,
          population: i.population,
          flag: i.flags.svg,
          languages: i.languages,
        };

        countriesArray.push(countriesInfoObject);
      }

      if (countriesArray.length === 1) {
        createInfo();
      }

      if (resp.length >= 2 && resp.length <= 10) {
        createLi();
      }

      if (resp.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(err => {
      console.log(err);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function cleanVar() {
  countriesArray = [];
  list.innerHTML = '';
  info.innerHTML = '';
}

function createLi() {
  const obj = countriesArray
    .map(
      ({ flag, name }) =>
        `<li style="display: flex; gap: 10px; align-items: center;">
          <img src="${flag}" alt="country flag" width="30px">
          <p>${name}</p>
        <li>`
    )
    .join('');

  list.insertAdjacentHTML('afterbegin', obj);
}

function createInfo() {
  info.innerHTML = `<div style="display: flex; gap: 10px; align-items: center;">
                    <img src="${
                      countriesArray[0].flag
                    }" alt="country flag" width="50px">
                    <p style="font-weight: 700; font-size: 30px">${
                      countriesArray[0].name
                    }</p>
                </div>
                <ul style="list-style: none; padding: 0px;">
                    <li style="padding-bottom: 20px; font-size: 20px"><span style="font-weight: 600; font-size: 20px">Capital:&nbsp</span>${
                      countriesArray[0].capital
                    }</li>
                    <li style="padding-bottom: 20px; font-size: 20px"><span style="font-weight: 600; font-size: 20px">Population:&nbsp</span>${
                      countriesArray[0].population
                    }</li>
                    <li style="; font-size: 20px"><span style="font-weight: 600; font-size: 20px">Languages:&nbsp</span>${Object.values(
                      countriesArray[0].languages
                    ).join(', ')}</li>
                </ul>`;
}
