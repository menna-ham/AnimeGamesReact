import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider(props) {
// console.log(props.imgs);
const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
  autoplaySpeed: 2000,
   
  };
  return (
    <>
    <div className="tag">
          <h3 className="text-center ">Screenshots of {props.title}</h3>
    </div>
      <div className="imgslider">
        <Slider {...settings} className=''>
            {
                props.imgs?props.imgs.map((item) => (

                    <div key={item.id} >
                      <img src={item.image}  alt='screenshot' className="img-fluid h-100" />
                    </div>

                  )) :' '
            }

        </Slider>
      </div>
          </>
  )

}
