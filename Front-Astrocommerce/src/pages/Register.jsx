import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import Nav from '../components/NavUser/NavUser';

import { FaFacebookF, FaRoad, FaMapMarkerAlt } from 'react-icons/fa';
import { FiUser, FiMail, FiLock, FiPhone, FiHome, FiMap } from 'react-icons/fi';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { MdLocationCity } from 'react-icons/md';
// import { Container } from './styles';

function initialValues() {
  return { email: '', name: '', password: '', password_confirmation: '', gender: 'masculine', phone: '', end: '', end_num: '', cep: '', district: '', city: '', state: '' };
}

function Register() {
  const [redirect, setRedirect] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [vfyEmail, setVfyEmail] = useState(true);
  const [vfyName, setVfyName] = useState(true);
  const [vfyPassword, setVfyPassword] = useState(true);
  const [vfyPasswordConfirmation, SetVfyPasswordConfirmation] = useState(true);
  const [vfyPhone, setVfyPhone] = useState(true);

  const [vfyEnd, setVfyEnd] = useState(true);
  const [vfyEndNum, setVfyEndNum] = useState(true);
  const [vfyDistrict, setVfyDistrict] = useState(true);
  const [vfyCity, setVfyCity] = useState(true);
  const [vfyState, setVfyState] = useState(true);
  const [vfyCep, setVfyCep] = useState(true);

  const [passwordText, setPasswordText] = useState(false);
  const [registerPhase, setRegisterPhase] = useState(1);

  const [states, setStates] = useState({});
  const [citys, setCitys] = useState('disabled');

  useEffect(() => {
    function getEstado() {
      Axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then((response) => {
          let resp = response;
          resp.data.sort((a, b) => (a.sigla > b.sigla ? 1 : -1));
          setStates(resp);
        })
        .catch((error) => {
          console.log('error ' + error);
        });
    }

    getEstado();
  }, []);

  function selectEstado(value) {
    let uf_city = value.target.value;

    Axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf_city}/distritos`)
      .then((response) => {
        let resp = response;
        resp.data.sort((a, b) => (a.nome > b.nome ? 1 : -1));
        setValues({ ...values, state: resp.data[0].municipio.microrregiao.mesorregiao.UF.nome });
        setCitys(resp);
      })
      .catch((error) => {
        console.log('error ' + error);
      });
  }

  function onChange(event) {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function registerNext() {
    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let verify = true;

    const { name, email, password, password_confirmation, gender, phone } = values;

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
      setVfyName(true);
    }

    if (password !== password_confirmation) {
      SetVfyPasswordConfirmation(false);
      verify = false;
    } else {
      SetVfyPasswordConfirmation(true);
    }

    if (password.length < 8) {
      setVfyPassword(false);
      SetVfyPasswordConfirmation(false);
      setPasswordText('Fraca');
      verify = false;
    } else {
      setPasswordText('Aceitavel');
      setVfyPassword(true);
      SetVfyPasswordConfirmation(true);
    }

    if (phone < 11) {
      setVfyPhone(false);
      verify = false;
    } else {
      setVfyPhone(true);
    }

    if (verify) {
      setRegisterPhase(2);
    }
  }

  function registerFinish() {
    const { name, email, password, password_confirmation, gender, phone, end, end_num, cep, district, state, city } = values;
    let verify = true;

    if (end.length < 4) {
      setVfyEnd(false);
      verify = false;
    } else {
      setVfyEnd(true);
    }

    if (end_num.length < 1) {
      setVfyEndNum(false);
      verify = false;
    } else {
      setVfyEndNum(true);
    }

    if (cep.length < 8) {
      setVfyCep(false);
      verify = false;
    } else {
      setVfyCep(true);
    }

    if (district.length < 3) {
      setVfyDistrict(false);
      verify = false;
    } else {
      setVfyDistrict(true);
    }

    if (city.length < 1) {
      setVfyCity(false);
      verify = false;
    } else {
      setVfyCity(true);
    }

    if (state.length < 3) {
      setVfyState(false);
      verify = false;
    } else {
      setVfyState(true);
    }

    if (verify) {
      sendRegister();
    }
  }

  function sendRegister() {
    const url = 'http://127.0.0.1:8000/api/users';

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('gender', values.gender);
    formData.append('phone', values.phone);
    formData.append('end', values.end);
    formData.append('end_num', values.end_num);
    formData.append('cep', values.cep);
    formData.append('district', values.district);
    formData.append('state', values.state);
    formData.append('city', values.city);

    Axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((response) => {
        console.log(response.data);
        if(response.data == true){
          setRedirect(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (redirect) {
    return <Redirect to={`/login`} />;
  } else {
    return (
      <section className="bg-default register-section">
        <div className="nav-dark-bg">
          <Nav />
        </div>
        <div className="header bg-gradient-primary py-7 py-lg-6">
          <div className="container">
            <div className="header-body text-center mb-7">
              <div className="row justify-content-center">
                <div className="col-lg-5 col-md-6">
                  <h1 className="text-white pd-t-40">Astrocommerce</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polygon className="fill-default" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </div>

        <div className="container mt--8 pb-5">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="card bg-secondary shadow border-0">
                {registerPhase == 1 ? (
                  <>
                    <div className="card-header bg-transparent pb-4">
                      <div className="text-muted text-center mt-2 mb-4">
                        <small>Em breve cadastre-se com</small>
                      </div>
                      <div className="text-center">
                        <a className="btn btn-neutral btn-icon mr-4 disabled">
                          <span className="btn-inner--icon">
                            <FaFacebookF color="#1874ec" size="20" />
                          </span>
                          <span className="btn-inner--text">Facebook</span>
                        </a>
                        <a className="btn btn-neutral btn-icon disabled">
                          <span className="btn-inner--icon">
                            <img src="https://api.astrocode.com.br/argon/img/icons/common/google.svg" />
                          </span>
                          <span className="btn-inner--text">Google</span>
                        </a>
                      </div>
                    </div>
                    <div className="card-body px-lg-5 py-lg-4">
                      <div className="form-group">
                        <div className="input-group input-group-alternative mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <FiUser />
                            </span>
                          </div>
                          <input
                            autoComplete="nope"
                            class={vfyName ? 'form-control' : 'is-invalid form-control'}
                            placeholder="Nome"
                            value={values.name}
                            type="text"
                            name="name"
                            onChange={onChange}
                            autofocus=""
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group input-group-alternative mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <FiMail />
                            </span>
                          </div>
                          <input
                            autoComplete="nope"
                            class={vfyEmail ? 'form-control' : 'is-invalid form-control'}
                            value={values.email}
                            placeholder="Email"
                            type="email"
                            name="email"
                            onChange={onChange}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group input-group-alternative">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <FiLock />
                            </span>
                          </div>
                          <input
                            autoComplete="nope"
                            class={vfyPassword ? 'form-control' : 'is-invalid form-control'}
                            value={values.password}
                            placeholder="Senha"
                            type="password"
                            name="password"
                            onChange={onChange}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group input-group-alternative">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <FiLock />
                            </span>
                          </div>
                          <input
                            autoComplete="nope"
                            value={values.password_confirmation}
                            class={vfyPasswordConfirmation ? 'form-control' : 'is-invalid form-control'}
                            placeholder="Confirmação de senha"
                            type="password"
                            name="password_confirmation"
                            onChange={onChange}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-group input-group-alternative">
                          <div className="input-group-prepend ">
                            <span className="input-group-text">
                              <FiPhone />
                            </span>
                          </div>
                          <input
                            autoComplete="nope"
                            class={vfyPhone ? 'form-control' : 'is-invalid form-control'}
                            value={values.phone}
                            placeholder="+55 (11) 00000-0000"
                            type="text"
                            name="phone"
                            onChange={onChange}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <p className="mb-0 text-muted font-weight-500">Sexo:</p>
                        <div className="custom-control custom-radio custom-control-inline">
                          <input autoComplete="nope" type="radio" id="customRadioInline1" value="masculine" name="gender" className="custom-control-input" defaultChecked onChange={onChange} />
                          <label className="custom-control-label" for="customRadioInline1">
                            Masculino
                          </label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                          <input autoComplete="nope" type="radio" id="customRadioInline2" value="feminine" name="gender" className="custom-control-input" onChange={onChange} />
                          <label className="custom-control-label" for="customRadioInline2">
                            Feminino
                          </label>
                        </div>
                      </div>

                      {passwordText != false ? (
                        <div className="text-muted font-italic">
                          <small>
                            Força da senha:{' '}
                            {passwordText == 'Aceitavel' ? <span className="text-success font-weight-700">{passwordText}</span> : <span className="text-warning font-weight-700">{passwordText}</span>}
                          </small>
                        </div>
                      ) : (
                        ''
                      )}

                      <div className="text-center">
                        <button onClick={() => registerNext()} className="btn btn-primary mt-4">
                          Avançar
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="card-header bg-transparent pb-4">
                      <div className="text-muted text-center mt-2 mb-2">
                        <h2>Informações de entrega</h2>
                      </div>
                    </div>
                    <div className="card-body px-lg-5 py-lg-4">
                      <div className="form-group">
                        <div className="input-group input-group-alternative mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <FiHome />
                            </span>
                          </div>
                          <input
                            autoComplete="nope"
                            class={vfyEnd ? 'form-control' : 'is-invalid form-control'}
                            placeholder="Endereço"
                            type="text"
                            name="end"
                            onChange={onChange}
                            value={values.end}
                            autofocus=""
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <div className="input-group input-group-alternative mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <AiOutlineFieldNumber />
                                </span>
                              </div>
                              <input
                                autoComplete="nope"
                                class={vfyEndNum ? 'form-control' : 'is-invalid form-control'}
                                value={values.end_num}
                                placeholder="Numero"
                                type="text"
                                name="end_num"
                                onChange={onChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="form-group">
                            <div className="input-group input-group-alternative">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <FaMapMarkerAlt />
                                </span>
                              </div>
                              <input autoComplete="nope" class={vfyCep ? 'form-control' : 'is-invalid form-control'} placeholder="CEP" value={values.cep} type="text" name="cep" onChange={onChange} />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-group input-group-alternative">
                          <div className="input-group-prepend ">
                            <span className="input-group-text">
                              <FaRoad />
                            </span>
                          </div>
                          <input
                            autoComplete="nope"
                            class={vfyDistrict ? 'form-control' : 'is-invalid form-control'}
                            placeholder="Bairro"
                            type="text"
                            value={values.district}
                            name="district"
                            onChange={onChange}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-group input-group-alternative">
                          <div className="input-group-prepend ">
                            <span className="input-group-text">
                              <FiMap />
                            </span>
                          </div>
                          <select class={vfyState ? 'form-control' : 'is-invalid form-control'} placeholder="Estado" type="text" name="state" onChange={(value) => selectEstado(value)}>
                            <option value="teste">Selecione um estado</option>
                            {states.data
                              ? states.data.map((value) => {
                                  return <option value={value.sigla}>{value.nome}</option>;
                                })
                              : ''}
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-group input-group-alternative">
                          <div className="input-group-prepend ">
                            <span className="input-group-text">
                              <MdLocationCity />
                            </span>
                          </div>
                          <select
                            class={vfyCity ? 'form-control' : 'is-invalid form-control'}
                            placeholder="Cidade"
                            type="text"
                            name="city"
                            disabled={citys == 'disabled' ? true : false}
                            onChange={onChange}
                          >
                            <option>Selecione uma cidade</option>
                            {citys.data
                              ? citys.data.map((value) => {
                                  return <option value={value.nome}>{value.nome}</option>;
                                })
                              : ''}
                          </select>
                        </div>
                      </div>

                      <div>
                        <button onClick={() => setRegisterPhase(1)} className="btn btn-primary mt-4">
                          Voltar
                        </button>
                        <button onClick={() => registerFinish()} className="btn btn-primary mt-4 float-right">
                          Cadastrar
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Register;
