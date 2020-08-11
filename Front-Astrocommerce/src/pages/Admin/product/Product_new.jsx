import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { Context } from '../../../context/authContext';
import { BsArrowLeft } from 'react-icons/bs';
import { BsEyeSlash, BsEye } from 'react-icons/bs';

import imgTemplate from '../../../assets/img/scan.svg';

import NavAdmin from '../../../components/Admin/NavAdmin/NavAdmin';
import NavBarAdmin from '../../../components/Admin/NavBarAdmin/NavBarAdmin';
import history from '../../../history';

function ProductPage({ match }) {
  const [visibility, setVisibility] = useState(true);
  const ordermID = match.params.id;
  const { userId } = useContext(Context);

  // const [imagePreview, setImagePreview] = useState('');
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [redirect, setRedirect] = useState(false);

  const [vfyImg, setVfyImg] = useState(true);
  const [vfyName, setVfyName] = useState(true);

  function handleEditorChange(content, editor) {
    setDescription(content);
  }

  function getImage(event) {
    setImage(event.target.files[0]);
  }

  function sendProduct() {
    let verify = true;

    if (!image) {
      setVfyImg(false);
      verify = false;
    } else {
      setVfyImg(true);
    }

    if (title.length < 2) {
      setVfyName(false);
      verify = false;
    } else {
      setVfyName(true);
    }

    console.log('User id: ', userId);
    if (verify) {
      const token = localStorage.getItem('token');
      const url = 'http://127.0.0.1:8000/api/products/new';
      const formData = new FormData();
      formData.append('name', title);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('created_by', userId);
      formData.append('visibility', visibility);

      console.log(image);

      Axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
    return <Redirect to="/admin/produtos" />;
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
              <div className="col-md-auto ml-auto">
                <button className="btn btn-default float-right" onClick={sendProduct} type="button">
                  Publicar
                </button>
              </div>
            </div>
            <div className="container col-md-12 pr-0 pl-0">
              <div className="row">
                <div className="col-lg-8 col-md-12">
                  <div className="row pd-t-10">
                    <div className="col-xl-12 col-lg-12 mb-xl-0">
                      <div className={vfyImg ? 'card' : 'card-error card'}>
                        <div className="card-body">
                          <div className="row align-items-center">
                            <div className="col-md-auto">
                              <div className="media product-card">
                                {image ? (
                                  <img className="mr-3" className="img-fluid img-product" src={URL.createObjectURL(image)} alt="Generic placeholder image" />
                                ) : (
                                  <img className="mr-3" className="img-fluid img-product" src={imgTemplate} alt="Generic placeholder image" />
                                )}
                                <div className="media-body pl-5 align-self-center">
                                  <input type="file" name="file" onChange={(event) => getImage(event)} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

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
                                  class={vfyName ? 'form-control' : 'is-invalid form-control'}
                                  onChange={(event) => setTitle(event.target.value)}
                                  id="exampleFormControlInput1"
                                  placeholder="Titulo do produto"
                                />
                              </div>
                              <div className="form-group">
                                <label for="exampleFormControlInput1">Descrição do produto</label>
                                <Editor
                                  initialValue=""
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;
