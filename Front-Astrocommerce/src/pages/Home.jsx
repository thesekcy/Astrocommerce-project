import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import HomeProduct from '../components/HomeProduct/HomeProduct';
import NavUser from '../components/NavUser/NavUser';

import loadingGif from '../assets/img/loading.gif';

function Home() {
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(true);

  let vfyProducts = false;

  useEffect(() => {
    function getProducts() {
      var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/products',
      };

      Axios(config)
        .then(function (response) {
          console.log(response.data);
          setProduct(response);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    }

    getProducts();
  }, []);

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
      <>
        <NavUser />
        <section className="homePage ">
          <div className="container pd-t-100">
            <div className="row text-center pd-t-40">
              <div className="col-md">
                <h1>
                  <strong> Veja algum de nossos produtos</strong>
                </h1>
              </div>
            </div>
            <div className="row pd-t-100 pd-b-40 justify-content-center">
              {product
                ? product.data.map((item, key) => {
                    if (item.status == 'approved') {
                      if (item.visibility == true) {
                        vfyProducts = true;
                        return <HomeProduct key={key} data={item} />;
                      }
                    }
                  })
                : ''}

              {!vfyProducts ? (
                <div className="col-md">
                  <h2 class="text-center">Não há produtos para ser mostrado.</h2>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </section>
        {/* <UserFooter/> */}
      </>
    );
  }
}

export default Home;
