import React, { useState } from "react";
import "./signup.css";
import Modal from "../Modal/modal";
import Forgotpassword from "../ForgotPassword/forgotpassword";
import axios from "axios";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { ToastContainer, toast } from "react-toastify";
//mport { data } from "react-router-dom";

const Singup = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [inputField, setInputField] = useState({
    gymName: "",
    email: "",
    userName: "",
    password: "",
    profilePic:
      "https://th.bing.com/th/id/OIP.YOhmtCguMabecDdAfym4IQHaEu?rs=1&pid=ImgDetMain",
  });
  const [loaderImage, setLoaderImage] = useState(false);
  const handleClose = () => {
    setForgotPassword((prev) => !prev);
  };
  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const uploadImage = async (event) => {
    setLoaderImage(true);
    console.log("Image Uploaded");
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);

    //djr98l7hh
    data.append("upload_preset", "gym-management");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/djr98l7hh/image/upload",
        data
      );
      console.log(response);
      const imageUrl = response.data.url;
      setLoaderImage(false);
      setInputField({ ...inputField, ["profilePic"]: imageUrl });
    } catch (err) {
      console.log(err);
      setLoaderImage(false);
    }
  };

  const handleRegister = async () => {
    await axios
      .post("http://localhost:4000/auth/register", inputField)
      .then((resp) => {
        const successMsg = resp.data.message;
        toast.success(successMsg);
      })
      .catch((err) => {
        const errorMessage = err.response.data.error;
        // console.log(errorMessage);
        toast.error(errorMessage);
      });
  };
  return (
    <div className="customSignup w-1/3 p-10 mt-20 ml-20 bg-gray-50 bg-opacity-50 h-[450px] overflow-y-auto">
      <div className="font-sans text-black text-center text-2xl">
        Register Your Gym
      </div>
      <input
        onChange={(event) => {
          handleOnChange(event, "email");
        }}
        value={inputField.email}
        type="email"
        required
        className="w-full my-10 p-2 rounded-lg"
        placeholder="Enter Your Email"
      ></input>
      <input
        onChange={(event) => {
          handleOnChange(event, "gymName");
        }}
        value={inputField.gymName}
        type="text"
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter Your Gym Name"
      ></input>
      <input
        onChange={(event) => {
          handleOnChange(event, "userName");
        }}
        value={inputField.userName}
        type="text"
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter UserName"
      ></input>

      <input
        onChange={(event) => {
          handleOnChange(event, "password");
        }}
        value={inputField.password}
        type="password"
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter Your Password"
      ></input>
      <input
        type="file"
        onChange={(e) => {
          uploadImage(e);
        }}
        className="w-full mb-10 p-2 rounded-lg"
      />
      {loaderImage && (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="secondary" />
        </Stack>
      )}

      <img src={inputField.profilePic} className=" mb-10 h-[200px] w-[250px]" />

      <div
        className="p-2 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white  text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer"
        onClick={() => handleRegister()}
      >
        Register
      </div>
      <div
        className="p-2 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white  text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer"
        onClick={() => handleClose()}
      >
        Forget Password
      </div>
      {forgotPassword && (
        <Modal
          header="Forgot Password"
          handleClose={handleClose}
          content={<Forgotpassword />}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Singup;
