window.addEventListener("load", () => {
	let lat;
	let long;
	let locationTimezone = document.getElementById("tmz");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let temperatureDescription = document.querySelector(".temperature-description");
	let weatherIcon = document.querySelector('.icon');
	let body = document.querySelector("body");

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		}	
		
	}

	const showPosition = (position) => {
		lat = position.coords.latitude;
		long = position.coords.longitude;
		
		const api = `http://api.weatherstack.com/current?access_key=79385e97b07a4948a7df68e196a6f759&query=${lat},${long}`;

		fetch(api)
		.then(res => res.json())
		.then(data => {
			//Set the DOM with API
			const { timezone_id } = data.location;
			const { temperature, weather_descriptions, weather_icons, precip, cloudcover } = data.current;

			locationTimezone.textContent = timezone_id;
			temperatureDegree.textContent = temperature;
			temperatureDescription.textContent = weather_descriptions;
			setWeatherStyle(cloudcover, precip);

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

	const setWeatherStyle = (cloudcover, precip) => {
		const skycons = new Skycons({color: 'white'});
		skycons.play();
		let hours = new Date();
		let day;
		hours = hours.getHours();

		

		if (hours >= 6 && hours < 19) {
			day = true;
		} else {
			day = false;
		}

		// The day states
		if (day === true && cloudcover <= 40 && precip < 1.5) {
			skycons.add("icon1", Skycons.CLEAR_DAY);
			body.style.background = `linear-gradient(#C02425, #F0CB35)`;
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
getLocation();
})