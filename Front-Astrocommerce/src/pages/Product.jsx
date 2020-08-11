import React, { useEffect, useState } from "react";
import Axios from "axios";
import NavUser from "../components/NavUser/NavUser";

import ReactHtmlParser from "react-html-parser";

import { BsArrowLeft } from "react-icons/bs";
import loadingGif from "../assets/img/loading.gif";

import history from "../history";

function Home({ match }) {
  const [productId, setProductId] = useState(match.params.id);

  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function getProduct() {
      const token = localStorage.getItem("token");
      const url = "http://127.0.0.1:8000/api/products/show";

      const formData = new FormData();
      formData.append("id", productId);

      Axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response.data[0]);
          let data = response.data[0];

          setProduct(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }

    getProduct();
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
          <div className="container pd-t-80">
            <div className="row pd-t-20">
              <div className="col-md">
                <button
                  className="btn-back d-flex align-items-center"
                  onClick={() => history.push("/")}
                >
                  <BsArrowLeft /> <small className="pl-3">Página Inicial</small>
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="row pd-t-10">
                  <div className="col-xl-12 col-lg-12 mb-xl-0">
                    <div className="card">
                      <div className="card-body">
                        <div className="row pd-b-20">
                          <div className="col-md">
                            <div className="media product-card">
                              <img
                                className="p-4 w-25"
                                src={`http://127.0.0.1:8000/uploads/images/store/${product.image}`}
                              />
                              <div className="media-body pl-5">
                                <h2 className="title-product">
                                  {product.name}
                                </h2>
                                <h3>Descrição:</h3>
                                <hr />
                                <div>
                                  {ReactHtmlParser(product.description)}{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <UserFooter/> */}
      </>
    );
  }
}

export default Home;
