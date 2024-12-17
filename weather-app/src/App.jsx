import {useEffect, useState} from 'react'
import './App.css'

function App() {
  const [cityName, setCityName] = useState("")
  const [searchText, setSearchText] = useState("")
  const [weatherdata, setWeatherData] = useState(false);

  const handleSearchChange = (e) => {
    setSearchText(e.target.search.value);
    console.log(serachText);
  }
  const handleSubmit = () => {
    setCityName(searchText);
  }

  const search = async(city) => {
    try {
      
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=imperial`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setWeatherData({
        temp: data.main.temp,
      })
      
    } catch(error) {
      console.log(error);
      setWeatherData(false);
    }
  } 

  useEffect(()=>{
    search(cityName);
  },[]);
  return (
    <>
    <img src="../public/Wearther.png" alt="Wearther logo" className="mx-auto"/>
    <div className="mx-auto w-fit h-fit mb-4">
      <form onSubmit={handleSubmit}>
      <div className="max-w-xl">
        <div className="flex space-x-4">
          <div className="flex rounded-md overflow-hidden w-full">
            <input type="text" name="search" className="w-96 rounded-md rounded-r-none p-2" onChange={handleSearchChange}/>
            <button type="submit" className="bg-indigo-600 text-white px-6 text-lg font-semibold py-4 rounded-r-md">Go</button>
          </div>
          <button className="bg-white px-6 text-lg font-semibold py-4 rounded-md">Clear</button>
        </div>
      </div>
    </form>
    </div>
    <div style={{width: "1280px", height: "720px"}} className="mx-auto my-2">
      <div style={{backgroundImage: "url(../public/Sunny.gif)"}}  className="flex flex-wrap bg-cover min-w-96 min-h-96 w-5/6 h-5/6 mx-auto rounded-xl border-2 border-black p-2">
        <div style={{backgroundColor: "rgba(100,100,100,.50)"}} className="rounded-3xl w-fit h-fit top-1/2 left-1/2 p-2">
          <p className="text-white text-9xl">{Math.round(weatherdata.temp)}°F</p>
        </div>
        <div style={{backgroundColor: "rgba(100,100,100,.50)"}} className="rounded-3xl w-fit h-fit top-1/2 left-1/2 p-2 mx-1">
          <p className="text-white text-3xl">Sunny</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
