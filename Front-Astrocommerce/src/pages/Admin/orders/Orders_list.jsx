import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import NavAdmin from '../../../components/Admin/NavAdmin/NavAdmin';
import NavBarAdmin from '../../../components/Admin/NavBarAdmin/NavBarAdmin';

function OrdersList() {
  const [redirect, setRedirect] = useState(false);
  const [redirectId, setRedirectId] = useState('');

  function handlerOrder(id) {
    setRedirectId(id);
    setRedirect(true);
  }

  if (redirect) {
    return <Redirect to={`/admin/pedidos/${redirectId}`} />;
  } else {
    return (
      <div className="container-admin d-flex">
        <div className="menu-container">
          <NavAdmin />
        </div>
        <div className="content-container w-100">
          <NavBarAdmin pageRef="Pedidos" />
          <div className="container pd-b-40 col-md-11">
            <div className="row pd-t-60">
              <div className="col-xl-12 col-lg-12 mb-xl-0">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Todos os Pedidos</h3>
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
    );
  }
}

export default OrdersList;
