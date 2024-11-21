import "../App.css";
import logo from "../assets/logo2.png";

function Home() {
  return (
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
      <div className="button1">Do you need help ?</div>
    </div>
  );
}

export default Home;
