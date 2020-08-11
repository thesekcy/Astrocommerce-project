import React, { useState, useEffect, useContext } from 'react';

import Axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

import { Context } from '../../../context/authContext';

import NavAdmin from '../../../components/Admin/NavAdmin/NavAdmin';
import NavBarAdmin from '../../../components/Admin/NavBarAdmin/NavBarAdmin';

function UserList() {
  const { user } = useContext(Context);

  const [redirect, setRedirect] = useState(false);
  const [redirectId, setRedirectId] = useState('');
  const [users, setUsers] = useState('');

  useEffect(() => {
    function getUsers() {
      const token = localStorage.getItem('token');

      var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/api/users',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      Axios(config)
        .then(function (response) {
          console.log(response.data);
          setUsers(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    getUsers();
  }, []);

  function handlerUser(id) {
    setRedirectId(id);
    setRedirect(true);
  }

  if (redirect) {
    return <Redirect to={`/admin/usuarios/${redirectId}`} />;
  } else {
    return (
      <div className="container-admin d-flex">
        <div className="menu-container">
          <NavAdmin />
        </div>
        <div className="content-container w-100">
          <NavBarAdmin pageRef="Usuários" />
          <div className="container pd-b-40 col-md-11">
            <div className="row pd-t-40">
              <div className="col-md text-right">
                {user ? (
                  user.type === 'admin' ? (
                    <Link to="/admin/usuarios/novo" className="btn btn-default">
                      Novo Administrator | Editor
                    </Link>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="row pd-t-20">
              <div className="col-xl-12 col-lg-12 mb-xl-0">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Administradores</h3>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-items-center table-flush">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Nome</th>
                          <th scope="col">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users
                          ? users.data.map((item, key) => {
                              return item.type === 'admin' ? (
                                <tr className="table-row link-table" key={key} onClick={() => handlerUser(item.id)}>
                                  <th scope="row">{item.name}</th>
                                  <th>{item.email}</th>
                                </tr>
                              ) : (
                                ''
                              );
                            })
                          : ''}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="row pd-t-40">
              <div className="col-xl-12 col-lg-12 mb-xl-0">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Editores</h3>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-items-center table-flush">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Nome</th>
                          <th scope="col">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users
                          ? users.data.map((item, key) => {
                              return item.type === 'editor' ? (
                                <tr className="table-row link-table" key={key} onClick={() => handlerUser(item.id)}>
                                  <th scope="row">{item.name}</th>
                                  <th>{item.email}</th>
                                </tr>
                              ) : (
                                ''
                              );
                            })
                          : ''}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="row pd-t-40">
              <div className="col-xl-12 col-lg-12 mb-xl-0">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Todos os usuários</h3>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-items-center table-flush">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Nome</th>
                          <th scope="col">Email</th>
                          <th scope="col">Telefone</th>
                          <th scope="col">CEP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users
                          ? users.data.map((item, key) => {
                              return item.type === 'user' ? (
                                <tr className="table-row link-table" key={key} onClick={() => handlerUser(item.id)}>
                                  <th scope="row">{item.name}</th>
                                  <th>{item.email}</th>
                                  <th>{item.phone}</th>
                                  <th>{item.cep}</th>
                                </tr>
                              ) : (
                                ''
                              );
                            })
                          : ''}
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

export default UserList;
