import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import SharedLayout from "./components/SharedLayout.jsx";
import Login from "./pages/Login.jsx";
import VoiceRecording from "./pages/VoiceRecording.jsx"; // Import VoiceRecording

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <SharedLayout>
              <Index />
            </SharedLayout>
          } 
        />
        <Route 
          path="/voice-recording" 
          element={
            <SharedLayout>
              <VoiceRecording />
            </SharedLayout>
          } 
        /> {/* Add new route */}
      </Routes>
    </Router>
  );
}
export default App;