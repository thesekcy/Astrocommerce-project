import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import NavAdmin from '../../components/Admin/NavAdmin/NavAdmin';
import NavBarAdmin from '../../components/Admin/NavBarAdmin/NavBarAdmin';
import { Link, Redirect } from 'react-router-dom';

function Dashboard() {
  const [dashboard, setDashboard] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [redirectId, setRedirectId] = useState('');

  useEffect(() => {
    function getDashboard() {
      const token = localStorage.getItem('token');

      var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/dashboard',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      Axios(config)
        .then(function (response) {
          console.log(response.data);
          setDashboard(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    getDashboard();
  }, []);

  function handlerOrder(id) {
    setRedirectId(id);
    setRedirect(true);
  }

  if (redirect) {
    return <Redirect to={`/admin/pedidos/${redirectId}`} />;
  } else {
    return (
      <>
        <div className="container-admin d-flex">
          <div className="menu-container">
            <NavAdmin />
          </div>
          <div className="content-container w-100">
            <NavBarAdmin pageRef="Dashboard" />
            <div className="container pd-t-40 pd-b-40 col-md-11">
              <div className="row">
                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase mb-0">Clientes</h5>
                          <h2 className="font-weight-bold mb-0">{dashboard.QuantityClients}</h2>
                        </div>
                      </div>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <FiArrowUp /> 3.48%
                        </span>
                        <span className="text-nowrap">Desde o último mês</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase mb-0">Produtos</h5>
                          <h2 className="font-weight-bold mb-0">{dashboard.QuantityProducts}</h2>
                        </div>
                      </div>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          <FiArrowDown /> 5.48%
                        </span>
                        <span className="text-nowrap">Desde o último mês</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase mb-0">Produtos Visiveis</h5>
                          <h2 className="font-weight-bold mb-0">{dashboard.productsVisibles}</h2>
                        </div>
                      </div>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <FiArrowUp /> 3.48%
                        </span>
                        <span className="text-nowrap">Desde o último mês</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase mb-0">Pedidos</h5>
                          <h2 className="font-weight-bold mb-0">1</h2>
                        </div>
                      </div>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <FiArrowUp /> 100%
                        </span>
                        <span className="text-nowrap">Desde o último mês</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pd-t-60">
                <div className="col-xl-12 col-lg-12 mb-xl-0">
                  <div className="card">
                    <div className="card-header">
                      <div className="row align-items-center">
                        <div className="col">
                          <h3 className="mb-0">
                            Últimos Pedidos - <small>Feature não programada</small>
                          </h3>
                        </div>
                        <div className="col text-right">
                          <Link to="/admin/pedidos" className="btn btn-sm btn-primary">
                            Ver todos
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table align-items-center table-flush">
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Email</th>
                            <th scope="col">CEP</th>
                            <th scope="col">Telefone</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="table-row link-table" onClick={() => handlerOrder(6)}>
                            <th scope="row">6</th>
                            <th>Joaquina Santana</th>
                            <th>ramon-159@hotmail.com</th>
                            <th>08573-000</th>
                            <th>+55 (11) 98707-5393</th>
                          </tr>
                        </tbody>
                      </table>
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

export default Dashboard;
