/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBasket } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../auth/CartContext";

function Header() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/" },
    { name: "Books", path: "/" },
  ];

  /* ---------- Scroll effect ---------- */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------- Logout ---------- */
  const handleLogout = async () => {
    await logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  /* ---------- Nav Links ---------- */
  const NavLinks = ({ onClick }) => (
    <>
      {navLinks.map((link, i) => (
        <a className="cursor-pointer"
          key={i}
          onClick={() => {
            navigate(link.path);
            onClick?.();
          }}
        >
          {link.name}
        </a>
      ))}
    </>
  );

  /* ---------- Shared User Actions ---------- */
  const renderUserActions = (isMobile = false) => {
    const containerClass = isMobile
      ? "flex flex-col gap-4 items-center"
      : "hidden md:flex items-center gap-4";

    if (!isAuthenticated) {   
      return (
        <div className={containerClass}>
          <button onClick={() =>{setIsMenuOpen(false); navigate("/login");} }>Login</button>
          <button
            onClick={() => {setIsMenuOpen(false);navigate("/signup");}}
          >
            Signup
          </button>
        </div>
      );
    }

    return (
      <div className={containerClass}>
        <span className="text-sm">Welcome, {user?.name}</span>

        {isAdmin ? (
          <button onClick={() => navigate("/admin")} className='whitespace-nowrap w-44'>
            Manage Dashboard
          </button>
        ) : (
          <div className="relative">
            {cart?.totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {cart.totalItems}
              </span>
            )}
            <a onClick={() => {
        setIsMenuOpen(false);
         navigate("/cart");
       }}  className="cursor-pointer">
              <ShoppingBasket />
            </a>
          </div>
        )}

        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  };

  return (
    <nav
      className={` top-0 left-0 w-full z-50 px-6 md:px-16 flex items-center justify-between transition-all duration-300
      ${isScrolled ? "bg-white shadow-md py-3" : "bg-white py-5"}`}
    >
      {/* ---------- Logo ---------- */}
      <a onClick={() => navigate("/")} >
        <img src="/logo.png" alt="logo" className=" h-20 object-contain" />
      </a>

      {/* ---------- Desktop Nav ---------- */}
      <div className="hidden md:flex items-center gap-8">
        <NavLinks  />
      </div>

      {/* ---------- Desktop Actions ---------- */}
      {renderUserActions()}

      {/* ---------- Mobile Menu Button ---------- */}
      <a
        className={`md:hidden ${isMenuOpen ? "hidden" : "block"} bg-transparent border-none outline-none shadow-none  cursor-pointer text-black w-10 h-12 font-bold`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </a>

      {/* ---------- Mobile Menu ---------- */}
      <div
        className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-6
        transition-transform duration-300 md:hidden
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <a
          className="absolute top-4 right-6 text-xl cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        >
          ✕
        </a>

        <NavLinks onClick={() => setIsMenuOpen(false)} />

        <hr className="w-1/2" />

        {renderUserActions(true)}
      </div>
    </nav>
  );
}

export default Header;
