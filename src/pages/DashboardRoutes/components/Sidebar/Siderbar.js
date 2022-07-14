import React, { useState } from "react";
import '../../../../scss/_sidebar.scss'
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarContent,
    SubMenu
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
                        <Link to="/">Dashboard</Link>
                    </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu title="Products" icon={<IoBagAddSharp />}  >
                        <MenuItem>
                            <Link to='/dashboard/account' className="text-white">
                                Add Accounts
                            </Link>
                        </MenuItem>
                    </SubMenu>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu title="Transcations" icon={<MdAddShoppingCart />}  >
                        <MenuItem>
                            <Link to='/transcations' className="text-white">
                                Transcations
                            </Link>
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </SidebarContent>
        </ProSidebar>
    );
}
export default Sidebar;