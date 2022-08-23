import React, { Component } from "react";
import Slider from "react-slick";
import styleReset from "./SlickCarousel.module.css";
import ClipLoader from "react-spinners/ClipLoader";
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleReset['slick-prev']}`}
            style={{ ...style, display: "block", color: 'black' }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleReset['slick-prev']} `}
            style={{ ...style, display: "block", }}
            onClick={onClick}
        />
    );
}

export default class SlickCarousel extends Component {
  
renderHtmlCity = () => {
    return this.props.data?.splice(0,12).map((city, index) => {
        return <div className={`${styleReset['width-item']} ${styleReset['SlickCarousel_width-item__pckuA']}`}>
            <div key={index} className='all__city flex items-center  cursor-pointer rounded-md hover:scale-105 hover:bg-gray-100 m-2 transition-all ease-linear'>
                <div className='mr-2 img__city'>
                    <img className='rounded w-10 h-10' src={city.image} />
                </div>
                <div className='text__city'>
                    <h4 className='font-bold'>{city.province}</h4>
                    <span className='text-gray-500'>{city.valueate} giờ lái xe</span>
                </div>
            </div>
        </div>
    })
}
render() {

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "0",
        slidesToShow: 4,
        speed: 500,
        rows: 1,
        slidesPerRow: 2,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    return (
        <div className="col l-12 mf8-12 c-12">
            <Slider {...settings}>
                {this.renderHtmlCity()}
            </Slider>
        </div>
    );
}
}