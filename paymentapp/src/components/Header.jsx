import React, { useState, useRef, useEffect } from "react";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="https://www.blockchaininnovationlab.io/index.html">Home</a>
          </li>
          <li>
            <a href="https://www.blockchaininnovationlab.io/nft.html">
              NFT-Driven Experience
            </a>
          </li>
          <li
            className={`dropdown${dropdownOpen ? " open" : ""}`}
            ref={dropdownRef}
          >
            <span
              className="dropdown-title"
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen((open) => !open);
              }}
            >
              Projects
            </span>
            <ul className="dropdown-content">
              <li>
                <a href="https://www.blockchaininnovationlab.io/paymentapp/index.html">
                  Payment App
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="https://www.blockchaininnovationlab.io/cryptomeetups.html">
              Crypto Meet Ups
            </a>
          </li>
          <li>
            <a href="https://www.blockchaininnovationlab.io/about.html">
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
