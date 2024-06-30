import { useState } from "react";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../utils/axiosConfig";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const validateEmail = (email) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    axiosConfig
      .post("/api/v1/auth/register", {
        name,
        email,
        password,
        confirmpassword,
      })
      .then((res) => {
        alert(res.data.message);
        navigate("/login");
      })
      .catch((error) => {
        alert("Error in Registration!");
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-black">
      <div className="flex flex-col gap-2 p-2 h-[25rem] m-10 border-2 bg-white border-white rounded-xl w-[80%] sm:w-1/3 justify-center text-center">
        <h1 className="flex px-4 text-2xl h-10 items-center font-bold">
          Sign up
        </h1>
        <div className="flex flex-col w-full h-3/4 gap-3 justify-center">
          <Input
            isClearable
            type="text"
            variant="bordered"
            name="name"
            label="Name"
            color="success"
            value={name}
            onClear={()=> setName('')}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
            className="px-3"
          />
          <Input
            isClearable
            type="email"
            variant="bordered"
            name="email"
            label="Email"
            value={email}
            isInvalid={isInvalid}
            onClear={() => setEmail('')}
            color={isInvalid ? "danger" : "success"}
            errorMessage={isInvalid && "Please enter a valid email"}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-3"
          />
          <Input
            label="Password"
            variant="bordered"
            name="password"
            color="success"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3"
            placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <Input
            label="Confirm Password"
            variant="bordered"
            name="confirmpassword"
            value={confirmpassword}
            color="success"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter your confirm password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="px-3"
          />
        </div>
        <div className="flex w-full items-center h-1/5 justify-end px-3 gap-5">
          <Button
            color="primary"
            onClick={() => {
              navigate("/login");
            }}
            className="h-9 p-3"
          >
            Login
          </Button>
          <Button color="primary" onClick={handleSignup} className="h-9 p-3">
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
