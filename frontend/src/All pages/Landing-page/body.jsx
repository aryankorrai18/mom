import React, { useState, useEffect } from 'react';
import './body.css';
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';
// import logo from '../../assets/logo.png';
import image from '../../assets/image.jpg';
import medicine from '../../assets/medicine.png';
import Contact from './contactus.jsx';
import welcome from '../../assets/Welcome.gif';
import LandingPageHeader from './header.jsx';

const LandingPageBody = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { id: 1, content: 'Slide 1: Welcome to Mom Pharmacy!' },
    { id: 2, content: 'Slide 2: Discover our health services.' },
    { id: 3, content: 'Slide 3: Care you can trust!' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
    <LandingPageHeader />
   <div className="header-content">
 <div className="body-container">
      {/* First Section: Two Columns */}
      <section className="two-column-section d-flex flex-row">
        <div className="column  ">
          <h1 className="column-h1  d-flex align-items-center "><img src={welcome} alt="welcome" className="welcome-gif"/> to Mom Pharmacy Employees  portal</h1>
          <p className="column-p  mt-4 d-flex flex-start justify-content-start ">
           Here you can manage your portal.
          </p>
          <h2 className="column-h2  mt-7 d-flex flex-start justify-content-start">Glad that you are our employee !</h2>
        </div>
        <div  className="d-flex flex-column justify-content-center">
          <img src={medicine} alt="medicine" class="image mt-11"/>
        </div>
      </section>

      


        {/* Second Section: Carousel  */}
<section id="carousel" className="carousel-section">
       
       <h1 className="  whatsnew">What's New?</h1>

<div id="carouselExampleCaptions" class="carousel slide ">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner mt-5">
    <div class="carousel-item active">
      <img src={image}  class="d-block w-50 mx-auto " alt="image"/>
       <div class="carousel-caption d-none d-md-block"></div>
       <p className="carousel-quote1 ">MOM PHARMACY CORE TEAM</p>
    
    </div>
    <div class="carousel-item">
      <img src={image} class="d-block w-50 mx-auto " alt="image"/>
      <div class="carousel-caption d-none d-md-block">
        </div>
        <p className="carousel-quote1">ISB MEETING TO visit innovateⁿ 4th Edition — April 25, 2025, Indian School of Business.</p>
      
    </div>
    <div class="carousel-item">
      <img src={image} class="d-block w-50 mx-auto" alt="image"/>
      <div class="carousel-caption d-none d-md-block">
        <p className="carousel-quote1"></p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  
</div>
<Contact />
</section>
    </div>
</div>
</>
  );
};

export default LandingPageBody;