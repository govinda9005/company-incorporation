import { Routes, Route } from "react-router-dom";
import Step1Company from "./components/Step1Company";
import Step2Shareholders from "./components/Step2Shareholders";
import Admin from "./components/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Step1Company />} />
      <Route path="/shareholders/:id" element={<Step2Shareholders />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
