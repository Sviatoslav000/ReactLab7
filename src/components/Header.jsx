import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { checkAuth, getUsername, logout } from '../context/AuthContext.jsx';
import '../styles/header.css';
import logo from '../assets/img/logo.png';

const Header = () => {
  const isAuthenticated = checkAuth();
  const username = getUsername();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header-container">
      <div className="d-flex align-items-center justify-content-between">
        <div className="logo-container">
          <Link to="/" className="d-inline-flex link-body-emphasis text-decoration-none">
            <img src={logo} alt="Логотип" className="logo-img" />
          </Link>
        </div>

        <button className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-container ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav col-12 col-md-auto mb-0 justify-content-center">
            <li><Link to="/" className="nav-link px-2" onClick={toggleMenu}>Головна</Link></li>
            <li><Link to="/exhibitions" className="nav-link px-2" onClick={toggleMenu}>Виставки</Link></li>
            <li><Link to="/catalog" className="nav-link px-2" onClick={toggleMenu}>Каталог</Link></li>
            <li><Link to="/contact" className="nav-link px-2" onClick={toggleMenu}>Контакти</Link></li>
          </ul>

          <div className="text-end">
            {isAuthenticated ? (
              <div className="d-flex align-items-center flex-column flex-md-row">
                <div className="user-profile" onClick={toggleMenu}>
                  <Link to="/add-exhibition" className="d-flex align-items-center" onClick={(e) => e.stopPropagation()}>
                    <i className="fa-solid fa-user"></i>
                    <span className="username ms-2">{username}</span>
                  </Link> 
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="btn btn-outline-dark logout"
                >
                  Вийти
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center flex-column flex-md-row">
                <Link to="/login" className="login btn me-2" onClick={toggleMenu}>
                  Увійти
                </Link>
                <Link to="/register" className="register btn" onClick={toggleMenu}>
                  Зареєструватись
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;