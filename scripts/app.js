const cityform = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");

//updating the user interface

const updateUI = result => {
  const city = result.cityDetails;
  const weather = result.weather;
  details.innerHTML = `
    <h5 class="my-3">${city.EnglishName}</h5>
          <div class="my-2 ">${weather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg; c</span>
          </div>
    `;
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

//updating city

const updateCity = async city => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails,
    weather
  };
};

//event listener
cityform.addEventListener("submit", e => {
  e.preventDefault();

  const city = cityform.city.value.trim();
  cityform.reset();

  updateCity(city)
    .then(result => updateUI(result))
    .catch(err => err);
});
