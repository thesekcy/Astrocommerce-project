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
        <a className="h4 mb-0 text-uppercase d-none d-lg-inline-block">
          {props.pageRef}
        </a>

        <ul className="navbar-nav align-items-center d-none d-md-flex">
          <li className="nav-item dropdown show">
            <DropdownButton id="dropdown-basic-button" title={userName}>
              <Dropdown.Item onClick={handleLogout}>Deslogar</Dropdown.Item>
            </DropdownButton>

            <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
              <div className=" dropdown-header noti-title">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </div>
              <a
                href="https://api.astrocode.com.br/profile"
                className="dropdown-item"
              >
                <i className="ni ni-single-02"></i>
                <span>My profile</span>
              </a>
              <a href="#" className="dropdown-item">
                <i className="ni ni-settings-gear-65"></i>
                <span>Settings</span>
              </a>
              <a href="#" className="dropdown-item">
                <i className="ni ni-calendar-grid-58"></i>
                <span>Activity</span>
              </a>
              <a href="#" className="dropdown-item">
                <i className="ni ni-support-16"></i>
                <span>Support</span>
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" onClick={handleLogout}>
                <i className="ni ni-user-run"></i>
                <span>Logout</span>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBarAdmin;
