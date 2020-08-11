import React from 'react';
import { FiHome, FiTag, FiUsers, FiList } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
// import { Container } from './styles';

function NavAdmin() {
  return (
    <div className="container h-100">
      <div className="row h-100">
        <div className="col-md">
          <NavLink to="/admin/dashboard">
            <h1 className="logo text-center text-white pd-t-20">Astrocommerce</h1>
          </NavLink>
          <hr />
          <ul>
            <li>
              <NavLink activeClassName="active" to="/admin/dashboard">
                <FiHome stroke-width="1.5" size="25" /> <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/admin/pedidos">
                <FiList stroke-width="1.5" size="25" /> <span>Pedidos</span>
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/admin/produtos">
                <FiTag stroke-width="1.5" size="25" /> <span>Produtos</span>
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/admin/usuarios">
                <FiUsers stroke-width="1.5" size="25" /> <span>Clientes</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavAdmin;
