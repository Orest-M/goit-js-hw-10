import Notiflix from 'notiflix';

const input = document.querySelector('#search-box');

export function fetchCountries(name) {
  name = input.value.trim();

  const URL = fetch(`https://restcountries.com/v3.1/name/${name}`).then(
    resp => {
      if (resp.ok) {
        return resp.json();
      }
      Notiflix.Notify.failure('Oops, there is no country with that name');
      throw new Error(resp.statusText);
    }
  );

  return URL;
}
