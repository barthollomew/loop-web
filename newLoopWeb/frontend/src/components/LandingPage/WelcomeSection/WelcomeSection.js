import React from 'react';
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './WelcomeSection.css';

const WelcomeSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const movies = [

    {
      title: "Interstellar",
      description: "A journey through space and time."
    },
    
    {
      title: "Shrek 1",
      description: "The tale of an unlikely hero."
    },
    {
      title: "Shrek 2",
      description: "The adventure continues."
    },
    {
      title: "Shrek 3",
      description: "Another chapter in the saga."
    },
    {
      title: "Shrek 4",
      description: "The final chapter."
    },
  ];

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {movies.map((movie, index) => (
          <div key={index} className="relative h-full">
            <img src={`/images/${movie.title.toLowerCase().replace(" ", "")}.jpg`} alt={`${movie.title} Background`} className="carousel-image"/>
            <div className="carousel-content">
              <h1 className="movie-title">{movie.title}</h1>
              <p className="text-white">{movie.description}</p>
              <Link to="/Movies">
                <button className="book-now-button">View Movies</button>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#000" }}
      onClick={onClick}
    />
  );
}

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#000" }}
      onClick={onClick}
    />
  );
}

export default WelcomeSection;
