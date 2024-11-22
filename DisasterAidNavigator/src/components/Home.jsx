import "../App.css";
import logo from "../assets/logo2.png";
import ChatInterface from "./Chat";
import Frame from "./Frame";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="website-name">
          <h1>The DisasterAid Navigator</h1>
        </div>
        <div className="slogan">
          <p>Your guide to disaster relief and recovery.</p>
        </div>

        <div className="button1">
          <Link to={"/frame"}> Do you need help</Link>
        </div>
      </div>
      <Frame />
      <ChatInterface />
    </>
  );
}

export default Home;
