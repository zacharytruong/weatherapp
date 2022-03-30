const weatherData = (function () {
  class Weather {
    constructor(name, description, temp, humidity, tempMin, tempMax) {
      this.name = name;
      this.description = description;
      this.temp = temp;
      this.humidity = humidity;
      this.tempMin = tempMin;
      this.tempMax = tempMax;
    }

    updateName(name) {
      this.name = name;
      return this.name;
    }

    updateDescription(description) {
      this.description = description;
      return this.description;
    }

    updateTemp(temp) {
      this.temp = temp;
      return this.temp;
    }

    updateHumidity(humidity) {
      this.humidity = humidity;
      return this.humidity;
    }

    updateTempMin(tempMin) {
      this.tempMin = tempMin;
      return this.tempMin;
    }

    updateTempMax(tempMax) {
      this.tempMax = tempMax;
      return tempMax;
    }

    updateWeatherInfo(name, description, temp, humidity, tempMin, tempMax) {
      this.updateName(name);
      this.updateDescription(description);
      this.updateTemp(temp);
      this.updateHumidity(humidity);
      this.updateTempMin(tempMin);
      this.updateTempMax(tempMax);
    }
  }
  const currentWeather = new Weather();

  const getCurrentWeather = async function (url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  return {
    currentWeather,
    getCurrentWeather
  };
})();

export default weatherData;
