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
      {/* LUXURY TOP ANNOUNCEMENT BANNER */}
      <div className="bg-[#0B1F14] text-[#C5A880] text-xs text-center py-2 px-4 uppercase tracking-[2px] font-semibold border-b border-[#C5A880]/20 select-none">
        Complimentary Shipping on All Premium Literary Works
      </div>

      {/* TOP HEADER */}
      <div className="bg-[#FAF7F2] border-b border-[#E3DAC9]/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-3 p-2 items-center">
          
          {/* LEFT: SOCIAL LINKS */}
          <div className="hidden md:flex items-center gap-5 text-[#0D2818]/70">
            <a href="" target="_blank" rel="noreferrer" className="hover:text-[#C5A880] hover:scale-110 transition duration-300">
              <FaInstagram size={18} />
            </a>
            <a href="" target="_blank" rel="noreferrer" className="hover:text-[#C5A880] hover:scale-110 transition duration-300">
              <RiTwitterXLine size={16} />
            </a>
            <a href="" target="_blank" rel="noreferrer" className="hover:text-[#C5A880] hover:scale-110 transition duration-300">
              <FaFacebookF size={16} />
            </a>
          </div>

          {/* LEFT: MOBILE LOGO */}
          <div className="flex items-center gap-3 md:hidden col-span-2">
            <img src="/logo.png" className="w-[42px] h-[42px] object-contain" alt="logo" />
            <h1 className="text-lg font-serif-display font-semibold tracking-[2px] text-[#0D2818]">
              BOOKSTORE
            </h1>
          </div>

          {/* CENTER: LOGO / TITLE */}
          <div className="hidden md:flex justify-center">
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/logo.png" className="w-[45px] h-[45px] object-contain group-hover:rotate-12 transition duration-500" alt="logo" />
              <h1 className="text-2xl font-serif-display font-bold tracking-[4px] text-[#0D2818] group-hover:text-[#C5A880] transition duration-300">
                THE BOOKSTORE
              </h1>
            </Link>
          </div>

          {/* RIGHT: USER ACTION */}
          <div className="flex justify-end items-center gap-4 col-span-1">
            {username ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownStatus(!dropdownStatus)}
                  className="flex items-center gap-3 bg-white border border-[#E3DAC9] px-4 py-2 rounded-full shadow-sm hover:shadow-[0_4px_15px_rgba(197,168,128,0.15)] hover:border-[#C5A880] transition-all duration-300"
                >
                  <img
                    src={
                      profilePicture
                        ? profilePicture.startsWith("https://lh3.googleusercontent.com")
                          ? profilePicture
                          : `${base_url}/uploadImg/${profilePicture}`
                        : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
                    }
                    className="w-[28px] h-[28px] rounded-full object-cover ring-2 ring-[#C5A880]/30"
                    alt="profile"
                  />
                  <span className="text-[#0D2818] font-medium text-sm hidden sm:inline">
                    {username}
                  </span>
                </button>

                {dropdownStatus && (
                  <ul className="absolute right-0 mt-3 glass-premium rounded-2xl shadow-xl border border-[#C5A880]/30 p-1.5 w-[160px] z-50 animate-fade-in">
                    <li>
                      <Link
                        to="/user-profile"
                        onClick={() => setDropdownStatus(false)}
                        className="flex w-full px-4 py-2.5 text-sm text-[#0D2818] hover:bg-[#C5A880]/10 hover:text-[#0D2818] rounded-xl transition duration-200 font-medium"
                      >
                        Profile
                      </Link>
                    </li>
                    <li className="border-t border-[#E3DAC9]/60 my-1"></li>
                    <li>
                      <button
                        className="flex w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl text-left transition duration-200 font-medium"
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
                <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0D2818] text-[#C5A880] rounded-full hover:bg-[#C5A880] hover:text-[#0D2818] transition-all duration-300 font-medium text-sm border border-[#C5A880]/30 hover:border-transparent">
                  <FaUser size={12} />
                  Login
                </button>
              </Link>
            
            )}
          </div>

        </div>
      </div>

      {/* NAVBAR */}
      <nav className="bg-[#0B1F14] text-white border-b border-[#C5A880]/15">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between md:hidden py-4">
            <button onClick={() => setMenuState(!menuState)} className="text-[#C5A880]">
              <GiHamburgerMenu size={24} />
            </button>

            {!username && (
              <Link to="/login">
                <button className="flex items-center gap-2 border border-[#C5A880]/40 text-[#C5A880] px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-[#C5A880] hover:text-[#0D2818] transition duration-300">
                  <FaUser size={10} />
                  Login
                </button>
              </Link>
            )}
          </div>

          <ul
            className={`${
              menuState
                ? "flex flex-col gap-4 pb-5 pt-2 animate-fade-in"
                : "hidden md:flex justify-center gap-12 py-4"
            }`}
          >
            <li>
              <Link
                className="relative text-sm uppercase tracking-[2px] hover:text-[#C5A880] font-medium transition duration-300 py-1 block"
                to="/"
                onClick={() => setMenuState(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="relative text-sm uppercase tracking-[2px] hover:text-[#C5A880] font-medium transition duration-300 py-1 block"
                to="/books"
                onClick={() => setMenuState(false)}
              >
                Books
              </Link>
            </li>
            <li>
              <Link
                className="relative text-sm uppercase tracking-[2px] hover:text-[#C5A880] font-medium transition duration-300 py-1 block"
                to="/career"
                onClick={() => setMenuState(false)}
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                className="relative text-sm uppercase tracking-[2px] hover:text-[#C5A880] font-medium transition duration-300 py-1 block"
                to="/contact"
                onClick={() => setMenuState(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;

