import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  let isArrayFunction = (inputArray) => {
    if (Array.isArray(inputArray) && inputArray.length !== 0) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <div id="Navbar">
      <div class="usa-overlay"></div>
      <header class="usa-header usa-header--basic usa-header--megamenu padding-bottom-4 padding-top-6">
        <div class="usa-nav-container">
          <div class="usa-navbar">
            <div class="usa-logo margin-0" id="basic-mega-logo">
              <em class="usa-logo__text">
                <div className="display-flex flex-row align-items-center">
                <Link to={"/"}>
                <img width={70} height={70} src={"https://user-images.githubusercontent.com/86917304/189974862-abcfeac0-b5ed-44d2-8eb4-8e2a05a59294.png"} alt="logo" />
                  <h3 className="display-inline-block padding-left-1" style={{color: "white"}}>Wecare Checker</h3>
                </Link>
                </div>
              </em>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
