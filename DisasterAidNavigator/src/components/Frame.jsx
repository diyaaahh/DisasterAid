import "../App.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import call from "../assets/call.png";
import hospital from "../assets/hospital.png";
import prone from "../assets/prone.png";

function Frame() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const openPopup = () => setIsPopupVisible(true);
  const closePopup = () => setIsPopupVisible(false);

  function checkCall() {
    if (!navigator.userAgent.match(/Mobi/)) {
      openPopup();
    }
  }

  return (
    <>
      <div className="alert-background">
        <div className="alert-icon" style={{ top: "10%", left: "20%" }}>
          !
        </div>
        <div className="alert-icon" style={{ top: "40%", left: "10%" }}>
          !
        </div>
        <div className="alert-icon" style={{ top: "30%", left: "20%" }}>
          !
        </div>
        <div className="alert-icon" style={{ top: "90%", left: "20%" }}>
          !
        </div>
        <div className="alert-icon" style={{ top: "50%", left: "70%" }}>
          !
        </div>
        <div className="alert-icon" style={{ top: "80%", left: "40%" }}>
          !
        </div>
        <div className="alert-icon" style={{ top: "50%", left: "70%" }}>
          !
        </div>
        <div className="alert-icon" style={{ top: "40%", left: "60%" }}>
          !
        </div>
        <div className="alert-icon" style={{ top: "20%", left: "70%" }}>
          !
        </div>
        <div className="alert-icon" style={{ top: "60%", left: "40%" }}>
          !
        </div>
      </div>

      <h2 className="frame-title">Stay Prepared. Stay Safe. Act Fast.</h2>

      <div className="frame-container ">
        <div className="info-box">
          <div className="medical-attention">
            <img src={hospital} alt="Map" className="map-image" />
            <div className="medical-text">Find Nearby Hospitals</div>
            <div className="button">
              <Link to={"/hospital"}> Locate Hospitals</Link>
            </div>
          </div>
        </div>
        <div className="info-box">
          <div className="medical-attention">
            <img src={prone} alt="Map" className="map-image" />
            <div className="medical-text">View Risk-Prone Areas</div>
            <div className="button">
              <Link to={"/disaster"}> View Map</Link>
            </div>
          </div>
        </div>
        <div className="info-box">
          <div className="medical-attention">
            <img src={call} alt="Map" className="map-image" />
            <div className="medical-text">Call Nearby Rescuer</div>
            <div className=" button">
              <a href="tel:+977 9842136211" onClick={checkCall}>
                Call Rescuer
              </a>
              {/* </button> */}
            </div>
          </div>
        </div>

        {/* Popup component */}
        {isPopupVisible && (
          <div className="popup-overlay">
            <div className="popup">
              <div className="close-btn" onClick={closePopup}>
                &times;
              </div>
              <h1>Sorry, can not call from the web</h1>
              <p>Please use the mobile app to make a call to the rescuer.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Frame;
