import React from "react";

const Header = (props) => {
  return (
    <header className="header">
      <div className="container">
        <h2 className="logo">Logo</h2>
        <input
          value={props.value}
          className="searchBar"
          onChange={props.search}
          type="text"
          placeholder="Search"
        />
      </div>
    </header>
  );
};

export default Header;
