import SimpleSliders from "./SimpleSlider";
// Forecast component displays weather forecast information
const Forecast = ({ weatherData, temp }: any) => {
  // get current date and days of the week
  const date = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <>
      <div className="container position-relative z-3">
        {/* tabs for switching between hourly and daily forecasts */}
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
              tabIndex={0}
            >
              Hours
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile-tab-pane"
              type="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected="false"
              tabIndex={0}
            >
              Daily
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
            tabIndex={0}
          >
            {/* render the SimpleSliders component for hourly forecast */}
            <SimpleSliders weatherData={weatherData} temp={temp} />{" "}
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabIndex={0}
          >
            <div className="row">
              {/* render daily forecast cards */}
              {/* each card represents a day */}
              {/* information for each day includes highest and lowest temperature, weather condition, chance or raining, wind speed and humidity. */}

              <div className="col-md-4">
                <div className="inner text-center py-3 text-white">
                  <div className="t1-head text-center rounded-top-2">Today</div>
                  <div className="t1-body py-3">
                    <img
                      src={
                        weatherData?.forecast?.forecastday[0].day.condition.icon
                      }
                      alt=""
                    />
                    <h3 className="m-0">
                      {!temp
                        ? weatherData?.forecast?.forecastday[0].day.maxtemp_c
                        : weatherData?.forecast?.forecastday[0].day.maxtemp_f}
                      &deg;
                    </h3>
                    <small className="text-light">
                      {" "}
                      {!temp
                        ? weatherData?.forecast?.forecastday[0].day.mintemp_c
                        : weatherData?.forecast?.forecastday[0].day.mintemp_f}
                      &deg;
                    </small>
                    <br />
                    <span className="pt-3 d-block fw-semibold">
                      {weatherData?.forecast?.forecastday[0].day.condition.text}
                    </span>
                  </div>
                  <div className="t1-foot rounded-bottom-2 d-flex justify-content-between align-items-center">
                    <span>
                      <i className="fa-solid fa-umbrella"></i>{" "}
                      {
                        weatherData?.forecast?.forecastday[0].day
                          .daily_chance_of_rain
                      }
                      %
                    </span>
                    <span>
                      <i className="fa-solid fa-wind"></i>{" "}
                      {weatherData?.forecast?.forecastday[0].day.maxwind_kph}{" "}
                      km/h
                    </span>
                    <span>
                      <i className="fa-solid fa-droplet"></i>{" "}
                      {weatherData?.forecast?.forecastday[0].day.avghumidity}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="inner text-center py-3 text-white">
                  <div className="t1-head text-center rounded-top-2">
                    {daysOfWeek[date.getDay() + 1] !== undefined
                      ? daysOfWeek[date.getDay() + 1]
                      : daysOfWeek[0]}
                  </div>
                  <div className="t1-body py-3">
                    <img
                      src={
                        weatherData?.forecast?.forecastday[1].day.condition.icon
                      }
                      alt=""
                    />
                    <h3 className="m-0">
                      {!temp
                        ? weatherData?.forecast?.forecastday[1].day.maxtemp_c
                        : weatherData?.forecast?.forecastday[1].day.maxtemp_f}
                      &deg;
                    </h3>
                    <small className="text-light">
                      {" "}
                      {!temp
                        ? weatherData?.forecast?.forecastday[1].day.mintemp_c
                        : weatherData?.forecast?.forecastday[1].day.mintemp_f}
                      &deg;
                    </small>
                    <br />
                    <span className="pt-3 d-block fw-semibold">
                      {weatherData?.forecast?.forecastday[1].day.condition.text}
                    </span>
                  </div>
                  <div className="t1-foot rounded-bottom-2 d-flex justify-content-between align-items-center">
                    <span>
                      <i className="fa-solid fa-umbrella"></i>{" "}
                      {
                        weatherData?.forecast?.forecastday[1].day
                          .daily_chance_of_rain
                      }
                      %
                    </span>
                    <span>
                      <i className="fa-solid fa-wind"></i>{" "}
                      {weatherData?.forecast?.forecastday[1].day.maxwind_kph}{" "}
                      km/h
                    </span>
                    <span>
                      <i className="fa-solid fa-droplet"></i>{" "}
                      {weatherData?.forecast?.forecastday[1].day.avghumidity}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="inner text-center py-3 text-white">
                  <div className="t1-head text-center rounded-top-2">
                    {" "}
                    {daysOfWeek[date.getDay() + 2] !== undefined
                      ? daysOfWeek[date.getDay() + 2]
                      : daysOfWeek[0]}
                  </div>
                  <div className="t1-body py-3">
                    <img
                      src={
                        weatherData?.forecast?.forecastday[2].day.condition.icon
                      }
                      alt=""
                    />
                    <h3 className="m-0">
                      {!temp
                        ? weatherData?.forecast?.forecastday[2].day.maxtemp_c
                        : weatherData?.forecast?.forecastday[2].day.maxtemp_f}
                      &deg;
                    </h3>
                    <small className="text-light">
                      {" "}
                      {!temp
                        ? weatherData?.forecast?.forecastday[2].day.mintemp_c
                        : weatherData?.forecast?.forecastday[2].day.mintemp_f}
                      &deg;
                    </small>
                    <br />
                    <span className="pt-3 d-block fw-semibold">
                      {weatherData?.forecast?.forecastday[2].day.condition.text}
                    </span>
                  </div>
                  <div className="t1-foot rounded-bottom-2 d-flex justify-content-between align-items-center">
                    <span>
                      <i className="fa-solid fa-umbrella"></i>{" "}
                      {
                        weatherData?.forecast?.forecastday[2].day
                          .daily_chance_of_rain
                      }
                      %
                    </span>
                    <span>
                      <i className="fa-solid fa-wind"></i>{" "}
                      {weatherData?.forecast?.forecastday[2].day.maxwind_kph}{" "}
                      km/h
                    </span>
                    <span>
                      <i className="fa-solid fa-droplet"></i>{" "}
                      {weatherData?.forecast?.forecastday[2].day.avghumidity}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forecast;
