import React from "react";
import { Button } from "@nextui-org/button";
import { useAuth } from "../../context/auth.jsx";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { SearchIcon } from "./SearchIcon.jsx";
import { useNavigate } from "react-router-dom";

const Navbarr = ({ darkMode, setDarkMode }) => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/");
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <Navbar isBordered className="bg-white">
        <NavbarContent justify="start">
          <NavbarBrand
            className="mr-4 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <AcmeLogo />
            <p className="hidden sm:block font-bold text-inherit">BlogSpace</p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent as="div" className="items-center" justify="between">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
          {!auth?.user ? (
            <NavbarItem>
              <Button
                onClick={() => navigate("/login")}
                radius="large"
                className="h-9 p-3 bg-gradient-to-tr from-blue-500 to-green-500 text-white shadow-lg"
              >
                Sign Up
              </Button>
            </NavbarItem>
          ) : (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{auth.user.name}</p>
                </DropdownItem>
                <DropdownItem
                  key="profile"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  My Profile
                </DropdownItem>
                <DropdownItem
                  key="addblog"
                  onClick={() => {
                    navigate("/addblog");
                  }}
                >
                  Add Blog
                </DropdownItem>
                <DropdownItem
                  key="recentblogs"
                  onClick={() => {
                    navigate("/recentblogs");
                  }}
                >
                  My Blogs
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </NavbarContent>
        <Switch
          defaultSelected={darkMode} // Set the initial state based on darkMode prop
          onChange={toggleDarkMode} // Handle state change
          size="lg"
          color="secondary"
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <SunIcon className={className} />
            ) : (
              <MoonIcon className={className} />
            )
          }
        />
      </Navbar>
      <Navbar className="bg-white" isBordered >
        <NavbarContent
          as="div"
          className="w-full px-20 items-center justify-evenly flex cursor-pointer"
          justify="between"
        >
          <NavbarItem>
            <Link
              color="secondary"
              onClick={() => {
                navigate("/category/business");
              }}
            >
              Business
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="secondary"
              onClick={() => {
                navigate("/category/travel");
              }}
            >
              Travel
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="secondary"
              onClick={() => {
                navigate("/category/technology");
              }}
            >
              Technology
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="secondary"
              onClick={() => {
                navigate("/category/food");
              }}
            >
              Food
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="secondary"
              onClick={() => {
                navigate("/category/fashion");
              }}
            >
              Fashion
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="secondary"
              onClick={() => {
                navigate("/category/sports");
              }}
            >
              Sports
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default Navbarr;
