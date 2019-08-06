const cityform = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");

//updating the user interface

const updateUI = result => {
  console.log(result);
  const city = result.cityDetails;
  const weather = result.weather;
  //const { cityDetails, weather } = data;
  details.innerHTML = `
    <h5 class="my-3">${city.EnglishName}</h5>
          <div class="my-2 ">${weather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg; c</span>
          </div>
    `;
  //update day night and icon images

  const iconsrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconsrc);
  let imgsrc = null;
  if (weather.IsDayTime) {
    imgsrc = "img/day.svg";
  } else {
    imgsrc = "img/night.svg";
  }
  time.setAttribute("src", imgsrc);

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
