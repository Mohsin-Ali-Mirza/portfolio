import React, {useContext} from "react";
import "./Achievement.scss";
// import AchievementCard from "../../components/achievementCard/AchievementCard";
import {achievementSection} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import { MDBLightbox } from 'mdb-react-ui-kit';
// import { MDBMultiCarousel, MDBMultiCarouselItem } from 'mdb-react-multi-carousel';


export default function Achievement() {
  const {isDark} = useContext(StyleContext);
  if (!achievementSection.display) {
    return null;
  }
  
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="achievements">
        <div className="achievement-main-div">
          <div className="achievement-header">
            <h1
              className={
                isDark
                  ? "dark-mode heading achievement-heading"
                  : "heading achievement-heading"
              }
            >
              {achievementSection.title}
            </h1>
            <p
              className={
                isDark
                  ? "dark-mode subTitle achievement-subtitle"
                  : "subTitle achievement-subtitle"
              }
            >
              {achievementSection.subtitle}
            </p>
          </div>
          {/* <div className="achievement-cards-div"> */}
          
          <Carousel className="centered-carousel" autoPlay="true" infiniteLoop="true">
          {achievementSection.achievementsCards.map((card, i) => (
            <div key={i} onClick={() => window.open("https://www.google.com", "_blank")}>
              <img src={card.image} 
                   alt={card.title}
                   />
             <p className="legend">{card.title}</p>
            </div>
          ))}
          </Carousel>
          {/* </div> */}
        </div>
      </div>
    </Fade>
  );
}
