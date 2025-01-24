import {useState} from 'react'
import validator from 'validator'

function Screen(props) {

  const tryRequire = (path) => {
    try {
     return require(`${path}`);
    } catch (err) {
     return null;
    }
  };

  const getUrl = () => {
    let description = props.weatherData.weather[0].description.replaceAll(" ", "-");
    if (!(description === "broken-clouds" || description === "clear-sky" || description === "few-clouds" || description === "rain" || description === "scattered-clouds" || description === "shower-rain" || description === "rain" || description === "snow"  || description === "thunderstorm" ))
      description = "few-clouds"

    return "url(../public/" + description + ".gif)";
  } 

    const getAreaName = () => {
        let rtn = props.weatherData.cityName;
        if (props.weatherData.stateName && !(props.weatherData.stateName === ""))
            rtn += ", " + props.weatherData.stateName;
        if (props.weatherData.countryName && !(props.weatherData.countryName === ""))
            rtn += ", " + props.weatherData.countryName;
        return rtn;
    }
    const capitalize = (input) => {
        input = input.split(" ");
        let rtn = "";
        for(let i = 0; i < input.length; i++)
        {
            input[i] = input[i].substring(0,1).toUpperCase() + input[i].substring(1).toLowerCase();
            rtn += input[i] + " ";
        }
        return rtn.substring(0,rtn.length-1);

    }


  return (
    <>
    <div style={{width: "1280px", height: "720px"}} className="mx-auto my-2">
      <div style={{backgroundImage: getUrl()}}  className="relative bg-cover min-w-96 min-h-96 w-5/6 h-5/6 mx-auto rounded-xl border-2 border-black p-2">
        <span className="inline-block w-full">
            <div style={{backgroundColor: "rgba(100,100,100,.50)"}} className="rounded-3xl float-left w-fit h-fit p-2">
            <p className="text-white text-8xl">{Math.round(props.weatherData.temperature)}°F</p>
            </div>
            {props.weatherData.weather && <div style={{backgroundColor: "rgba(100,100,100,.50)", maxWidth:"25%"}} className="rounded-3xl float-left w-fit h-fit p-2 mx-1">
            <p className="text-white text-3xl">{capitalize(props.weatherData.weather[0].description)}</p>
            </div>}
            {!(props.weatherData.cityName === "") && <div style={{backgroundColor:"rgba(100,100,100,.50)", maxWidth:"50%",}} className="rounded-2xl float-right w-fit h-fit p-2 mx-1">
            <p className="text-white text-3xl">{getAreaName()}</p>
            </div>}
        </span>
        <div className="absolute left-0 bottom-0 h-fit w-full px-2">
          {/*
          <span className="inline-block w-full">
            <div style={{backgroundColor: "rgba(100,100,100,.50)"}} className="rounded-3xl float-left w-1/4 h-72 p-2">
              <p className="text-white text-8xl">{Math.round(props.weatherData.temperature)}°F</p>
            </div>
            <div style={{backgroundColor: "rgba(100,100,100,.50)"}} className="rounded-3xl float-right w-1/4 h-72 p-2">
              <p className="text-white text-8xl">{Math.round(props.weatherData.temperature)}°F</p>
            </div>
          </span>
*/}
        </div>
      </div>
    </div>
    </>
  )
}

export default Screen
