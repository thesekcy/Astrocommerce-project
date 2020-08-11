import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { slide as Menu } from 'react-burger-menu';
import { Context } from '../../context/authContext';

import { FiMenu } from 'react-icons/fi';

import { BsArrowRight } from 'react-icons/bs';

export default function NavUser() {
  const [MenuOpen, setMenuOpen] = useState(false);
  const { height, width } = useWindowDimensions();
  const [scrollled, setScrollled] = useState(false);
  const [userName, setUserName] = useState('');

  const { authenticated, user } = useContext(Context);

  function handleOnClose() {
    setMenuOpen(false);
  }

  function HandleMenuOpen() {
    setMenuOpen(true);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 1) {
        setScrollled(true);
      } else {
        setScrollled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav>
      <div className="container col-md-12">
        <div className="row">
          <div className={scrollled ? 'navbar on_scroll' : 'navbar'}>
            <Link to="/" className="logo">
              Astrocommerce
            </Link>
            <div className="navbar-right">
              {width <= 992 ? (
                <a onClick={HandleMenuOpen}>
                  <FiMenu size="25" />
                </a>
              ) : authenticated ? (
                <Link to="/perfil">
                  <strong>{user ? user.name : 'Minha Conta'}</strong>
                </Link>
              ) : (
                <>
                  <Link to="/cadastro" className="button-cadastro">
                    Cadastre-se
                  </Link>
                  <Link to="/login">Entrar</Link>
                </>
              )}
            </div>
          </div>
        </div>
        <Menu right isOpen={MenuOpen} onClose={handleOnClose}>
          <h4>
            <Link to="/">Astrocommerce</Link>
          </h4>
          <ul>
            <Link className="button-cadastro" to="/cadastro">
              <li>
                Cadastre-se
                <BsArrowRight color="#7E33AC" size={35} className="arrow" />
              </li>
            </Link>
            <Link to="/login">
              <li>
                Entrar
                <BsArrowRight color="#7E33AC" size={35} className="arrow" />
              </li>
            </Link>
          </ul>
        </Menu>
      </div>
    </nav>
  );

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
  }
}
