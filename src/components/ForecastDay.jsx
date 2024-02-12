import { useState } from "react";


export default function(props) {
    return (
        <div className="forecast_day">
            <h5 className="day">{props.day}</h5>
            <img className='icon' src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/6231688b36311be3ed337868e322258c1cb5f2f3/SVG/1st%20Set%20-%20Color/${props.src}.svg`} alt="Icon Weather" />
            <h5 className="temps">{props.min}°C/{props.max}°C</h5>
          </div>
    )
}