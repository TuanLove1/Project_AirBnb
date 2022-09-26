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
        return this.props.data?.map((city, index) => {
            return <div className={`${styleReset['width-item']} ${styleReset['SlickCarousel_width-item__pckuA']}`}>
                <div onClick={()=>{
                    this.props.handleOnChangeId(city);
                }} key={index} className='all__city w-full flex items-center  cursor-pointer rounded-md hover:scale-105 hover:bg-gray-100 m-2 transition-all ease-linear'>
                    <div className='mr-2 w-full img__city flex justify-center flex-col items-center'>
                        <img className='rounded w-full h-28' src={city.image} />
                        <h1 className="font-semibold mt-1">{city.province}</h1>
                    </div>
                    {/* <div className='text__city'>
                    <h4 className='font-bold'>{city.province}</h4>
                    <span className='text-gray-500'>{city.valueate} giờ lái xe</span>
                </div> */}
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
            slidesToShow: 8,
            speed: 500,
            rows: 1,
            slidesPerRow: 1,
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