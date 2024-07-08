// Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom"; // React Router'dan Link bileşenini içe aktarıyoruz
import Login from "./Login"; // Login bileşenini içe aktarıyoruz
import SignUp from "./SignUp";

function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6"></div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm  lg:flex-grow">
          {/* Home butonunu Link bileşeni ile sararak yönlendirme sağlıyoruz */}
        </div>
        <div>
          <button onClick={() => setIsLoginOpen(true)} className="button mr-8 ">
            Login
          </button>
        </div>
        <div className="lg:items-center mr-8">
          <button onClick={() => setIsSignUpOpen(true)} className="button ">
            Sign Up
          </button>
        </div>
      </div>
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}{" "}
      {isSignUpOpen && <SignUp onClose={() => setIsSignUpOpen(false)} />}{" "}
      {/* SignUp bileşenini duruma bağlı olarak eğer açık ise görüntüler ve kapatma fonksiyonunu props olarak geçirir */}
      {/* Login bileşenini duruma bağlı olarak eğer açık ise görüntüler ve kapatma fonksiyonunu props olarak geçirir */}
    </nav>
  );
}

export default Navbar;
