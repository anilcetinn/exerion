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
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-3xl tracking-tight mr-4">
          EXERION
        </span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {/* Home butonunu Link bileşeni ile sararak yönlendirme sağlıyoruz */}
          <Link to="/">
            <button className="button">Home</button>
          </Link>
        </div>
        <div>
          <button onClick={() => setIsLoginOpen(true)} className="button ">
            Login
          </button>
        </div>
        <div className="lg:items-center ml-2">
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
