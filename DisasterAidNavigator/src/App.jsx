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

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<HomePage />} />
    //     <Route path="/chatbot" element={<ChatInterface />} />
    //   </Routes>
    // </Router>
    <>
      {" "}
      <Home />
      <Frame />
    </>
  );
}

export default App;
