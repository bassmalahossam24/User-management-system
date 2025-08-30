import  { useContext } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./SideBar.module.css";
import { CiHome } from "react-icons/ci";
import { FaArrowLeft, FaArrowRight, FaGraduationCap, FaUsers } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import profile from "../../assets/images/pexels-photo-2379004 1.png";
import { HiOutlineLogout } from "react-icons/hi";
import { AuthContext } from "../Context/AuthContext";

interface SideBarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function SideBar({ collapsed, setCollapsed }: SideBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, logout }: any = useContext(AuthContext);

  const handleToggle = () => setCollapsed(!collapsed);

  const handleMenuClick = (path: string) => {
    navigate(path);

    // Collapse only on small screens (width < 768px)
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  };

  const backToAuth = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { label: "Home", icon: <CiHome size={20} />, path: "/dashboard" },
    { label: "Users", icon: <FaUsers size={20} />, path: "/dashboard/users-list" },
    { label: "Add User", icon: <FaGraduationCap size={20} />, path: "/dashboard/add-user" },
    { label: "Profile", icon: <ImProfile size={20} />, path: "/dashboard/profile" },
  ];

  return (
    <div className={`${style.sidebarContainer} vh-100`}>
      <Sidebar collapsed={collapsed} transitionDuration={500} className="vh-100">
        {collapsed ? (
          <FaArrowRight
            size={24}
            className="mx-3 my-3 cursor-pointer"
            onClick={handleToggle}
          />
        ) : (
          <div>
            <FaArrowLeft
              size={24}
              className="mx-3 my-3 cursor-pointer"
              onClick={handleToggle}
            />
            <div className="text-center mt-4 mb-4">
              <img
                src={userData?.image || profile}
                alt="profile"
                className="rounded-circle border border-2 border-warning"
              />
              <h6 className="mt-2 mb-0 fw-semibold">{userData?.firstName}</h6>
              <small className="text-warning">Admin</small>
            </div>
          </div>
        )}

        <Menu className={`${style.menu} d-flex flex-column align-items-center`}>
          {menuItems.map((item) => (
            <MenuItem
              key={item.path}
              icon={item.icon}
              active={location.pathname === item.path}
              onClick={() => handleMenuClick(item.path)}
              style={{
                backgroundColor:
                  location.pathname === item.path ? "#ffc107" : "transparent",
                color: location.pathname === item.path ? "#000" : undefined,
                width: "100%",
              }}
            >
              {!collapsed && item.label}
            </MenuItem>
          ))}

          <MenuItem
            onClick={backToAuth}
            icon={<HiOutlineLogout size={20} />}
            className="text-danger fw-semibold"
          >
            {!collapsed && "Logout"}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
