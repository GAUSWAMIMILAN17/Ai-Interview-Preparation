import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import Login from "../pages/Auth/Login.jsx";
import SignUp from "../pages/Auth/Signup.jsx";
import Modal from "../components/Modal.jsx"

import HERO_IMG from "../assets/hero-img.png";
import { APP_FEATURES } from "../utils/data.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard.jsx";

const LandingPage = () => {
  const navigate = useNavigate();
  const {user} = useSelector((store) => store.auth)

  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if(!user) {
      setOpenAuthModel(true)
    } else {
      navigate("dashboard")
    }
  };

  

  return (
    <>
      <div className="relative w-full min-h-screen bg-[#FFFCEF] overflow-hidden pb-24">
        {/* Background Blur */}
        <div className="absolute -top-20 -left-24 w-[550px] h-[550px] rounded-full bg-amber-200/30 blur-[120px]"></div>

        {/* Main Container */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <header className="flex items-center justify-between py-6">
            <h2 className="text-2xl font-bold text-black">Interview Prep AI</h2>

            {
              user ? (<ProfileInfoCard>Profile Card</ ProfileInfoCard>) : (
                <button
              onClick={() => setOpenAuthModel(true)}
              className="bg-linear-to-r from-[#FF9324] to-[#E99A4B] hover:from-black hover:to-black text-white text-sm font-semibold px-7 py-2.5 rounded-full transition-all duration-300"
            >
              Login / Sign Up
            </button>
              )
            }
          </header>

          {/* Hero */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center pt-12">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-600 text-sm font-semibold px-4 py-2 rounded-full mb-5">
                <LuSparkles />
                AI Powered
              </div>

              <h1 className="text-5xl md:text-6xl font-medium leading-tight text-black mb-6">
                Ace Interviews with
                <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            {/* Right */}
            <div>
              <p className="text-lg text-gray-700 leading-8 mb-8">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery — your ultimate interview toolkit is
                here.
              </p>

              <button
                onClick={handleCTA}
                className="bg-black hover:bg-yellow-100 hover:text-black border border-black hover:border-yellow-300 text-white text-sm font-semibold px-8 py-3 rounded-full transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </section>

          {/* Hero Image */}
          <section className="flex justify-center mt-10">
            <img
              src={HERO_IMG}
              alt="Hero"
              className="w-full max-w-6xl rounded-2xl border border-amber-300 shadow-2xl"
            />
          </section>

          {/*  Feature */}
          <section>
            {/* Features Section */}
            <div className="w-full min-h-full bg-[#FFFCEF] mt-10">
              <div className="container mx-auto px-4 pt-10 pb-20">
                <section className="mt-5">
                  <h2 className="text-2xl font-medium text-center mb-12">
                    Features That Make You Shine
                  </h2>

                  <div className="flex flex-col items-center gap-8">
                    {/* First 3 Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                      {APP_FEATURES.slice(0, 3).map((feature) => (
                        <div
                          key={feature.id}
                          className="bg-[#FFFFF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                        >
                          <h3 className="text-base font-semibold mb-3">
                            {feature.title}
                          </h3>

                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Remaining 2 Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {APP_FEATURES.slice(3).map((feature) => (
                        <div
                          key={feature.id}
                          className="bg-[#FFFFF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                        >
                          <h3 className="text-base font-semibold mb-3">
                            {feature.title}
                          </h3>

                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Footer */}
            <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
              Founder - Milan Gauswami
            </div>
          </section>
        </div>
      </div>

      <Modal
        isOpen={openAuthModel}
        onClose={() => {
          setOpenAuthModel(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} setOpenAuthModel={setOpenAuthModel} />}

          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
