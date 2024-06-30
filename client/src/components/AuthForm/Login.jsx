import { useState, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { Button, Input } from "@nextui-org/react";
import axiosConfig from "../../utils/axiosConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  const validateEmail = (email) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async () => {
    try {
      const response = await axiosConfig.post(
        "/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      alert(response.data.message);
      setAuth({
        ...auth,
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem("auth", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
      navigate("/register");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-black">
      <h1 className="text-3xl text-white">Welcome to BlogSpace</h1>
      <div className="flex flex-col gap-2 p-2 h-80 m-10 border-2 bg-white border-white rounded-xl w-[80%] sm:w-1/3 justify-center text-center">
        <h1 className="flex px-4 text-2xl h-5 items-center font-bold">
          Log In{" "}
        </h1>
        <div className="flex flex-col w-full h-40 justify-evenly">
          <Input
            isClearable
            type="email"
            variant="bordered"
            name="email"
            label="Email"
            onClear={() => setEmail('')}
            value={email}
            isInvalid={isInvalid}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            color="success"
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
            className="px-3"
          />
        </div>
        <div className="flex w-full justify-end px-3 h-6">
          <NavLink to="/reset-password" className="text-blue-600">
            Forgot password?
          </NavLink>
        </div>
        <div className="flex w-full items-center h-1/5 justify-end px-3 gap-5">
          <Button
            color="primary"
            onClick={() => {
              navigate("/register");
            }}
            className="h-9 p-3"
          >
            Create Account
          </Button>
          <Button color="primary" onClick={handleLogin} className="h-9 p-3 ">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
