import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatInterface from './components/Chat';

import HomePage from "./components/HomePage"

function App() {
  return(
  <Router>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/chatbot' element={<ChatInterface/>}/>
    </Routes>
  </Router>
  )
}

export default App
