import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import { Redirect } from 'react-router-dom';

import moment from 'moment';
import 'moment/locale/pt-br';

import { Context } from '../../../context/authContext';

import { BsArrowLeft } from 'react-icons/bs';
import { FiCalendar } from 'react-icons/fi';
import { BsEyeSlash, BsEye } from 'react-icons/bs';

import loadingGif from '../../../assets/img/loading.gif';

import NavAdmin from '../../../components/Admin/NavAdmin/NavAdmin';
import NavBarAdmin from '../../../components/Admin/NavBarAdmin/NavBarAdmin';
import history from '../../../history';

function ProductPage({ match }) {
  const { user } = useContext(Context);

  const [visibility, setVisibility] = useState(true);
  const [produto, setProduto] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState('');
  const [vfyImage, setVfyImage] = useState(false);
  const [dtCriacao, setDtCriacao] = useState('');
  const ordermID = match.params.id;
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);

  moment.locale('pt-br');

  useEffect(() => {
    function getProduct() {
      const token = localStorage.getItem('token');
      const url = 'http://127.0.0.1:8000/api/products/show';

      const formData = new FormData();
      formData.append('id', ordermID);

      Axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } })
        .then((response) => {
          console.log(response.data[0]);
          let data = response.data[0];

          setProduto(data);
          setVisibility(data.visibility);
          setTitle(data.name);
          setDescription(data.description);
          setStatus(data.status);
          setDtCriacao(moment(data.created_at).format('LLL'));
          setImage(`http://127.0.0.1:8000/uploads/images/store/${data.image}`);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }

    getProduct();
  }, []);

  function getImage(event) {
    setVfyImage(true);
    setImage(event.target.files[0]);
  }

  function handleEditorChange(content, editor) {
    setDescription(content);
  }

  function saveProduct() {
    const token = localStorage.getItem('token');
    const url = 'http://127.0.0.1:8000/api/products/update';

    const saveData = new FormData();
    saveData.append('id', produto.id);
    saveData.append('name', title);
    saveData.append('visibility', visibility);
    saveData.append('description', description);
    if (user.type == 'editor') {
      saveData.append('status', 'pending');
    } else {
      saveData.append('status', status);
    }

    if (vfyImage) {
      saveData.append('image', image);
    }
    saveData.append('_method', 'put');

    Axios.post(url, saveData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response.data);
        if (response.data == true) {
          setRedirect(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (redirect) {
    return <Redirect to="/admin/produtos" />;
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
            <NavBarAdmin pageRef={`Produto #${ordermID}`} />
            <div className="container pd-t-40 pd-b-40 col-md-11">
              <div className="row">
                <div className="col-md">
                  <button className="btn-back d-flex align-items-center" onClick={() => history.push('/admin/produtos')}>
                    <BsArrowLeft stroke-width="0.5" /> <small className="pl-3">Produtos</small>
                  </button>
                </div>
              </div>
              <div className="row pd-t-20">
                <div className="col-md-auto">
                  <div className="d-flex align-items-center">
                    <span className="order-title mb-0 mr-3">
                      <span className="order-number">{produto ? produto.name : ''}</span>
                    </span>
                    {status == 'pending' ? <badge className="badge badge-warning mr-1 ml-1">Pendente</badge> : ''}
                    {status == 'waiting' ? <badge className="badge badge-warning mr-1 ml-1">Em Analise</badge> : ''}
                    {status == 'approved' ? <badge className="badge badge-success mr-1 ml-1">Aprovado</badge> : ''}
                    {status == 'disapproved' ? <badge className="badge badge-danger mr-1 ml-1">Reprovado</badge> : ''}
                    <div className="span ml-4 border-left d-flex">
                      <FiCalendar stroke-width="1.8" color="#96A9C8" size="22" className="ml-4 mr-2" /> {dtCriacao}
                    </div>
                  </div>
                </div>
                <div className="col-md-auto ml-auto">
                  <button className="btn btn-default float-right ml-2" onClick={saveProduct} type="button">
                    Atualizar
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
                                  <span className="title">Informações gerais</span>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md">
                                <div className="form-group">
                                  <label for="exampleFormControlInput1">Nome do produto</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    id="exampleFormControlInput1"
                                    placeholder="name@example.com"
                                  />
                                </div>
                                <div className="form-group">
                                  <label for="exampleFormControlInput1">Descrição do produto</label>
                                  <Editor
                                    initialValue={description}
                                    value={description}
                                    init={{
                                      height: 500,
                                      menubar: false,
                                      plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount',
                                      ],
                                      toolbar:
                                        'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help',
                                    }}
                                    onEditorChange={(content, editor) => handleEditorChange(content, editor)}
                                  />
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
                                  <span className="title">Visibilidade</span>
                                </div>
                                <p>
                                  <small>Seu público pode ver este produto?</small>
                                </p>
                              </div>
                            </div>
                            <div className="row align-items-center">
                              <div className="col-md">
                                <div className={visibility ? 'visibilidade d-flex align-items-center' : 'visibilidade d-flex align-items-center not-visible'}>
                                  <div className="icon-box">{visibility ? <BsEye color={'white'} size="25" /> : <BsEyeSlash color={'white'} size="25" />}</div>
                                  <h3 className="mb-0 pl-3">{visibility ? 'Visivel' : 'Não Visivel'}</h3>
                                  <label className="custom-toggle ml-auto mb-0">
                                    <input type="checkbox" checked={visibility ? 'checked' : ''} onChange={() => setVisibility(!visibility)} />
                                    <span className="custom-toggle-slider rounded-circle" />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {user ? (
                      user.type == 'editor' ? (
                        ''
                      ) : (
                        <div className="row pd-t-20">
                          <div className="col-md">
                            {status === 'approved' ? (
                              ''
                            ) : (
                              <button className="btn btn-success w-100 mb-3" onClick={() => setStatus('approved')} type="button">
                                Aprovar
                              </button>
                            )}
                            {status === 'disapproved' ? (
                              ''
                            ) : (
                              <button className="btn btn-danger w-100" onClick={() => setStatus('disapproved')} type="button">
                                Reprovar
                              </button>
                            )}
                          </div>
                        </div>
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
      );
    }
  }
}

export default ProductPage;
