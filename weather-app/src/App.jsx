import {useEffect, useRef, useState} from 'react'
import Screen from './Screen'
import './App.css'
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";

function App() {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  useEffect(() => {
    setKey('AIzaSyDsxOBBw-Wo7LvERBajeIxYGAO_0VGBIgY'/*import.meta.env.VITE_APP_GOOGLE_MAPS_KEY*/); 
  }, []);

  const enterSearch = (e) => {
    if(e.key === 'Enter')
    {
      search(inputRef.current.value);
    }
  }

  const search = async(input) => {
    if(input === "")
    {
      setWeatherData(false);
      return;
    }
    
    input = input.split(', ');
    let apiLocationInput = input[0];
    for(let i = 1; i < input.length; i++)
    {
      apiLocationInput += "," + input[i];
    }
    try {
      inputRef.current.value = "";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${apiLocationInput}&appid=${import.meta.env.VITE_APP_ID}&units=imperial`;
      const response = await fetch(url);
      const data = await response.json();
      let tempCityName = "";
      let tempStateName = "";
      let tempCountryName = "";

      //get city from latitude longitude
      await fromLatLng(data.coord.lat, data.coord.lon)
      .then( ({results}) => {
        const { city, state, country } = results[0].address_components.reduce(
          (acc, component) => {
            if (component.types.includes("locality"))
              acc.city = component.long_name;
            else if (component.types.includes("administrative_area_level_1"))
              acc.state = component.long_name;
            else if (component.types.includes("country"))
              acc.country = component.long_name;
            return acc;
          },
          {}
        );
        tempCityName = city;
        tempStateName = state;
        tempCountryName = country;
      })
      .catch(console.error);
        /*const cityComponent = addressComponents.find(
          (component) => component.types.includes("locality")
        );
        if (cityComponent) {
          tempCityName = cityComponent.long_name;
          console.log(tempCityName);
        }
      })
      .catch((error) => console.error(error));*/
      if(!tempCityName || tempCityName === "")
      {
        tempCityName = input[0].substring(0,1).toUpperCase() + input[0].substring(1,-1).toLowerCase();
      }
      console.log(data);
      setWeatherData({
        temperature: data.main.temp,
        cityName: tempCityName,
        stateName: tempStateName,
        countryName: tempCountryName,
        weather: data.weather,
      })
      
    } catch(error) {
      console.log(error);
      setWeatherData(false);
    }
    
  } 

  useEffect(()=>{
    search("");
  },[]);
  return (
    <>
    <img src="../public/Wearther.png" alt="Wearther logo" className="mx-auto"/>
      <div className="flex space-x-4 w-3/4 mx-auto ">
        <div className="flex rounded-3xl border-black border-2 overflow-hidden w-full">
          <input ref={inputRef} type="text" name="search" onKeyDown={enterSearch} placeholder="Type in a city name or city name, state code, country code" className="w-full rounded-md rounded-r-none p-2"/>
          <button onClick={() => search(inputRef.current.value)} className="bg-indigo-600 text-white px-6 text-lg font-semibold py-4 rounded-r-md">Go</button>
        </div>
      </div>
    { weatherData &&
    <Screen weatherData={weatherData}/> }
    </>
  )
}

export default App
