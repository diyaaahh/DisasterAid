import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ChatInterface from "./components/Chat";
import Home from "./components/Home";
import Frame from "./components/Frame";
import HomePage from "./components/HomePage";
import HospitalPage from "./pages/NearbyHospitalPage";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/chatbot" element={<ChatInterface />} />
    //     <Route path="/hospital" element={<HospitalPage/>}/>
    //   </Routes>
    // </Router>
    <HospitalPage/>
    // <>
    //   {" "}
    //   <Home />
    //   <Frame />
    // </>
  );
}

export default App;
