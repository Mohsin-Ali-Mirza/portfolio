import React, {useState, useContext} from "react";
import {Fade} from "react-reveal";
import emoji from "react-easy-emoji";
import "./Greeting.scss";
// import landingPerson from "../../assets/lottie/landingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";

import {illustration, greeting} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
// import ToggleSwitch from "./ToggleSwitch";

export default function Greeting() {
  const {isDark } = useContext(StyleContext);
  const styleContext = useContext(StyleContext);
  const [isChecked, setChecked] = useState(isDark);

  if (!greeting.displayGreeting) {
    return null;
  }

  const handleClickMe = () => {
    styleContext.changeTheme(); 
    setChecked(!isChecked);
    window.location.reload(); //Reload on changing theme
  };

  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <h1
                className={isDark ? "dark-mode greeting-text" : "greeting-text"}
              >
                {" "}
                {greeting.title}{" "}
                <span className="wave-emoji">{emoji("👋")}</span>
              </h1>
              <p
                className={
                  isDark
                    ? "dark-mode greeting-text-p"
                    : "greeting-text-p subTitle"
                }
              >
                {isDark ? greeting.subTitle_dark_1 : greeting.subTitle_light_1}
                {isDark ? <u><strong>{greeting.highlight_dark}</strong></u> : <u><strong>{greeting.highlight_light}</strong></u>}
                {isDark ? greeting.subTitle_dark_2 : greeting.subTitle_light_2}
              </p>
              <SocialMedia />
              <div className="button-greeting-div">
              <Button text={isDark ? "Switch To Ai 🤖" : "Switch To Game Dev 🎮"}  onClick={handleClickMe}/>
                {greeting.resumeLink && (
                  <Button
                    text="See my resume"
                    newTab={true}
                    href={greeting.resumeLink}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="greeting-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={isDark ? illustration.isGameDeveloper : illustration.isMachineLearning} />
            ) : (
              <img
                alt="man sitting on table"
                src={require("../../assets/images/manOnTable.svg")}
              ></img>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
