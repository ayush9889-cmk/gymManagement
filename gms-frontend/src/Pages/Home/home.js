import React from "react";
import Login from "../../Component/Login/login";
import Singup from "../../Component/Signup/singup";

const Home = () => {
  return (
    <div className="w-full h-[100vh]">
      <div className="border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-xl">
        Welcome to Gym Management System
      </div>
      <div className="w-full bg-cover flex justify-center  h-[100%] bg-[url('https://png.pngtree.com/background/20230516/original/pngtree-large-room-full-of-equipment-in-a-gym-picture-image_2611111.jpg')]">
        <div className="w-full lg:flex gap-32">
          <Login />
          <Singup />
        </div>
      </div>
    </div>
  );
};

export default Home;
