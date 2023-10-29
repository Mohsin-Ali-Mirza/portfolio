import React, {useContext} from "react";
import ReactPlayer from 'react-player';
import "./PortfolioReel.scss";
import {reelLink} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
// import Build from "../../assets/lottie/build";
// import DisplayLottie from "../../components/displayLottie/DisplayLottie";

export default function PortfolioReel() {

  const {isDark} = useContext(StyleContext);

  const videoLink = isDark ? reelLink.darkVideoLink : reelLink.videoLink;

  if (reelLink.display) {
    return (
      <Fade bottom duration={1000} distance="20px">
        <div className="reel-container" id="portfolioReel">
          <div className="reel-bar">
            <h1 className="skills-heading">Portfolio Reel</h1>
          </div>

          <div className="reel-video-container">
            <ReactPlayer url={videoLink} controls />
          </div>
        </div>
      </Fade>
    );
  }
  return null;
}
