import "../App.css";
import map from "../assets/map.png";

function Frame() {
  return (
    <div className="frame-container " >
      <div className="info-box">
        <div className="medical-attention">
          <img src={map} alt="Map" className="map-image" />
          <div className="medical-text">Medical Attention</div>
          <div className="button" onClick={console.log("click")}>
            Click Here
          </div>
        </div>
      </div>
      <div className="info-box">
        <div className="medical-attention">
          <img src={map} alt="Map" className="map-image" />
          <div className="medical-text">Medical Attention</div>
          <div className="button" onClick={console.log("click")}>
            Click Here
          </div>
        </div>
      </div>
      <div className="info-box">
        <div className="medical-attention">
          <img src={map} alt="Map" className="map-image" />
          <div className="medical-text">Medical Attention</div>
          <div className="button" onClick={console.log("click")}>
            Click Here
          </div>
        </div>
      </div>
    </div>
  );
}

export default Frame;
