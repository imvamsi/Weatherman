const key = "EFJGmNAeFXaJr9Ksp65dGZog53VG5AA5";

const getCity = async city => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";

  const query = `?apikey=${key}&q=${city}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data;
};

getCity("chennai")
  .then(data => console.log(data))
  .catch(err => console.log("Varla da sunni"));
