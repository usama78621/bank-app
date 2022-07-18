import React, { useState } from "react";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import '../../../../scss/_sidebar.scss'
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarContent,
} from "react-pro-sidebar";
import {
    FiArrowLeftCircle,
    FiArrowRightCircle,
} from "react-icons/fi";
import { MdDashboard, MdAddShoppingCart } from "react-icons/md";
import { IoBagAddSharp } from "react-icons/io5";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";

function Sidebar({ rtl, toggled, handleToggleSidebar }) {
    const [menuCollapse, setMenuCollapse] = useState(false);

    const headerStyle = {
        padding: '20px',
        letterSpacing: "1px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        backgroundColor: "#222",
        transition: "all 0.3s linear"
    };
    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    return (
        <ProSidebar
            collapsed={menuCollapse}
            rtl={rtl}
            toggled={toggled}
            breakPoint="lg"
            onToggle={handleToggleSidebar}
        >
            <SidebarHeader style={headerStyle} >
                <div>
                    {menuCollapse ? (
                        <FiArrowRightCircle className="fs-3 d-lg-block d-none" onClick={menuIconClick} />
                    ) : (
                        <div className="d-flex justify-content-between">
                            <span className="text-primary fs-5 fw-bold">Dashboard</span>
                            <span> <FiArrowLeftCircle className="fs-4 d-lg-block d-none" onClick={menuIconClick} />
                            </span>
                        </div>
                    )
                    }
                </div>
            </SidebarHeader>
            <SidebarContent className="bg-white">
                <Menu iconShape="circle">
                    <MenuItem icon={<MdDashboard />}>
                        <Link to="/dashboard">Dashboard</Link>
                    </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <MenuItem icon={<IoBagAddSharp />}>
                        <Link to='/dashboard/create'>
                            Add Accounts
                        </Link>
                    </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <MenuItem icon={<ContactMailIcon />}>
                        <Link to='/dashboard/accounts'>
                            Accounts
                        </Link>
                    </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <MenuItem icon={<MdAddShoppingCart />}>
                        <Link to='/dashboard/transcations'>
                            Transcations
                        </Link>
                    </MenuItem>
                </Menu>
            </SidebarContent>
        </ProSidebar>
    );
}
export default Sidebar;