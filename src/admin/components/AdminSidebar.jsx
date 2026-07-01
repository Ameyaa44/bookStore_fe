import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoMdHome } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import base_url from '../../services/base_url';
import { adminProfileContext } from '../../contextApi/ContextApi';

function AdminSidebar() {
    const location = useLocation()
    const [collapse, setCollapse] = useState(false)
    const { adminProfileStatus } = useContext(adminProfileContext);

    const [username, setUsername] = useState("");
    const [profilelogo, setProfileLogo] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem("uname")) {
            setUsername(sessionStorage.getItem("uname"));
            setProfileLogo(sessionStorage.getItem("dp"));
        } else {
            setUsername("");
        }
    }, [adminProfileStatus]);

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/admin-dashboard', icon: <IoMdHome size={16} />, label: 'Dashboard' },
        { path: '/admin-books',     icon: <FaBook size={14} />,    label: 'Resources' },
        // { path: '/admin-career',    icon: <IoBagAdd size={16} />,  label: 'Careers' },
        { path: '/admin-settings',  icon: <IoSettingsSharp size={15} />, label: 'Settings' },
    ]

    return (
        <div className="bg-[#0D2818] border-r border-[#C5A880]/10 min-h-full flex flex-col items-center py-10 px-4">

            {/* Profile Image */}
            <div className="w-[100px] h-[100px] rounded-full border-2 border-[#C5A880]/40 p-0.5 mb-4">
                <img
                    src={
                        profilelogo
                            ? profilelogo.startsWith("https://lh3.googleusercontent.com")
                                ? profilelogo
                                : `${base_url}/uploadImg/${profilelogo}`
                            : "https://static.vecteezy.com/system/resources/thumbnails/037/468/797/small/user-icon-illustration-for-graphic-design-logo-web-site-social-media-mobile-app-ui-png.png"
                    }
                    alt="admin"
                    className='w-full h-full rounded-full object-cover'
                />
            </div>

            {/* Username + toggle */}
            <div className="flex items-center gap-2 mb-6">
                <span className="text-white font-semibold text-sm tracking-wide">{username || "Admin"}</span>
                <button onClick={() => setCollapse(!collapse)} className="text-[#C5A880] hover:text-white transition">
                    <GiHamburgerMenu size={14} />
                </button>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-[#C5A880]/10 mb-6"></div>

            {/* Nav Links */}
            {!collapse && (
                <nav className="w-full space-y-1">
                    {navLinks.map(({ path, icon, label }) => (
                        <Link
                            key={path}
                            to={path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                                isActive(path)
                                    ? 'bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/20'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <span className={isActive(path) ? 'text-[#C5A880]' : 'text-white/40'}>{icon}</span>
                            {label}
                        </Link>
                    ))}
                </nav>
            )}

        </div>
    )
}

export default AdminSidebar