import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";

import { Context } from "../context/authContext";
import { BsArrowLeft } from "react-icons/bs";
import { FiAtSign, FiPhone, FiLogOut } from "react-icons/fi";

import FemalePerfil from "../assets/img/perfil_female.svg";
import MalePerfil from "../assets/img/perfil_male.svg";
import loadingGif from "../assets/img/loading.gif";

import NavUser from "../components/NavUser/NavUser";

import history from "../history";

function Profile() {
  const [userGet, setUserGet] = useState({});
  const [loading, setLoading] = useState(true);
  const { handleLogout, setTypeUser } = useContext(Context);

  useEffect(() => {
    function getDados() {
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
          if (response.data.type === "admin") setTypeUser("admin");
          if (response.data.type === "editor") setTypeUser("editor");
          setUserGet(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    }

    getDados();
  }, []);

  if (loading) {
    return (
      <div className="container  vh-100 col-md-12">
        <div className="row vh-100">
          <div className="col-md m-auto col-md-12 text-center">
            <img src={loadingGif} alt="loading gif" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="profile-container order-product-style">
          <NavUser />

          <div className="container pd-t-80 pd-b-40 col-md-11">
            <div className="row pd-t-20">
              <div className="col-md">
                <button
                  className="btn-back d-flex align-items-center"
                  onClick={() => history.push("/")}
                >
                  <BsArrowLeft /> <small className="pl-3">Página Inicial</small>
                </button>
              </div>
            </div>

            <div className="container col-md-12 pr-0 pl-0">
              <div className="row">
                <div className="col-lg-4 col-md-12">
                  <div className="row pd-t-10">
                    <div className="col-md">
                      <div className="card card-customers">
                        <div className="card-body">
                          <div className="row align-items-center">
                            <div className="col-md">
                              <div className="media align-items-center product-card">
                                {userGet.gender === "masculine" ? (
                                  <img
                                    className="mr-3"
                                    className="img-fluid img-perfil"
                                    src={MalePerfil}
                                    alt="Generic female avatar"
                                  />
                                ) : (
                                  <img
                                    className="mr-3"
                                    className="img-fluid img-perfil"
                                    src={FemalePerfil}
                                    alt="Generic male avatar"
                                  />
                                )}
                                <div className="media-body pl-3">
                                  <span className="mb-0">{userGet.name}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-md contact-infos">
                              <h2 className="pd-b-10">
                                Informações de contato
                              </h2>
                              <p>
                                <FiAtSign size="20" color="#96A9C8" />{" "}
                                <span>{userGet.email}</span>
                              </p>
                              <p>
                                <FiPhone size="20" color="#96A9C8" />{" "}
                                <span>{userGet.phone}</span>
                              </p>
                            </div>
                          </div>

                          <hr />
                          <div className="row">
                            <div className="col-md adress-infos">
                              <h2 className="pd-b-10">Endereço de envio</h2>
                              <p>
                                {userGet.end}, nº {userGet.end_num}
                              </p>
                              <p>{userGet.district}</p>
                              <p>{userGet.cep}</p>
                              <p>{userGet.city}</p>
                              <p>{userGet.state}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row pd-t-10">
                    <div className="col-md">
                      <div className="card card-customers">
                        <div className="card-body">
                          <div className="row align-items-center">
                            <div className="col-md">
                              <button
                                className="btn btn-default w-100"
                                onClick={handleLogout}
                              >
                                <FiLogOut size="22" />
                                <span className="pl-2">Sair da conta</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12">
                  <div className="row pd-t-10">
                    <div className="col-md">
                      <div className="card card-customers">
                        <div className="card-body">
                          <div className="row align-items-center">
                            <div className="col-md">
                              <h2>Pedidos</h2>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-md contact-infos">
                              <p>Não foi encontrato nem um pedido.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
