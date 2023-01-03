export async function fetchCountries(name) {
  countriesArray = [];
  list.innerHTML = '';
  info.innerHTML = '';

  name = input.value.trim();

  if (input.value.length > 0) {
    const URL = await fetch(`https://restcountries.com/v3.1/name/${name}`).then(
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
      const countriesInfoObject = {
        name: i.name.official,
        capital: i.capital,
        population: i.population,
        flag: i.flags.svg,
        languages: i.languages,
      };

      countriesArray.push(countriesInfoObject);
    }

    createLi();

    if (countriesArray.length === 1) {
      createInfo();
    }
  }
}
