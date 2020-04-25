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
		
		const api = `http://api.weatherstack.com/current?access_key=79385e97b07a4948a7df68e196a6f759&query=${lat},${long}`;	
		fetchWeatherAPI(api);

	}

	const fetchWeatherAPI = (api) => {
		fetch(api)
		.then(res => res.json())
		.then(data => {
			if (data.success === false) {
				input.style.border = "2px solid rgba(255,40,0, 0.75)";

			} else {
			//Set the DOM with the API
			const { name, localtime } = data.location;
			const { temperature, weather_descriptions, weather_icons, precip, cloudcover } = data.current;

			locationSection.style.display = "flex";
			temperatureSection.style.display = "flex";
			initializeLocation.style.display = "none";
			titleApp.style.height = "16vh";

			locationTimezone.textContent = name;
			temperatureDegree.textContent = Number(temperature + 1);
			temperatureDescription.textContent = weather_descriptions;
			hoursLocation.textContent = localtime.match(/\d{2}:\d{2}/g);
			setWeatherStyle(cloudcover, precip, temperature, localtime);

			//Set temperature to Fahrenheit
			temperatureSection.addEventListener("click", () => {
				if ( temperatureSpan.textContent === "°C") {
					temperatureSpan.textContent = "°F";
					temperatureDegree.textContent = Math.round(Number(temperature + 1) * 1.8 + 32);
				} else {
					temperatureSpan.textContent = "°C";
					temperatureDegree.textContent = Math.round(Number(temperature + 1));
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

	const setWeatherStyle = (cloudcover, precip, temperature, localtime) => {
		const skycons = new Skycons({color: 'white'});
		skycons.play();
		let hours = localtime.match(/\d{2}:\d{2}/);
		hours[0] = hours[0].slice(0, 2);
		let day;
		

		if (Number(hours[0]) >= 6 && Number(hours[0]) < 19) {
			day = true;
		} else {
			day = false;
		}

		// The day states
		if (day === true && cloudcover <= 40 && precip < 1.5) {
			skycons.add("icon1", Skycons.CLEAR_DAY);
			body.style.background = `linear-gradient(#C02425, #F0CB35)`;

			if(temperature < 23) {
				body.style.background = `linear-gradient(#283048, #859398)`;
			}

		} else if (day === true && (cloudcover >= 40 && cloudcover < 78) && precip < 1.5) {
			skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
			body.style.background = `linear-gradient(#1488CC, #2B32B2)`;
		// The night states
		} else if (day === false && cloudcover <= 40 && precip < 1.5) {
			skycons.add("icon1", Skycons.CLEAR_NIGHT);
			body.style.background = `linear-gradient(#000428, #004e92)`;
		} else if (day === false && (cloudcover >= 40 && cloudcover < 76) && precip < 1.5) {
			skycons.add("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
			body.style.background = `linear-gradient(#232526, #414345)`
		} //cloudy and rain
		  else if (cloudcover >= 76) {
		  	skycons.add("icon1", Skycons.CLOUDY);
		  	body.style.background = `linear-gradient(#E6DADA, #274046)`;	
		} else if (precip >= 1.5) {
			skycons.add("icon1", Skycons.RAIN);  
			body.style.background = `linear-gradient(#525252, #3d72b4)`;
		}

	}

//callbacks
button.addEventListener("click", getLocation);
input.addEventListener("keyup", (event) => {
		if(event.keyCode === 13) {
			let query = input.value;
			const api = `http://api.weatherstack.com/current?access_key=79385e97b07a4948a7df68e196a6f759&query=${query}`;
			fetchWeatherAPI(api);
		}
	})

})
