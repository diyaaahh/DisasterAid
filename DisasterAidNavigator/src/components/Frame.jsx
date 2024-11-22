import "../App.css";
import map from "../assets/map.png";
import { Link } from "react-router-dom"

function Frame() {
  return (
    <div className="frame-container " >
      <div className="info-box">
        <div className="medical-attention">
          <img src={map} alt="Map" className="map-image" />
          <div className="medical-text">Medical Attention</div>
          <div className="button" >
          <Link  to={"/hospital"} >Click Here</Link>
          </div>
        </div>
      </div>
      <div className="info-box">
        <div className="medical-attention">
          <img src={map} alt="Map" className="map-image" />
          <div className="medical-text">Medical Attention</div>
          <div className="button" >
          <Link  to={"/disaster"} >Click Here</Link>
          </div>
        </div>
      </div>
      <div className="info-box">
        <div className="medical-attention">
          <img src={map} alt="Map" className="map-image" />
          <div className="medical-text">Medical Attention</div>
          <div className="button" >
          <Link  to={"/hospitals"} >Click Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Frame;
