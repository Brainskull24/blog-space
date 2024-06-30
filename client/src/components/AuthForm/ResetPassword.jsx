import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { useMemo } from "react";
import axiosConfig from "../../../utils/axiosConfig";
const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosConfig.post(
        "/api/v1/auth/reset-password",
        {
          email,
          password,
          name,
        }
      );
      if (res && res.data.success) {
        alert(res.data && res.data.message);
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  const [isVisible, setIsVisible] = useState(false);

  const validateEmail = (email) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex flex-col justify-center items-center bg-black">
      <div className="flex flex-col gap-2 p-2 h-80 m-10 border-2 bg-white border-white rounded-xl w-[80%] sm:w-1/3 justify-center text-center">
        <h1 className="flex px-4 text-2xl h-5 items-center font-bold">
          Reset Password{" "}
        </h1>
        <div className="flex flex-col w-full h-48 justify-evenly">
          <Input
            isClearable
            type="email"
            variant="bordered"
            name="email"
            label="Email"
            value={email}
            isInvalid={isInvalid}
            onClear={()=> setEmail('')}
            color={isInvalid ? "danger" : "success"}
            errorMessage={isInvalid && "Please enter a valid email"}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-3"
          />
          <Input
            isClearable
            type="text"
            variant="bordered"
            name="name"
            label="Name"
            value={name}
            onClear={()=> setName('')}
            color={isInvalid ? "danger" : "success"}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
            className="px-3"
          />
          <Input
            label="New Password"
            variant="bordered"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            color="success"
            placeholder="Enter your New password"
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
        <div className="flex w-full items-center h-12 justify-end px-3 gap-5">
          <Button color="primary" onClick={handleReset} className="h-9 p-3">
            Reset Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
