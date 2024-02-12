import { useState, useEffect } from 'react'
import ForecastDay from './components/ForecastDay';
import CurrencyWeather from './components/CurrencyWeather';

function App() {

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const [dayID, setDayID] = useState(new Date().getDay());

  const [inputValue, setInputValue] = useState('Bydgoszcz');

  const [country, setCountry] = useState('PL');
  const [city, setCity] = useState('Bydgoszcz');

  // CURRENCY WEATHER
  const [dataCurrencyWeather, setDataCurrencyWeather] = useState({});


  // FORECAST WEATHER
  const [dataForecastWeather, setDataForecastWeather] = useState();

  const fetchData = (city) => {
    setCity(inputValue);
    city.indexOf(' ') >= 0 ? city = city.replace(' ', '+') : city = city;

    getWeather(city);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDayID(new Date().getDay());
    }, 60000);


    fetchData(city);
  }, []);

  async function getWeather(city){
    const promise = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=AD6MLRA22L24H477VNGBSRTB9&contentType=json`);
    const response = await promise.json();

    // CURRENCY WEATHER
    const dataCurrencyDict = {
      temp: response.days[0].temp,
      wind: response.days[0].windspeed,
      precip: response.days[0].precip,
      pres: response.days[0].pressure,
      icon: response.days[0].icon
    };
    setDataCurrencyWeather(dataCurrencyDict);


    // FORECAST WEATHER
    const arrForecast = [];

    for(let i = 1; i < 7; i++){
      arrForecast.push([response.days[i].icon, response.days[i].tempmin, response.days[i].tempmax]);
    }

    setDataForecastWeather(
      arrForecast.map((el, index) => (
        <ForecastDay 
          src={el[0]} 
          day={days[(dayID + index) % 7]} 
          min={el[1]} 
          max={el[2]}
        />))
    );
  };

  return (
    <>
      <div className="card">
        <div className="city">
          <p>Enter your city: </p>
          <input className='input' type="text" placeholder='Search for city..'
            onChange={(event) => {
              event.target.value ? setInputValue(event.target.value) : setInputValue(city)
              }
            }
          />
          <button className='btn' type='submit' onClick={() => fetchData(inputValue)}>Search</button>
        </div>
        <h3 className='country_and_city'>{city}</h3>
        
        <CurrencyWeather 
          src={dataCurrencyWeather.icon} 
          temp={dataCurrencyWeather.temp} 
          wind={dataCurrencyWeather.wind} 
          precip={dataCurrencyWeather.precip} 
          pressure={dataCurrencyWeather.pres} 
        />
        
        <div className="forecast">
            {dataForecastWeather}
        </div>
      </div>
    </>
  )
}

export default App
