import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Context } from '../../../context/authContext';
import { BsArrowLeft } from 'react-icons/bs';
import { FiLock, FiUnlock } from 'react-icons/fi';

import NavAdmin from '../../../components/Admin/NavAdmin/NavAdmin';
import NavBarAdmin from '../../../components/Admin/NavBarAdmin/NavBarAdmin';
import history from '../../../history';

function UserNew({ match }) {
  const [visibility, setVisibility] = useState(true);
  const ordermID = match.params.id;
  const { userId } = useContext(Context);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [type, setType] = useState('');
  const [access, setAccess] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const [vfyName, setVfyName] = useState(true);
  const [vfyEmail, setVfyEmail] = useState(true);
  const [vfyPassword, setVfyPassword] = useState(true);
  const [vfyPassword_check, setVfyPassword_check] = useState(true);
  const [vfyType, setVfyType] = useState(true);

  const [passwordText, setPasswordText] = useState(false);

  function createUser() {
    let verify = true;
    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

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

    const passValidation = regPass.test(password);
    if (!passValidation) {
      setVfyPassword(false);
      setPasswordText('Senha deve conter Mínimo de oito caracteres, pelo menos uma letra, um número e um caractere especial.');
      verify = false;
    } else {
      setVfyPassword(true);
      setPasswordText('');
    }

    // if (password.length < 8) {
    //   setVfyPassword(false);
    //   setVfyPassword_check(false);
    //   verify = false;
    // } else {
    //   setVfyPassword(true);
    //   setVfyPassword_check(true);
    // }

    if (password !== passwordCheck) {
      setVfyPassword_check(false);
      verify = false;
    } else {
      setVfyPassword_check(true);
    }

    if (type == 'Selecione uma opção' || type == '') {
      setVfyType(false);
      verify = false;
    } else {
      setVfyType(true);
    }

    if (verify) {
      const token = localStorage.getItem('token');
      const url = 'http://127.0.0.1:8000/api/users';
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('type', type);
      formData.append('access', access);
      formData.append('gender', 'masculine');

      Axios.post(url, formData, {
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
    return (
      <div className="container-admin d-flex order-product-style">
        <div className="menu-container">
          <NavAdmin />
        </div>
        <div className="content-container w-100">
          <NavBarAdmin pageRef={`Produto #${ordermID}`} />
          <div className="container pd-t-40 pd-b-40 col-md-11">
            <div className="row">
              <div className="col-md">
                <button className="btn-back d-flex align-items-center" onClick={() => history.push('/admin/Usuarios')}>
                  <BsArrowLeft stroke-width="0.5" /> <small className="pl-3">Usuarios</small>
                </button>
              </div>
              <div className="col-md-auto ml-auto">
                <button className="btn btn-default float-right" onClick={createUser} type="button">
                  Criar
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
                                  autoComplete="no"
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
                                />
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group mb-0">
                                    <label for="exampleFormControlInput1">Senha</label>
                                    <input
                                      type="password"
                                      class={vfyPassword ? 'form-control' : 'is-invalid form-control'}
                                      onChange={(event) => setPassword(event.target.value)}
                                      placeholder="****************"
                                      autoComplete="no"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group mb-0">
                                    <label for="exampleFormControlInput1">Confirmação de senha</label>
                                    <input
                                      type="password"
                                      class={vfyPassword_check ? 'form-control' : 'is-invalid form-control'}
                                      onChange={(event) => setPasswordCheck(event.target.value)}
                                      placeholder="****************"
                                      autoComplete="no"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <small className="text-warning">{passwordText}</small>
                                </div>
                              </div>
                              <div className="form-group pd-t-20">
                                <label for="exampleFormControlInput1">Tipo de usuário</label>
                                <select type="text" class={vfyType ? 'form-control' : 'is-invalid form-control'} onChange={(event) => setType(event.target.value)}>
                                  <option>Selecione uma opção</option>
                                  <option value="admin">Administrador</option>
                                  <option value="editor">Editor</option>
                                </select>
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
                                  <input type="checkbox" checked={access ? 'checked' : ''} onChange={() => setAccess(!access)} />
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

export default UserNew;
