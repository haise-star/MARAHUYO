// src/App.jsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import AuthModal from "./components/AuthModal";
import OTPModal from "./components/OTPModal"; // ✅ import OTP modal
import { useState, useEffect } from "react";

function App() {
  const [authType, setAuthType] = useState(null);
  const [showOtp, setShowOtp] = useState(false); // ✅ OTP state

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToHome = () => {
      const el = document.getElementById("home");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.requestAnimationFrame(() => {
      scrollToHome();
      setTimeout(scrollToHome, 60);
    });

    window.addEventListener("load", scrollToHome);

    return () => {
      window.removeEventListener("load", scrollToHome);
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

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

      {/* ✅ Auth Modal */}
      {authType && (
        <AuthModal
          type={authType}
          onClose={() => setAuthType(null)}
          onRegisterSuccess={() => {
            setAuthType(null);
            setShowOtp(true); // ✅ Open OTP after register
          }}
        />
      )}

      {/* ✅ OTP Modal */}
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

export default App;
