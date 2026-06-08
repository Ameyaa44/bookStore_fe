import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import { toast } from "react-toastify";
import base_url from "../../services/base_url";

import { profileContext } from "../../contextApi/ContextApi";
import { authRoleContext } from "../../contextApi/AuthContextApi";

function Header() {
  const [menuState, setMenuState] = useState(false);
  const [username, setUsername] = useState("");
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  const navigate = useNavigate();

  const { profileStatus } = useContext(profileContext);
  const { setRole } = useContext(authRoleContext);

  useEffect(() => {
    if (sessionStorage.getItem("uname")) {
      setUsername(sessionStorage.getItem("uname"));
      setProfilePicture(sessionStorage.getItem("dp"));
    } else {
      setUsername("");
    }
  }, [profileStatus]);

  const signout = () => {
    sessionStorage.clear();
    setUsername("");
    setProfilePicture("");
    setDropdownStatus(false);
    setRole("");
    toast.success("Logout successful");
    navigate("/login");
  };

  return (
    <>
      {/* TOP HEADER */}
      <div className="bg-[#F8F5F0] border-b border-[#e8e3db]">

        <div className="grid grid-cols-3 p-4 items-center">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              className="w-[48px] h-[48px]"
              alt="logo"
            />
            <h1 className="text-2xl font-bold text-[#1B4332] md:hidden">
              BOOKSTORE
            </h1>
          </div>

          {/* TITLE */}
          <div className="hidden md:flex justify-center">
            <h1 className="text-3xl font-bold text-[#1B4332] tracking-wide">
              BOOK STORE
            </h1>
          </div>

          {/* RIGHT SECTION */}
          <div className="hidden md:flex justify-end items-center gap-4">

            <FaInstagram className="text-[#1B4332] hover:scale-110 transition" />
            <RiTwitterXLine className="text-[#1B4332] hover:scale-110 transition" />
            <FaFacebookF className="text-[#1B4332] hover:scale-110 transition" />

            {/* USER */}
            {username ? (
              <div className="relative">

                <button
                  onClick={() => setDropdownStatus(!dropdownStatus)}
                  className="flex items-center gap-3 bg-white border border-[#e8e3db] px-3 py-1 rounded-full shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={
                      profilePicture
                        ? profilePicture.startsWith(
                            "https://lh3.googleusercontent.com"
                          )
                          ? profilePicture
                          : `${base_url}/uploadImg/${profilePicture}`
                        : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
                    }
                    className="w-[35px] h-[35px] rounded-full object-cover"
                    alt="profile"
                  />
                  <span className="text-[#1B4332] font-medium">
                    {username}
                  </span>
                </button>

                {dropdownStatus && (
                  <ul className="absolute right-0 mt-2 bg-white border border-[#e8e3db] rounded-xl shadow-lg w-[150px] z-50">

                    <li className="px-3 py-2 hover:bg-[#F8F5F0]">
                      <Link to="/user-profile">Profile</Link>
                    </li>

                    <li className="px-3 py-2 border-t">
                      <button
                        className="text-red-600 w-full text-left"
                        onClick={signout}
                      >
                        Sign Out
                      </button>
                    </li>

                  </ul>
                )}

              </div>
            ) : (
              <Link to="/login">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#1B4332] text-white rounded-full hover:bg-[#14532d] transition">
                  <FaUser />
                  Login
                </button>
              </Link>
            )}

          </div>

        </div>
      </div>

      {/* NAVBAR */}
      <nav className="bg-[#1B4332] text-white">

        <div className="flex justify-between md:hidden p-3">

          <button onClick={() => setMenuState(!menuState)}>
            <GiHamburgerMenu size={22} />
          </button>

          <Link to="/login">
            <button className="flex items-center gap-2 border border-white px-3 py-1 rounded">
              <FaUser />
              Login
            </button>
          </Link>

        </div>

        <ul
          className={`${
            menuState
              ? "flex flex-col gap-3 p-4"
              : "hidden md:flex justify-center gap-8 py-3"
          }`}
        >

          <Link className="hover:text-[#BC6C25] transition" to="/">
            Home
          </Link>

          <Link className="hover:text-[#BC6C25] transition" to="/books">
            Books
          </Link>

          <Link className="hover:text-[#BC6C25] transition" to="/career">
            Careers
          </Link>

          <Link className="hover:text-[#BC6C25] transition" to="/contact">
            Contact
          </Link>

        </ul>

      </nav>
    </>
  );
}

export default Header;