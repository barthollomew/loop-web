import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './CarouselSection.css';

const CarouselSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: true
  };

  const movies = [
    {img: 'shrek2.jpg', time: '1:30 PM', location: 'Sunshine'},
    {img: 'shrek3.jpg', time: '2:30 PM', location: 'Docklands'},
    {img: 'shrek4.jpg', time: '3:30 PM', location: 'Richmond'},
    {img: 'shrekek.jpg', time: '4:30 PM', location: 'Collingwood'},
  ];

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Featured Movies</h2>
      <Slider {...settings}>
        {movies.map((movie, index) => (
          <div className="movie-card" key={index}>
            <img src={process.env.PUBLIC_URL + '/images/' + movie.img} alt={`Shrek ${index + 1}`} className="movie-image"/>
            <p className="movie-details mt-2">{movie.time}, {movie.location}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselSection;
