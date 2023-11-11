import React, {useState, useContext} from "react";
import emoji from "react-easy-emoji";
import StyleContext from "../../contexts/StyleContext";
import "./ToggleSwitch.scss";

const ToggleSwitch = () => {
  const {isDark} = useContext(StyleContext);
  const [isChecked, setChecked] = useState(isDark);
  const styleContext = useContext(StyleContext);

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={isDark}
        onChange={() => {
          styleContext.changeTheme();
          setChecked(!isChecked);
          window.location.reload();  //Reloading on changing theme
        }}
      />
      <span className="slider round">
        <span className="emoji">{isDark ? emoji("🎮") : emoji("🤖")}</span>
      </span>
    </label>
  );
};
export default ToggleSwitch;
