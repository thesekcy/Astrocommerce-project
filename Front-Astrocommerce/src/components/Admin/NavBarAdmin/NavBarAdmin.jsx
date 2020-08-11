import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Context } from "../../../context/authContext";

function NavBarAdmin(props) {
  const [userName, setUserName] = useState("");
  const { handleLogout } = useContext(Context);

  useEffect(() => {
    function getUser() {
      const token = localStorage.getItem("token");

      var config = {
        method: "post",
        url: "http://127.0.0.1:8000/api/me",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      Axios(config)
        .then(function (response) {
          let resp = response.data;
          // console.log(resp.name)
          setUserName(resp.name);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    getUser();
  }, []);

  return (
    <nav
      className="navbar navbar-top navbar-expand-md navbar-light"
      id="navbar-main"
    >
      <div className="container-fluid">
        <span className="h4 mb-0 text-uppercase d-none d-lg-inline-block">
          {props.pageRef ? props.pageRef : '' }
        </span>

        <ul className="navbar-nav align-items-center d-none d-md-flex">
          <li className="nav-item dropdown show">
            <DropdownButton id="dropdown-basic-button" title={userName}>
              <Dropdown.Item onClick={handleLogout}>Deslogar</Dropdown.Item>
            </DropdownButton>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBarAdmin;
