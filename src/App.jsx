import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import PdfViewer from "./routes/PdfViewer";

function App() {
  return(
      <Router>
        <Routes>
          <Route path="/" element={<PdfViewer />} />
        </Routes>
      </Router>
  );
}

export default App;