window.addEventListener("load", () => {
	////////////////// APP INITIALIZE ///////////////
const body = document.querySelector("body");
const main = document.querySelector(".initialize-app");
const searchMainIcon = document.getElementsByClassName("s-icon")[0];
const searchIcon = document.getElementsByClassName("s-icon")[1];
const searchInput = document.querySelector("#search-input");
const getUserLocation = document.querySelector(".get-user-location");
const tooltip = document.querySelector(".tooltip");
const button = document.querySelector("#btn");
////////////////// APP BAR /////////////////////
const appBar = document.querySelector(".app-bar");
const homeIcon = document.querySelector("#h-icon");
const searchCity = document.querySelector("#search-city");
////////////////// WEATHER DATA ////////////////
const mainWd = document.querySelector(".weather-data");
const timezone = document.querySelector("#timezone");
const icon = document.querySelector("#icon");
const temperatureDegree = document.querySelector("#temperature");
const degreeSymbol = document.querySelector("#degree-symbol");
const weatherDescription = document.querySelector("#description");
const temperatureSection = document.querySelector(".temperature-degree");
////////////////////////////////////////////////

///////////////// FUNCTIONS ///////////////////

const getLocation = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	}
}

const showPosition = (position) => {
	let lat = position.coords.latitude;
	let long = position.coords.longitude;

	const api = `https://api.openweathermap.org/data/2.5/weather?
	lat=${lat}&lon=${long}&appid=70718392a5498c312a96c3f6aa984203&units=metric`;

	fetchWeatherAPI(api);
}

const fetchWeatherAPI = (api) => {
	fetch(api)
	.then(res => res.json())
	.then(data => {
		if (data.cod === '404') {
			tooltip.style.display = "block";

			setTimeout(() => {
				tooltip.style.display = "none";
			}, 1400)

		} else {
			////////////////// API DATA ////////////////
			const name = data.name;
			const { description, main: weather_condition, icon } = data.weather[0];
			const { temp: temperature } = data.main;
			/////////// Set the DOM with API //////////
			mainWd.style.display = "flex";
			appBar.style.display = "flex";
			main.style.display = "none";

			timezone.textContent = name;
			temperatureDegree.textContent = Math.round(temperature);
			weatherDescription.textContent = description;

			setWeatherStyle(temperature, weather_condition, icon);
			setSearchValue();
		}
	})
}

const setWeatherStyle = (temperature, weather_condition, icon) => {
	const skycons = new Skycons({ color: 'white' });
	skycons.play(); // start animation

	let verifyState = new RegExp('d$', 'g');
	let day;

	if (verifyState.test(icon) === true) {
		day = true;
	} else {
		day = false;
	}

	    // The day states
		if (day === true && weather_condition === "Clear") {
			skycons.add("icon", Skycons.CLEAR_DAY);
			body.style.background = `linear-gradient(#C02425, #F0CB35)`;

			if(temperature < 23) {
				body.style.background = `linear-gradient(#283048, #859398)`;
			}

		} else if (day === true && weather_condition === "Clouds") {
			skycons.add("icon", Skycons.PARTLY_CLOUDY_DAY);
			body.style.background = `linear-gradient(#1488CC, #2B32B2)`;
		// The night states
		} else if (day === false && weather_condition === "Clear") {
			skycons.add("icon", Skycons.CLEAR_NIGHT);
			body.style.background = `linear-gradient(#000428, #004e92)`;
		} else if (day === false && weather_condition === "Clouds") {
			skycons.add("icon", Skycons.PARTLY_CLOUDY_NIGHT);
			body.style.background = `linear-gradient(#232526, #414345)`
		} //rain state
		 else if (weather_condition === "Rain") {
			skycons.add("icon", Skycons.RAIN);  
			body.style.background = `linear-gradient(#525252, #3d72b4)`;
		}

		//Set temperature to Fahrenheit
			temperatureSection.addEventListener("click", () => {
				if ( degreeSymbol.textContent === "°C") {
					degreeSymbol.textContent = "°F";
					temperatureDegree.textContent = Math.round(Number(temperature) * 1.8 + 32);
				} else {
					degreeSymbol.textContent = "°C";
					temperatureDegree.textContent = Math.round(Number(temperature));
				}
			})
	}

	const setSearchValue = () => {
		searchCity.value = searchInput.value;

		searchCity.addEventListener("click", () => {
			searchCity.value = "";
		})
	}

	const returnMain = () => {
		mainWd.style.display = "none";
		appBar.style.display = "none";
		main.style.display = "flex";
		body.style.background = `linear-gradient(#43cea2, #185a9d)`;
		searchInput.value = "";
	}

/////////////////////////////////////////////

////////////// CALLBACKS ///////////////////
button.addEventListener("click", getLocation);
homeIcon.addEventListener("click", returnMain);

searchMainIcon.addEventListener("click", () => {
	let query = searchInput.value;
	const api = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=70718392a5498c312a96c3f6aa984203&units=metric`;
	fetchWeatherAPI(api);
})

searchInput.addEventListener("keyup", (event) => {
		if(event.keyCode === 13) {
			let query = searchInput.value;
			const api = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=70718392a5498c312a96c3f6aa984203&units=metric`;
			fetchWeatherAPI(api);
		}
})



searchCity.addEventListener("keyup", (event) => {
		if(event.keyCode === 13) {
			let query = searchCity.value;
			const api = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=70718392a5498c312a96c3f6aa984203&units=metric`;
			fetchWeatherAPI(api);
			searchInput.value = searchCity.value;
		}
})

searchIcon.addEventListener("click", () => {
	let query = searchInput.value;
	const api = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=70718392a5498c312a96c3f6aa984203&units=metric`;
	fetchWeatherAPI(api);
})

})
