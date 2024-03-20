import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";

// Current component displays the current weather information
function Current({ weatherData, temp, city }: any) {
  // state to store formatted date
  const [formattedDate, setFormattedDate] = useState("");

  // useEffect hook to format date when weatherData info is not null
  useEffect(() => {
    if (weatherData) {
      // extract date string from weather date
      const dateString = weatherData?.location?.localtime.split(" ")[0];
      // parse the date string into a Date object using parseISO from date-fns library
      const parsedDate = parseISO(dateString);
      // format the parsed date
      const formattedDateString = format(parsedDate, "EEEE d, yyyy");
      setFormattedDate(formattedDateString);
    }
  }, [weatherData]);

  return (
    <>
      <div className="current-layout container pb-5  position-relative z-2 text-white">
        {/* left section */}
        <div className="left ">
          <h2 className="fw-bold h1">
            {city
              ? city
              : `${weatherData?.location.name}, ${weatherData?.location.country}`}
          </h2>
          <span>{formattedDate}</span>
          <br />
          <div className="iat">
            <img src={weatherData?.current.condition.icon} alt="" />
            <br />
            <span className="fw-semibold">
              {weatherData?.current.condition.text}
            </span>
          </div>
        </div>
        {/* right section */}
        <div className="right text-center">
          <p className="first-right">
            {temp ? weatherData?.current?.temp_f : weatherData?.current?.temp_c}
            &deg;
          </p>
          <p className="second-right">
            {temp
              ? weatherData?.forecast.forecastday[0].day.maxtemp_f
              : weatherData?.forecast.forecastday[0].day.maxtemp_c}
            &deg; /{" "}
            <span>
              {temp
                ? weatherData?.forecast.forecastday[0].day.mintemp_f
                : weatherData?.forecast.forecastday[0].day.mintemp_c}
              &deg;
            </span>
          </p>
          <p className="third-right fw-semibold">
            {weatherData?.forecast.forecastday[0].day.condition.text}
          </p>
        </div>
      </div>
    </>
  );
}

export default Current;
