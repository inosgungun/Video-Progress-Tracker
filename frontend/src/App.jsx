import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LectureVideoPage from "./pages/LectureVideoPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LectureVideoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
