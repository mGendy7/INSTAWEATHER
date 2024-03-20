import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Current from "./Current";
import Forecast from "./Forecast";
import { Blocks } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // setting states that will need to be changed and shared
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [temp, setTemp] = useState(true);
  const [term, setTerm] = useState("");
  // toggleTemp is an arrow function that changes a state from true to false and vice versa, so we can control tempreture to see celsius or fahrenheit according to user's prefrence
  const toggleTemp = () => {
    setTemp((state) => !state);
  };

  // function that is used to search specific areas
  async function searchLocation() {
    try {
      setIsLoading(true);
      setCity("");
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=cca4405803f448dcab2151237231811&q=${term}&days=14`
      );
      // here if user searches for a wrong place we intrupt logic, so the app preform a certain logic and doesn't crash
      if (!response.ok) {
        setIsLoading(false);
        toast.info("Please Enter A Valid City Name");
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setWeatherData(data);
      setIsLoading(false);
    } catch (err) {
      toast.info("Error Occured, Please Try Again");
    }
  }
  // getting the user's geolocation in an async function inside useEffect to fire immediateley when app launches
  useEffect(() => {
    const fetchByLocation = async () => {
      try {
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(async (location) => {
          const { latitude, longitude } = location.coords;
          // here is an external api so we can get more details on location incluidng city name and setting it to city state so we can share it to Current component
          const cityCall = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=6a811b41cdbc4df3a26defc8d80fef10`
          );
          const cityData = await cityCall.json();
          setCity(
            `${cityData.results[0].components.city}, ${cityData.results[0].components.state}, ${cityData.results[0].components.country}`
          );
          // here is the api provided used with latitude and longitude
          const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=cca4405803f448dcab2151237231811&q=${latitude},${longitude}&days=14`
          );
          const data = await response.json();
          setWeatherData(data);
          setIsLoading(false);
        });
      } catch (err) {
        toast.info("Error Occured, Please Try Again");
      }
    };
    fetchByLocation();
  }, []);
  // while fetching a loading cube appear
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Blocks
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        />
      </div>
    );
  }
  return (
    <>
      {/* main page that is being rendered inside index.tsx */}
      <div className="main-page">
        {/* sharing in Navbar the temp state and function that changes it */}
        <Navbar temp={temp} toggleTemp={toggleTemp} />
        {/* here on typing term state changes so when the button clicken the term be searched for */}
        <div className="container">
          <div className="container in position-relative p-0 mb-5 mt-3">
            <input
              onChange={(e) => setTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  searchLocation();
                }
              }}
              type="text"
              placeholder="Enter A City Name"
              className="form-control"
            />
            <button onClick={searchLocation}>search</button>
          </div>
        </div>
        {/* here i share weather Data comn from provided API, temp state, and city provided from the external API */}
        <Current weatherData={weatherData} temp={temp} city={city} />
        {/* here i share weather Data comn from provided API and temp state */}
        <Forecast weatherData={weatherData} temp={temp} />
      </div>
    </>
  );
}

export default App;
