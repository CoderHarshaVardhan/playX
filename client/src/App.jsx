import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import VerifyEmail from "./pages/verifyEmail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
