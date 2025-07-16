import React, { useState, useEffect } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { ToastContainer, toast } from "react-toastify";

const Addmember = () => {
  const [inputField, setInputField] = useState({
    name: "",
    mobileNo: "",
    address: "",
    membership: "",
    profilePic:
      "https://th.bing.com/th/id/OIP.eDfds46iXzl6qTA5yVkRJAHaHG?rs=1&pid=ImgDetMain",
    joiningDate: "",
  });
  const [imageLoader, setImageLoader] = useState(false);
  const [membershipList, setMembershipList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };
  console.log(inputField);
  const uploadImage = async (event) => {
    setImageLoader(true);
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
      setInputField({ ...inputField, ["profilePic"]: imageUrl });
      setImageLoader(false);
    } catch (err) {
      console.log(err);
      setImageLoader(false);
    }
  };

  const fetchMembership = async (event) => {
    await axios
      .get("http://localhost:4000/plans/get-membership", {
        withCredentials: true,
      })
      .then((response) => {
        setMembershipList(response.data.membership);
        if (response.data.membership.length === 0) {
          return toast.error("No Any Membership Added Yet", {
            className: "text-lg",
          });
        } else {
          let a = response.data.membership[0]._id;
          setSelectedOption(a);
          setInputField({ ...inputField, membership: a });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Wrong Happened");
      });
  };

  useEffect(() => {
    console.log(inputField);
    fetchMembership();
  }, []);

  const handleOnChangeSelect = (event) => {
    let value = event.target.value;
    setSelectedOption(value);
    setInputField({ ...inputField, membership: value });
  };

  const handleRegisterButton = async () => {
    await axios
      .post("http://localhost:4000/members/register-member", inputField, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Added Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Wrong Happened");
      });
  };
  return (
    <div className="text-black">
      <div className="grid gap-5 grid-cols-2 text-lg">
        <input
          onChange={(event) => {
            handleOnChange(event, "name");
          }}
          value={inputField.name}
          placeholder="Name Of Joinee"
          type="text"
          className="border-2 w-[90%] pl-3 pr-3 pt-2  pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          onChange={(event) => {
            handleOnChange(event, "mobileNo");
          }}
          value={inputField.mobileNo}
          placeholder="Mobile Number"
          pattern="[6-9][0-9]{9}"
          required
          type="tel"
          inputMode="numeric"
          className="border-2 w-[90%] pl-3 pr-3 pt-2  pb-2 border-slate-400 rounded-md h-12"
        />

        <input
          onChange={(event) => {
            handleOnChange(event, "address");
          }}
          value={inputField.address}
          placeholder="Enter Address"
          type="text"
          className="border-2 w-[90%] pl-3 pr-3 pt-2  pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          onChange={(event) => {
            handleOnChange(event, "joiningDate");
          }}
          value={inputField.joiningDate}
          type="date"
          className="border-2 w-[90%] pl-3 pr-3 pt-2  pb-2 border-slate-400 rounded-md h-12"
        />
        <select
          value={selectedOption}
          onChange={handleOnChangeSelect}
          className="border-2 w-[90%] pl-3 pr-3 pt-2  pb-2 border-slate-400 rounded-md h-12 placeholder:text-gray"
        >
          {membershipList.map((item, index) => {
            return (
              <option key={index} value={item._id}>
                {item.months} Months Membership
              </option>
            );
          })}
        </select>
        <input
          type="file"
          onChange={(e) => {
            uploadImage(e);
          }}
        />
        <div className="w-1/4">
          <img
            src={inputField.profilePic}
            alt="gym"
            className="w-full h-full rounded-full"
          />
          {imageLoader && (
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="secondary" />
            </Stack>
          )}
        </div>
        <div
          onClick={() => handleRegisterButton()}
          className="p-3 border-2  w-28 text-lg h-14 text-center  bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          Register
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Addmember;
