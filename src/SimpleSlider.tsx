import React, { useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";
import Slider from "react-slick";
import { toast } from "react-toastify";

// SimpleSliders component displays hourly weather information in a slider that is rendered inside Forecast component
export default function SimpleSliders({ weatherData, temp }: any) {
  // state to save hours array when weatherData comes
  const [hours, setHours] = useState([]);

  // useEffect hook to fetch hourly weather data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedHours = await weatherData?.forecast?.forecastday[0].hour;
        if (fetchedHours) {
          setHours(fetchedHours);
        }
      } catch (err) {
        toast.info("Error Occured, Please Try Again");
      }
    };

    fetchData();
  }, [weatherData]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 9,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container py-4">
      <Slider {...settings}>
        {/* mapping on each hour to render it */}
        {hours.length > 0 ? (
          hours.map((hour: any, i: any) => (
            <div
              key={i}
              className="d-flex justify-content-center align-items-center flex-column text-white"
            >
              <h5>{hour?.time.split(" ")[1]}</h5>
              <img className="text-center" src={hour?.condition.icon} alt="" />
              <span>{temp ? hour?.temp_f : hour?.temp_c} &deg;</span>
            </div>
          ))
        ) : (
          <Blocks
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
          />
        )}
      </Slider>
    </div>
  );
}
