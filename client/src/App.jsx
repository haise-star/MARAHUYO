// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Landing Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import AuthModal from "./components/AuthModal";
import OTPModal from "./components/OTPModal";

// Users & Admin Areas
import UsersApp from "./USERS/UsersApp";   
import AdminApp from "./ADMIN/AdminApp";   

function LandingPage() {
  const [authType, setAuthType] = useState(null);
  const [showOtp, setShowOtp] = useState(false);

  return (
    <div className="font-sans">
      <Navbar
        onNav={{
          Login: () => setAuthType("login"),
          "Sign-Up": () => setAuthType("register"),
        }}
        setAuthType={setAuthType}
      />
      <Hero setAuthType={setAuthType} />
      <About />
      <Services />
      <FAQ />
      <Contact />

      {authType && (
        <AuthModal
          type={authType}
          onClose={() => setAuthType(null)}
          onRegisterSuccess={() => {
            setAuthType(null);
            setShowOtp(true);
          }}
        />
      )}

      {showOtp && (
        <OTPModal
          onClose={() => setShowOtp(false)}
          onVerify={(otp) => {
            console.log("Verified OTP:", otp);
            setShowOtp(false);
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/users/*" element={<UsersApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </Router>
  );
}
