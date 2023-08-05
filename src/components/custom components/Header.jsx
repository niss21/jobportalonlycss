import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Header.css";
import { useEffect } from "react";

function Header() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "noRole";

  useEffect(() => {
    if (role !== "noRole") {
      const menu = document.querySelector(".menu");
      const menuBtn = document.querySelector(".menu-icon-btn");

      const hideMenu = (event) => {
        if (!(menu.contains(event.target) || menuBtn.contains(event.target))) {
          menu.classList.remove("show-menu");
        }
      };

      document.body.addEventListener("click", hideMenu);

      return () => document.body.removeEventListener("click", hideMenu);
    }
  }, [role]);

  const handleMenuToggle = () => {
    const menu = document.querySelector(".menu");

    if (menu.classList.contains("show-menu")) {
      menu.classList.remove("show-menu");
    } else {
      menu.classList.add("show-menu");
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="header-wrapper">
      <h2>
        <Link to="/">JobsPortal</Link>
      </h2>
      <div className="header-buttons">
        <Link to="/charts" className="light-link">
          Charts
        </Link>
        {role === "noRole" && (
          <>
            <Link to="/login" className="light-link">
              Login
            </Link>
            <Link to="/register" className="bold-link">
              Register
            </Link>
          </>
        )}
        {role === "applicant" && (
          <>
            <div className="menu-icon">
              <FaUserCircle
                onClick={handleMenuToggle}
                className="menu-icon-btn"
                fill="#338573"
                size={35}
              />
              <div className="menu">
                <Link onClick={handleMenuToggle} to="/profile">
                  Profile
                </Link>
                <Link
                  onClick={handleMenuToggle}
                  className="menu-icon-btn"
                  to="/appliedjobs"
                >
                  Applied Jobs
                </Link>
                <button onClick={handleLogOut}>Log Out</button>
              </div>
            </div>
          </>
        )}
        {role === "recruiter" && (
          <>
            <div className="menu-icon">
              <FaUserCircle
                onClick={handleMenuToggle}
                className="menu-icon-btn"
                fill="#338573"
                size={35}
              />
              <div className="menu">
                <Link onClick={handleMenuToggle} to="/profile">
                  Profile
                </Link>
                <Link onClick={handleMenuToggle} to="/postjob">
                  Post a Job
                </Link>
                <Link onClick={handleMenuToggle} to="/postedjobs">
                  Posted Jobs
                </Link>
                <button onClick={handleLogOut}>Log Out</button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
