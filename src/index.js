import 'core-js/stable';
import 'regenerator-runtime/runtime';
import weatherData from './weatherData';

(function weatherApp() {
  const _openWeatherAPI = 'fe8beae53a6b2c9092347c6e7697ea2f';
  const getURL = function setTheURL(location = 'Houston') {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${_openWeatherAPI}&units=imperial`;
  };
  const main = document.getElementById('main');
  main.className = 'appContainer glassEffect';

  const init = function initialLoad() {
    const addSearchForm = () => {
      const form = document.createElement('form');
      const input = document.createElement('input');
      const searchIcon = document.createElement('i');
      form.className = 'searchForm';
      input.id = 'searchField';
      input.type = 'text';
      input.autocomplete = 'off';
      searchIcon.className = 'fa-solid fa-magnifying-glass';
      form.appendChild(input);
      form.appendChild(searchIcon);
      return form;
    };

    const addMainData = () => {
      const mainDataContainer = document.createElement('div');
      const mainDataLeft = document.createElement('div');
      const mainDataRight = document.createElement('div');
      const location = document.createElement('h1');
      const temp = document.createElement('h2');
      const description = document.createElement('h2');
      mainDataContainer.className = 'mainDataContainer';
      mainDataLeft.className = 'col left';
      mainDataRight.className = 'col right';
      location.className = 'location';
      temp.className = 'temp';
      description.className = 'description';
      mainDataLeft.appendChild(location);
      mainDataLeft.appendChild(temp);
      mainDataRight.appendChild(description);
      mainDataContainer.appendChild(mainDataLeft);
      mainDataContainer.appendChild(mainDataRight);
      return mainDataContainer;
    };

    const addSubData = () => {
      const subDataContainer = document.createElement('div');
      const col1 = document.createElement('div');
      const value1 = document.createElement('h2');
      const title1 = document.createElement('h3');
      const col2 = document.createElement('div');
      const value2 = document.createElement('h2');
      const title2 = document.createElement('h3');
      const col3 = document.createElement('div');
      const value3 = document.createElement('h2');
      const title3 = document.createElement('h3');
      subDataContainer.className = 'subDataContainer';
      col1.className = 'col';
      col2.className = 'col';
      col3.className = 'col';
      value1.className = 'humidity';
      title1.className = 'title';
      title1.textContent = 'Humidy';
      value2.className = 'tempMin';
      title2.className = 'title';
      title2.textContent = 'Min. Temp';
      value3.className = 'tempMax';
      title3.className = 'title';
      title3.textContent = 'Max. Temp';
      col1.appendChild(value1);
      col1.appendChild(title1);
      col2.appendChild(value2);
      col2.appendChild(title2);
      col3.appendChild(value3);
      col3.appendChild(title3);
      subDataContainer.appendChild(col1);
      subDataContainer.appendChild(col2);
      subDataContainer.appendChild(col3);
      return subDataContainer;
    };

    main.appendChild(addSearchForm());
    main.appendChild(addMainData());
    main.appendChild(addSubData());
  };
  init();

  const searchForm = document.querySelector('.searchForm');
  const searchField = document.getElementById('searchField');
  const searchBtn = searchForm.querySelector('.fa-magnifying-glass');
  const mainDataContainer = document.querySelector('.mainDataContainer');
  const subDataContainer = document.querySelector('.subDataContainer');
  const location = mainDataContainer.querySelector('.location');
  const temp = mainDataContainer.querySelector('.temp');
  const description = mainDataContainer.querySelector('.description');
  const humidity = subDataContainer.querySelector('.humidity');
  const tempMin = subDataContainer.querySelector('.tempMin');
  const tempMax = subDataContainer.querySelector('.tempMax');

  const updateCurrentWeather = async function updateCurrentweatherObj(url) {
    const data = await weatherData.getCurrentWeather(url);
    weatherData.currentWeather.updateWeatherInfo(
      data.name,
      data.weather[0].description,
      data.main.temp,
      data.main.humidity,
      data.main.temp_min,
      data.main.temp_max
    );
  };

  const displayWeatherData = async function renderWeatherData(url) {
    await updateCurrentWeather(url).catch((err) => {
      console.error(err);
    });
    location.textContent = weatherData.currentWeather.name;
    temp.textContent = `${Math.round(weatherData.currentWeather.temp)} °F`;
    description.textContent = weatherData.currentWeather.description;
    humidity.textContent = weatherData.currentWeather.humidity;
    tempMin.textContent = `${Math.round(
      weatherData.currentWeather.tempMin
    )} °F`;
    tempMax.textContent = `${Math.round(
      weatherData.currentWeather.tempMax
    )} °F`;
  };

  const renderPage = function updatePageWithSearchKeyword(e) {
    e.preventDefault();
    displayWeatherData(getURL(searchField.value)).catch((err) => {
      console.error(err);
    });
    searchField.value = '';
  };

  displayWeatherData(getURL()).catch((err) => {
    console.error(err);
  });

  searchForm.addEventListener('submit', renderPage);
  searchBtn.addEventListener('click', renderPage);
})();
