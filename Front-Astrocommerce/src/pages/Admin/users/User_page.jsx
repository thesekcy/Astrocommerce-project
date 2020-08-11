import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { FiLock, FiUnlock } from 'react-icons/fi';

import { Context } from '../../../context/authContext';

import NavAdmin from '../../../components/Admin/NavAdmin/NavAdmin';
import NavBarAdmin from '../../../components/Admin/NavBarAdmin/NavBarAdmin';

import loadingGif from '../../../assets/img/loading.gif';

import history from '../../../history';

function UserPage({ match }) {
  const [visibility, setVisibility] = useState(true);
  const UserID = match.params.id;

  const { user } = useContext(Context);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [access, setAccess] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(true);

  const [vfyName, setVfyName] = useState(true);
  const [vfyEmail, setVfyEmail] = useState(true);
  const [vfyType, setVfyType] = useState(true);

  const [passwordText, setPasswordText] = useState(false);

  useEffect(() => {
    function getUser() {
      const token = localStorage.getItem('token');
      const url = 'http://127.0.0.1:8000/api/users/show';

      const formData = new FormData();
      formData.append('id', UserID);

      Axios.post(url, formData, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          console.log('usuário: ', response.data[0]);
          let data = response.data[0];
          setUserData(data);
          setAccess(data.access);
          setName(data.name);
          setEmail(data.email);
          setType(data.type);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }

    getUser();
  }, []);

  function updateUser() {
    let verify = true;
    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (name.length < 4) {
      setVfyName(false);
      verify = false;
    } else {
      setVfyName(true);
    }

    const mailValidation = regEmail.test(email);
    if (!mailValidation) {
      setVfyEmail(false);
      verify = false;
    } else {
      setVfyEmail(true);
    }

    if (type == 'Selecione uma opção' || type == '') {
      setVfyType(false);
      verify = false;
    } else {
      setVfyType(true);
    }

    if (verify) {
      const token = localStorage.getItem('token');
      const url = 'http://127.0.0.1:8000/api/users/update';
      const updateData = new FormData();
      if (type == 'user') {
        updateData.append('access', access);
      } else {
        updateData.append('id', UserID);
        updateData.append('name', name);
        updateData.append('email', email);
        updateData.append('type', type);
        updateData.append('access', access);
        updateData.append('gender', 'masculine');
      }

      updateData.append('_method', 'put');

      Axios.post(url, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(function (response) {
          console.log(response.data);
          if (response.data == true) {
            setRedirect(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  if (redirect) {
    return <Redirect to="/admin/usuarios" />;
  } else {
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
        <div className="container-admin d-flex order-product-style">
          <div className="menu-container">
            <NavAdmin />
          </div>
          <div className="content-container w-100">
            <NavBarAdmin pageRef={`Usuário: ${name}`} />
            <div className="container pd-t-40 pd-b-40 col-md-11">
              <div className="row">
                <div className="col-md">
                  <button className="btn-back d-flex align-items-center" onClick={() => history.push('/admin/Usuarios')}>
                    <BsArrowLeft stroke-width="0.5" /> <small className="pl-3">Usuarios</small>
                  </button>
                </div>
                {user.type ? (
                  user.type != 'admin' ? (
                    ''
                  ) : (
                    <div className="col-md-auto ml-auto">
                      <button className="btn btn-default float-right" onClick={updateUser} type="button">
                        Atualizar usuário
                      </button>
                    </div>
                  )
                ) : (
                  ''
                )}
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
                                  <span className="title">Informações de usuário</span>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md">
                                <div className="form-group">
                                  <label for="exampleFormControlInput1">Nome</label>
                                  <input
                                    type="text"
                                    class={vfyName ? 'form-control' : 'is-invalid form-control'}
                                    onChange={(event) => setName(event.target.value)}
                                    placeholder="Nome"
                                    value={name}
                                    autoComplete="no"
                                    readOnly={user.type == 'admin' ? (type == 'user' ? true : false) : true}
                                  />
                                </div>
                                <div className="form-group">
                                  <label for="exampleFormControlInput1">Email</label>
                                  <input
                                    type="email"
                                    class={vfyEmail ? 'form-control' : 'is-invalid form-control'}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="Email"
                                    autoComplete="no"
                                    value={email}
                                    readOnly={user.type == 'admin' ? (type == 'user' ? true : false) : true}
                                  />
                                </div>

                                {type == 'user' ? (
                                  ''
                                ) : (
                                  <div className="form-group">
                                    <label for="exampleFormControlInput1">Tipo de usuário</label>
                                    <select
                                      type="text"
                                      class={vfyType ? 'form-control' : 'is-invalid form-control'}
                                      disabled={user.type == 'admin' ? (type == 'user' ? true : false) : true}
                                      onChange={(event) => setType(event.target.value)}
                                    >
                                      <option>Selecione uma opção</option>
                                      <option value="admin" selected={type == 'admin' ? true : false}>
                                        Administrador
                                      </option>
                                      <option value="editor" selected={type == 'editor' ? true : false}>
                                        Editor
                                      </option>
                                    </select>
                                  </div>
                                )}

                                {type ? (
                                  type == 'user' ? (
                                    <>
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label for="exampleFormControlInput1">Telefone</label>
                                            <input type="text" class={'form-control'} autoComplete="no" value={userData.phone} readOnly={true} />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label for="exampleFormControlInput1">CEP</label>
                                            <input type="text" class={'form-control'} autoComplete="no" value={userData.cep} readOnly={true} />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="form-group">
                                        <label for="exampleFormControlInput1">Rua</label>
                                        <input type="text" class={'form-control'} autoComplete="no" value={userData.end} readOnly={true} />
                                      </div>

                                      <div className="row">
                                        <div className="col-md-4">
                                          <div className="form-group">
                                            <label for="exampleFormControlInput1">Nº</label>
                                            <input type="text" class={'form-control'} autoComplete="no" value={userData.end_num} readOnly={true} />
                                          </div>
                                        </div>
                                        <div className="col-md-8">
                                          <div className="form-group">
                                            <label for="exampleFormControlInput1">Bairro</label>
                                            <input type="text" class={'form-control'} autoComplete="no" value={userData.district} readOnly={true} />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label for="exampleFormControlInput1">Cidade</label>
                                            <input type="text" class={'form-control'} autoComplete="no" value={userData.city} readOnly={true} />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label for="exampleFormControlInput1">Estado</label>
                                            <input type="text" class={'form-control'} autoComplete="no" value={userData.state} readOnly={true} />
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    ''
                                  )
                                ) : (
                                  ''
                                )}
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
                                  <span className="title">Acesso</span>
                                </div>
                                <p>
                                  <small>O usuário tem permisão para acessar a conta?</small>
                                </p>
                              </div>
                            </div>
                            <div className="row align-items-center">
                              <div className="col-md">
                                <div className={access ? 'visibilidade d-flex align-items-center' : 'visibilidade d-flex align-items-center not-visible'}>
                                  <div className="icon-box">{access ? <FiUnlock color={'white'} size="25" /> : <FiLock color={'white'} size="25" />}</div>
                                  <h3 className="mb-0 pl-3">{access ? 'Liberado' : 'Negado'}</h3>
                                  <label className="custom-toggle ml-auto mb-0">
                                    <input type="checkbox" checked={access ? 'checked' : ''} disabled={user.type == 'admin' ? (type == 'user' ? true : false) : true} onChange={() => setAccess(!access)} />
                                    <span className="custom-toggle-slider rounded-circle" />
                                  </label>
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
        </div>
      );
    }
  }
}

export default UserPage;
