import React from 'react';

import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FiCalendar, FiCheck, FiX, FiAtSign, FiPhone } from 'react-icons/fi';

import doughnut from '../../../images_examples/doughnut-1.png';
import sushi from '../../../images_examples/sushi-1.png';
import transportadora from '../../../assets/img/transportadora.png';

import FemalePerfil from '../../../assets/img/perfil_female.svg';
import MalePerfil from '../../../assets/img/perfil_male.svg';

import NavAdmin from '../../../components/Admin/NavAdmin/NavAdmin';
import NavBarAdmin from '../../../components/Admin/NavBarAdmin/NavBarAdmin';
import history from '../../../history';

function orders({ match }) {
  const ordermID = match.params.id;

  return (
    <div className="container-admin d-flex order-product-style">
      <div className="menu-container">
        <NavAdmin />
      </div>
      <div className="content-container w-100">
        <NavBarAdmin pageRef={`Ordem #${ordermID}`} />
        <div className="container pd-t-40 pd-b-40 col-md-11">
          <div className="row">
            <div className="col-md">
              <button className="btn-back d-flex align-items-center" onClick={() => history.push('/admin/pedidos')}>
                <BsArrowLeft stroke-width="0.5" /> <small className="pl-3">Pedidos</small>
              </button>
            </div>
          </div>
          <div className="row pd-t-20">
            <div className="col-md-auto">
              <div className="d-flex align-items-center">
                <span className="order-title mb-0 mr-3">
                  Ordem <span className="order-number">#{ordermID}</span>
                </span>
                {/* <badge className="badge badge-success mr-1 ml-1">Success</badge> */}
                <badge className="badge badge-warning mr-1 ml-1">Em Analise</badge>
                <div className="span ml-4 border-left d-flex">
                  <FiCalendar stroke-width="1.8" color="#96A9C8" size="22" className="ml-4 mr-2" /> 08/08/2020 as 21:59h
                </div>
              </div>
            </div>
            <div className="col-md-auto ml-auto">
              <button className="btn-actions btn btn-success float-right ml-1 mr-1">
                <FiCheck size="18" stroke-width="3" />
              </button>
              <button className="btn-actions btn btn-danger float-right">
                <FiX size="18" stroke-width="3" />
              </button>
            </div>
          </div>
          <div className="container col-md-12 pr-0 pl-0">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <div className="row pd-t-10">
                  <div className="col-xl-12 col-lg-12 mb-xl-0">
                    <div className="card">
                      <div className="card-body">
                        <div className="row pd-b-20">
                          <div className="col-md">
                            <div className="title-qtd-products">
                              <div className="status"></div> <span className="title">Produtos</span> <span className="qtd">2</span>
                            </div>
                          </div>
                        </div>
                        <div className="row align-items-center">
                          <div className="col-md-auto">
                            <div className="media product-card">
                              <img className="mr-3" className="img-fluid img-product" src={doughnut} alt="Generic placeholder image" />
                              <div className="media-body pl-5">
                                <h2 className="title-product">Rosquinhas de Morgando</h2>
                                <p>
                                  Quantidade: <span>5 unidades</span>
                                </p>
                                <p>
                                  Valor: <span>R$ 2,50</span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-auto ml-auto">
                            <h2 className="total-price text-right">
                              <span>
                                Total
                                <br />
                              </span>
                              R$ 12,50
                            </h2>
                          </div>
                        </div>

                        <hr />

                        <div className="row align-items-center">
                          <div className="col-md-auto">
                            <div className="media product-card">
                              <img className="mr-3" className="img-fluid img-product" src={sushi} alt="Generic placeholder image" />
                              <div className="media-body pl-5">
                                <h2 className="title-product">Comida Japonesa</h2>
                                <p>
                                  Quantidade: <span>3 unidades</span>
                                </p>
                                <p>
                                  Valor: <span>R$ 12,99</span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-auto ml-auto">
                            <h2 className="total-price text-right">
                              <span>
                                Total
                                <br />
                              </span>
                              R$ 38,97
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row pd-t-10">
                  <div className="col-xl-12 col-lg-12 mb-xl-0">
                    <div className="card">
                      <div className="card-body">
                        <div className="row pd-b-20">
                          <div className="col-md">
                            <div className="title-qtd-products">
                              <span className="title">Entrega</span>
                            </div>
                          </div>
                        </div>
                        <div className="row align-items-center">
                          <div className="col-md-auto">
                            <div className="media product-card">
                              <img className="mr-3" className="img-fluid img-entrega" src={transportadora} alt="Generic placeholder image" />
                              <div className="media-body pl-3">
                                <h2 className="title-product">Loggi</h2>
                                <p>Entrega express</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-auto ml-auto">
                            <h2 className="total-price text-right">
                              <span>
                                Total
                                <br />
                              </span>
                              R$ 20.00
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row pd-t-10">
                  <div className="col-xl-12 col-lg-12 mb-xl-0">
                    <div className="card">
                      <div className="card-body">
                        <div className="row pd-b-20">
                          <div className="col-md">
                            <div className="title-qtd-products">
                              <span className="title">Sumário de pagamento</span>
                            </div>
                          </div>
                        </div>
                        <div className="row align-items-center">
                          <div className="col-md sumario-pagamento">
                            <p>
                              Subtotal (2 itens) <span className="float-right">R$ 51,47</span>
                            </p>
                            <p>
                              Entrega <span className="float-right">R$ 20,00</span>
                            </p>
                            <p>
                              Tax PDV 20% (incluido) <span className="float-right">R$ 00,00</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="footer-card footer-product-order">
                        <div className="container">
                          <div className="row">
                            <div className="col-md">
                              <p className="p-2 pt-4">
                                Total a ser pago <span className="float-right">R$ 71,47</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="row pd-t-10">
                  <div className="col-md">
                    <div className="card card-customers">
                      <div className="card-body">
                        <div className="row pd-b-20">
                          <div className="col-md">
                            <div className="title-qtd-products">
                              <span className="title">Cliente</span>
                            </div>
                          </div>
                        </div>
                        <div className="row align-items-center">
                          <div className="col-md">
                            <a href="#" className="link-perfil">
                              <div className="media align-items-center product-card">
                                <img className="mr-3" className="img-fluid img-perfil" src={FemalePerfil} alt="Generic placeholder image" />
                                <div className="media-body pl-3">
                                  <span className="mb-0">Joaquina Santana</span>
                                  <span className="float-right">
                                    <BsArrowRight />
                                  </span>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-md contact-infos">
                            <h2 className="pd-b-10">Informações de contato</h2>
                            <p>
                              <FiAtSign size="20" color="#96A9C8" /> <span>fabio27336f@gmail.com</span>
                            </p>
                            <p>
                              <FiPhone size="20" color="#96A9C8" /> <span>+55 (11) 98707-5393.</span>
                            </p>
                          </div>
                        </div>

                        <hr />
                        <div className="row">
                          <div className="col-md adress-infos">
                            <h2 className="pd-b-10">Endereço de envio</h2>
                            <p>Av. Italo Adami, nº 491</p>
                            <p>Vila Zeferina</p>
                            <p>08573-000</p>
                            <p>Itaquaquecetuba</p>
                            <p>São Paulo</p>
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
    </div>
  );
}

export default orders;
