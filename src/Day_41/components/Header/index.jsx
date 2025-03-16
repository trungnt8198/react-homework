import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="nav-links">
          <li>
            <NavLink to="/products" className="nav-link">
              Sản phẩm
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className="nav-link">
              Tìm kiếm
            </NavLink>
          </li>
          <li>
            <NavLink to="/new-product" className="nav-link">
              Tạo sản phẩm
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
