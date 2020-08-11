import React from 'react';
import imgTemplate from '../../images_examples/stew.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function HomeProduct(props) {
  const data = props.data;
  return (
    <>
      <div className="col-xl-4 order-xl-2 pd-b-80">
        <div className="card card-profile">
          <div className="row mb-2 justify-content-center">
            <div className="col-lg-3 order-lg-2">
              <div className="card-profile-image">
                <Link to={`/produto/${data.id}`}>
                  <img className="p-4" src={`http://127.0.0.1:8000/uploads/images/store/${data.image}`} />
                </Link>
              </div>
            </div>
          </div>
          <div className="card-body pd-t-120">
            <div className="text-center">
              <h5 className="h3">{data.name}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeProduct;
