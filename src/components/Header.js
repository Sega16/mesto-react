import React from "react";
import logo from "../images/logo.svg";

function Header() {
    return (
        <header class="header">
            <img className="header__logo" src={logo} alt="логотип проекта"/>
        </header>
    );
}
export default Header;