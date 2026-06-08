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

    const activeStyle = "text-emerald-700 font-semibold"
    const baseItemStyle = "flex gap-2 items-center my-3 text-gray-700 hover:text-emerald-700 transition"

    return (
        <div className="bg-white border-r border-gray-200 min-h-full flex flex-col items-center justify-center py-10 shadow-sm">

            <img
                src={
                    profilelogo
                        ? profilelogo.startsWith("https://lh3.googleusercontent.com")
                            ? profilelogo
                            : `${base_url}/uploadImg/${profilelogo}`
                        : "https://static.vecteezy.com/system/resources/thumbnails/037/468/797/small/user-icon-illustration-for-graphic-design-logo-web-site-social-media-mobile-app-ui-png.png"
                }
                alt="admin"
                className='w-[120px] h-[120px] rounded-full border-4 border-emerald-100'
            />

            <h1 className="my-3 font-semibold flex items-center gap-3 text-gray-800">
                {username}
                <button onClick={() => setCollapse(!collapse)} className="text-emerald-700">
                    <GiHamburgerMenu />
                </button>
            </h1>

            {!collapse && (
                <div>

                    <div className={baseItemStyle}>
                        <input type="radio" checked={location.pathname === '/admin-dashboard'} readOnly />
                        <Link to={'/admin-dashboard'}>
                            <label className={location.pathname === '/admin-dashboard' ? activeStyle : ""}>
                                <IoMdHome /> Home
                            </label>
                        </Link>
                    </div>

                    <div className={baseItemStyle}>
                        <input type="radio" checked={location.pathname === '/admin-books'} readOnly />
                        <Link to={'/admin-books'}>
                            <label className={location.pathname === '/admin-books' ? activeStyle : ""}>
                                <FaBook /> Resources
                            </label>
                        </Link>
                    </div>

                    <div className={baseItemStyle}>
                        <input type="radio" checked={location.pathname === '/admin-career'} readOnly />
                        <Link to={'/admin-career'}>
                            <label className={location.pathname === '/admin-career' ? activeStyle : ""}>
                                <IoBagAdd /> Careers
                            </label>
                        </Link>
                    </div>

                    <div className={baseItemStyle}>
                        <input type="radio" checked={location.pathname === '/admin-settings'} readOnly />
                        <Link to={'/admin-settings'}>
                            <label className={location.pathname === '/admin-settings' ? activeStyle : ""}>
                                <IoSettingsSharp /> Settings
                            </label>
                        </Link>
                    </div>

                </div>
            )}

        </div>
    )
}

export default AdminSidebar