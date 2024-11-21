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
import DisasterHeatmap from "./pages/DisasterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/h" element={<HomePage/>} />
        <Route path="/chatbot" element={<ChatInterface />} />
        <Route path="/hospital" element={<HospitalPage/>}/>
        <Route path="/disaster" element={<DisasterHeatmap/>}/>
      </Routes>
    </Router>
   
  );
}

export default App;
