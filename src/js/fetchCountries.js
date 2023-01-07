export function fetchCountries(name) {
  const URL = fetch(`https://restcountries.com/v3.1/name/${name}`).then(
    resp => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error(resp.statusText);
    }
  );

  return URL;
}
