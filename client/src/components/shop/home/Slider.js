import React, { Fragment, useEffect, useContext, useState } from "react";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { HomeContext } from "./";
import { sliderImages } from "../../admin/dashboardAdmin/Action";

const apiURL = process.env.REACT_APP_API_URL;
const SLIDE_INTERVAL = 5000; // Set the slide interval time in milliseconds

const Slider = (props) => {
  const { data, dispatch } = useContext(HomeContext);
  const [slide, setSlide] = useState(0);
  const [fade, setFade] = useState("fade-in");

  useEffect(() => {
    sliderImages(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (data.sliderImages.length > 0) {
      const interval = setInterval(() => {
        setFade("fade"); // Set initial fade-out class
        setTimeout(() => {
          setSlide((prevSlide) => (prevSlide + 1) % data.sliderImages.length);
          setFade("fade-in"); // Set fade-in class for the new slide
        }, 500); // Delay for the fade-out effect before changing the slide
      }, SLIDE_INTERVAL);

      return () => clearInterval(interval); // Clean up the interval on component unmount
    }
  }, [data.sliderImages.length]);

  return (
    <Fragment>
      <div className="relative mt-16 bg-gray-100 border-2">
        {data.sliderImages.length > 0 ? (
          <img
            className={`w-full ${fade}`} // Apply fade class here
            src={`${apiURL}/uploads/customize/${data.sliderImages[slide].slideImage}`}
            alt="sliderImage"
          />
        ) : null}

        <div className="absolute inset-0 flex items-center justify-center">
          <a
            href="#shop"
            style={{ background: "#303031" }}
            className="cursor-pointer box-border text-2xl text-white px-4 py-2 rounded"
          >
            Shop Now
          </a>
        </div>
      </div>
      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
