import React, { useState, useContext } from 'react';
import Nav from '../components/NavUser/NavUser';

import { Context } from '../context/authContext';

function initialState() {
  return { email: '', password: '' };
}

const Login = () => {
  const [values, setValues] = useState(initialState);
  const { authenticated, handleLogin } = useContext(Context);

  function onChange(event) {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  return (
    <>
      <div className="navbar__nofixed">
        <Nav />
      </div>
      <section className="container__login">
        <div className="container col-md-12 max__width h-100">
          <div className="row justify-content-center h-100 align-content-center">
            <div className="col-lg-4 col-lg-4 col-10 col-sm-8 col-md-6">
              <h3>Faça Login</h3>
              <p className="text-center">Sejá bem vindo a Astrocommerce.</p>
              <div className="form-group">
                <input type="text" className="w-100" placeholder="Login" name="email" onChange={onChange} value={values.email} />
              </div>
              <div className="form-group">
                <input type="password" className="w-100" placeholder="Senha" name="password" onChange={onChange} value={values.senha} />
              </div>
              <div className="row text-center">
                <div className="col-md-12">
                  <button className="text-center" onClick={() => handleLogin(values)}>
                    Entrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
