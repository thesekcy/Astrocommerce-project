import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";

import NavAdmin from "../../../components/Admin/NavAdmin/NavAdmin";
import NavBarAdmin from "../../../components/Admin/NavBarAdmin/NavBarAdmin";

function ProductList() {
  const [redirect, setRedirect] = useState(false);
  const [redirectId, setRedirectId] = useState("");
  const [products, setProduct] = useState("");
  const [directProducts, setDirectProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    function getProducts() {
      const token = localStorage.getItem("token");

      var config = {
        method: "post",
        url: "http://127.0.0.1:8000/api/products",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      Axios(config)
        .then(function (response) {
          console.log(response.data);
          setProduct(response);
          setDirectProducts(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    getProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      directProducts.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, directProducts]);

  console.log("filteredProducts :", filteredProducts);

  function handlerProduct(id) {
    setRedirectId(id);
    setRedirect(true);
  }

  const ProductDetail = (props) => {
    const { dt, key } = props;
    console.log("ITEM: ", dt);
    return (
      <tr
        className="table-row link-table"
        key={key}
        onClick={() => handlerProduct(dt.id)}
      >
        <th scope="row">{dt.id}</th>
        <th>{dt.name}</th>
        <th>
          {dt.status === "pending" ? (
            <badge className="badge badge-warning mr-1 ml-1">Pendente</badge>
          ) : (
            ""
          )}
          {dt.status === "waiting" ? (
            <badge className="badge badge-warning mr-1 ml-1">Em Analise</badge>
          ) : (
            ""
          )}
          {dt.status === "approved" ? (
            <badge className="badge badge-success mr-1 ml-1">Aprovado</badge>
          ) : (
            ""
          )}
          {dt.status === "disapproved" ? (
            <badge className="badge badge-danger mr-1 ml-1">Reprovado</badge>
          ) : (
            ""
          )}
        </th>
        <th>{dt.visibility === 1 ? "Visivel" : "Não visivel"}</th>
      </tr>
    );
  };

  if (redirect) {
    return <Redirect to={`/admin/produtos/${redirectId}`} />;
  } else {
    return (
      <div className="container-admin d-flex">
        <div className="menu-container">
          <NavAdmin />
        </div>
        <div className="content-container w-100">
          <NavBarAdmin pageRef="Produtos" />
          <div className="container pd-b-40 col-md-11">
            <div className="row pd-t-60">
              <div className="col-xl-12 col-lg-12 mb-xl-0">
                <div className="card">
                  <div className="card-body">
                    <div class="row">
                      <div class="col-sm-12 col-md-6">
                        <div
                          id="datatable-basic_filter"
                          class="dataTables_filter"
                        >
                          <label>Search:</label>
                          <input
                            type="search"
                            class="form-control form-control-sm"
                            placeholder=""
                            onChange={(e) => setSearch(e.target.value)}
                            aria-controls="datatable-basic"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row pd-t-20">
              <div className="col-xl-12 col-lg-12 mb-xl-0">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Todos os produtos</h3>
                      </div>
                      <Link
                        to="/admin/produtos/novo"
                        className="btn btn-default"
                      >
                        Novo Produto
                      </Link>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-items-center table-flush">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Produto</th>
                          <th scope="col">Status</th>
                          <th scope="col">Visibilidade</th>
                        </tr>
                      </thead>
                      {search.length > 0 ? (
                        <tbody>
                          {filteredProducts.map((item, idx) => (
                            <ProductDetail key={idx} dt={item} />
                          ))}
                        </tbody>
                      ) : (
                        <tbody>
                          {console.log("produtos: ", products)}
                          {products
                            ? products.data.map((item, key) => {
                                return (
                                  <tr
                                    className="table-row link-table"
                                    key={key}
                                    onClick={() => handlerProduct(item.id)}
                                  >
                                    <th scope="row">{item.id}</th>
                                    <th>{item.name}</th>
                                    <th>
                                      {item.status === "pending" ? (
                                        <badge className="badge badge-warning mr-1 ml-1">
                                          Pendente
                                        </badge>
                                      ) : (
                                        ""
                                      )}
                                      {item.status === "waiting" ? (
                                        <badge className="badge badge-warning mr-1 ml-1">
                                          Em Analise
                                        </badge>
                                      ) : (
                                        ""
                                      )}
                                      {item.status === "approved" ? (
                                        <badge className="badge badge-success mr-1 ml-1">
                                          Aprovado
                                        </badge>
                                      ) : (
                                        ""
                                      )}
                                      {item.status === "disapproved" ? (
                                        <badge className="badge badge-danger mr-1 ml-1">
                                          Reprovado
                                        </badge>
                                      ) : (
                                        ""
                                      )}
                                    </th>
                                    <th>
                                      {item.visibility === 1
                                        ? "Visivel"
                                        : "Não visivel"}
                                    </th>
                                  </tr>
                                );
                              })
                            : ""}
                        </tbody>
                      )}
                    </table>
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

export default ProductList;
