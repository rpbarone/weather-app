window.addEventListener("load", () => {
	let lat;
	let long;
	let locationTimezone = document.getElementById("tmz");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureSection = document.querySelector(".temperature");
	let temperatureSpan = document.querySelector(".degree-section span");
	let locationSection = document.querySelector(".location");
	let initializeLocation = document.querySelector(".initialize-location");
	let weatherIcon = document.querySelector('.icon');
	let titleApp = document.querySelector(".title");
	let icon = document.querySelector(".icon");
	let body = document.querySelector("body");
	let input = document.getElementById("inp1");
	let button = document.getElementById("pick-current-location");
	let hoursLocation = document.getElementById("hour");

	
	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition, showError);
		}
	}

	const showPosition = (position) => {
		lat = position.coords.latitude;
		long = position.coords.longitude;
		
		const api2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=70718392a5498c312a96c3f6aa984203&units=metric`
		//const api = `http://api.weatherstack.com/current?access_key=79385e97b07a4948a7df68e196a6f759&query=${lat},${long}`;	
		fetchWeatherAPI(api2);

	}

	const fetchWeatherAPI = (api) => {
		fetch(api)
		.then(res => res.json())window.addEventListener("load", () => {
	let lat;
	let long;
	let locationTimezone = document.getElementById("tmz");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureSection = document.querySelector(".temperature");
	let temperatureSpan = document.querySelector(".degree-section span");
	let locationSection = document.querySelector(".location");
	let initializeLocation = document.querySelector(".initialize-location");
	let weatherIcon = document.querySelector('.icon');
	let titleApp = document.querySelector(".title");
	let icon = document.querySelector(".material-icons");
	let body = document.querySelector("body");
	let input = document.getElementById("inp1");
	let button = document.getElementById("pick-current-location");
	let hoursLocation = document.getElementById("hour");

	
	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition, showError);
		}
	}

	const showPosition = (position) => {
		lat = position.coords.latitude;
		long = position.coords.longitude;
		
		const api2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=70718392a5498c312a96c3f6aa984203&units=metric`
		//const api = `http://api.weatherstack.com/current?access_key=79385e97b07a4948a7df68e196a6f759&query=${lat},${long}`;	
		fetchWeatherAPI(api2);

	}

	const fetchWeatherAPI = (api) => {
		fetch(api)
		.then(res => res.json())
		.then(data => {
			if (data.cod === '404') {
				input.style.border = "2px solid rgba(255,40,0, 0.75)";
				let div = document.createElement("div");
				let msg = document.createTextNode("City not found!");
				div.appendChild(msg);
				div.style.fontSize = "0.9rem";
				initializeLocation.appendChild(div);

			} else {
			//Set the DOM with the API
			const name = data.name;
			const { description: weather_descriptions, main: weather_condition, icon } = data.weather[0];
			const { temp: temperature } = data.main;


			locationSection.style.display = "flex";
			temperatureSection.style.display = "flex";
			initializeLocation.style.display = "none";
			titleApp.style.height = "16vh";

			locationTimezone.textContent = name;
			temperatureDegree.textContent = Math.round(temperature);
			temperatureDescription.textContent = weather_descriptions;
			//hoursLocation.textContent = localtime.match(/\d{2}:\d{2}/g);
			setWeatherStyle(temperature, weather_condition, icon);

			//Set temperature to Fahrenheit
			temperatureSection.addEventListener("click", () => {
				if ( temperatureSpan.textContent === "°C") {
					temperatureSpan.textContent = "°F";
					temperatureDegree.textContent = Math.round(Number(temperature) * 1.8 + 32);
				} else {
					temperatureSpan.textContent = "°C";
					temperatureDegree.textContent = Math.round(Number(temperature));
				}
			})
			
		
			}

		})
	}


	const showError = (error) => {
		switch (error.code) {
			case error.PERMISSION_DENIED:
			alert("User denied the request for Geolocation");
			break;

			case error.POSITION_UNAVAILABLE:
			alert("Location information is unavailable");
			break;

			case error.TIMEOUT:
			alert("The request to get user location timed out");
			break;

			case error.UNKNOWN_ERROR:
			alert("An unknown error ocurred");
			break;
		}
	}

	const setWeatherStyle = (temperature, weather_condition, icon) => {
		const skycons = new Skycons({color: 'white'});
		skycons.play();
		let regex = 'd$';
		let verifyState = new RegExp(regex, 'g');
		let day;

		if (verifyState.test(icon) === true) {
			day = true;
		} else {
			day = false;
		}

		// The day states
		if (day === true && weather_condition === "Clear") {
			skycons.add("icon1", Skycons.CLEAR_DAY);
			body.style.background = `linear-gradient(#C02425, #F0CB35)`;

			if(temperature < 23) {
				body.style.background = `linear-gradient(#283048, #859398)`;
			}

		} else if (day === true && weather_condition === "Clouds") {
			skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
			body.style.background = `linear-gradient(#1488CC, #2B32B2)`;
		// The night states
		} else if (day === false && weather_condition === "Clear") {
			skycons.add("icon1", Skycons.CLEAR_NIGHT);
			body.style.background = `linear-gradient(#000428, #004e92)`;
		} else if (day === false && weather_condition === "Clouds") {
			skycons.add("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
			body.style.background = `linear-gradient(#232526, #414345)`
		} //rain state
		 else if (weather_condition === "Rain") {
			skycons.add("icon1", Skycons.RAIN);  
			body.style.background = `linear-gradient(#525252, #3d72b4)`;
		}

	}

//callbacks
button.addEventListener("click", getLocation);
icon.addEventListener("click", () => {
	let query = input.value;
	const api2 = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=70718392a5498c312a96c3f6aa984203&units=metric`;
	//const api = `http://api.weatherstack.com/current?access_key=79385e97b07a4948a7df68e196a6f759&query=${query}`;
		fetchWeatherAPI(api2);
})

input.addEventListener("keyup", (event) => {
		if(event.keyCode === 13) {
			let query = input.value;
			const api2 = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=70718392a5498c312a96c3f6aa984203&units=metric`;
			//const api = `http://api.weatherstack.com/current?access_key=79385e97b07a4948a7df68e196a6f759&query=${query}`;
			fetchWeatherAPI(api2);
		}
	})


})
		.then(data => {
	
			if (data.success === false) {
				input.style.border = "2px solid rgba(255,40,0, 0.75)";

			} else {
			//Set the DOM with the API
			const name = data.name;
			const { description: weather_descriptions, main: weather_condition, icon } = data.weather[0];
			const { temp: temperature } = data.main;


			locationSection.style.display = "flex";
			temperatureSection.style.display = "flex";
			initializeLocation.style.display = "none";
			titleApp.style.height = "16vh";

			locationTimezone.textContent = name;
			temperatureDegree.textContent = Math.round(temperature);
			temperatureDescription.textContent = weather_descriptions;
			//hoursLocation.textContent = localtime.match(/\d{2}:\d{2}/g);
			setWeatherStyle(temperature, weather_condition, icon);

			//Set temperature to Fahrenheit
			temperatureSection.addEventListener("click", () => {
				if ( temperatureSpan.textContent === "°C") {
					temperatureSpan.textContent = "°F";
					temperatureDegree.textContent = Math.round(Number(temperature) * 1.8 + 32);
				} else {
					temperatureSpan.textContent = "°C";
					temperatureDegree.textContent = Math.round(Number(temperature));
				}
			})
			
		
			}

		})
	}


	const showError = (error) => {
		switch (error.code) {
			case error.PERMISSION_DENIED:
			alert("User denied the request for Geolocation");
			break;

			case error.POSITION_UNAVAILABLE:
			alert("Location information is unavailable");
			break;

			case error.TIMEOUT:
			alert("The request to get user location timed out");
			break;

			case error.UNKNOWN_ERROR:
			alert("An unknown error ocurred");
			break;
		}
	}

	const setWeatherStyle = (temperature, weather_condition, icon) => {
		const skycons = new Skycons({color: 'white'});
		skycons.play();
		let regex = 'd$';
		let verifyState = new RegExp(regex, 'g');
		let day;

		if (verifyState.test(icon) === true) {
			day = true;
		} else {
			day = false;
		}

		// The day states
		if (day === true && weather_condition === "Clear") {
			skycons.add("icon1", Skycons.CLEAR_DAY);
			body.style.background = `linear-gradient(#C02425, #F0CB35)`;

			if(temperature < 23) {
				body.style.background = `linear-gradient(#283048, #859398)`;
			}

		} else if (day === true && weather_condition === "Clouds") {
			skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
			body.style.background = `linear-gradient(#1488CC, #2B32B2)`;
		// The night states
		} else if (day === false && weather_condition === "Clear") {
			skycons.add("icon1", Skycons.CLEAR_NIGHT);
			body.style.background = `linear-gradient(#000428, #004e92)`;
		} else if (day === false && weather_condition === "Clouds") {
			skycons.add("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
			body.style.background = `linear-gradient(#232526, #414345)`
		} //rain state
		 else if (weather_condition === "Rain") {
			skycons.add("icon1", Skycons.RAIN);  
			body.style.background = `linear-gradient(#525252, #3d72b4)`;
		}

	}

//callbacks
button.addEventListener("click", getLocation);
icon.addEventListener("click", () => {
	let query = input.value;
	const api2 = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=70718392a5498c312a96c3f6aa984203&units=metric`;
	//const api = `http://api.weatherstack.com/current?access_key=79385e97b07a4948a7df68e196a6f759&query=${query}`;
		fetchWeatherAPI(api2);
})

input.addEventListener("keyup", (event) => {
		if(event.keyCode === 13) {
			let query = input.value;
			const api2 = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=70718392a5498c312a96c3f6aa984203&units=metric`;
			//const api = `http://api.weatherstack.com/current?access_key=79385e97b07a4948a7df68e196a6f759&query=${query}`;
			fetchWeatherAPI(api2);
		}
	})


})
