
export default function(props) {


    return (
        <div className="currency_weather">
          <img className='currency_icon' src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/6231688b36311be3ed337868e322258c1cb5f2f3/SVG/1st%20Set%20-%20Color/${props.src}.svg`} alt="Icon Weather" />
          <h1 className='currency_temp'>{props.temp}°C</h1>
          <div className="currency_weather_data">
            <p className="data">Wind: {props.wind} m/s</p>
            <p className="data">Precip: {props.precip} mm/hr</p>
            <p className="data">Pressure: {props.pressure} mb</p>
          </div>
        </div>
    )
}