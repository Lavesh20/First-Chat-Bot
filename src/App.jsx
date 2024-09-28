
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import ChatBot from "./components/ChatBot";
import HomePage from "./components/HomePage";

function App() {
    return(
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatBot />} /> 
          </Routes>
        </Router>
      </div>
    )

}
export default App;
