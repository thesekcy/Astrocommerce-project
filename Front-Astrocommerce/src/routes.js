import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Product from './pages/Product';

import PublicRoute from './routes/PublicRoutes'
import AdminRoute from './routes/AdminRoutes'
import UserRoute from './routes/UserRoutes'

// Admin
import HomeAdmin from './pages/Admin/Dashboard';
import OrdersAdmin from './pages/Admin/orders/Orders_list';
import OrdersPage from './pages/Admin/orders/Orders_page';

import ProductsAdmin from './pages/Admin/product/Product_list';
import ProductsPage from './pages/Admin/product/Product_page';
import ProductsNew from './pages/Admin/product/Product_new';

import UsersAdmin from './pages/Admin/users/User_list';
import UsersPage from './pages/Admin/users/User_page';
import UsersNew from './pages/Admin/users/User_new';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" exact component={Home} />
      <Route exact path="/produto/:id" exact component={Product} />
      <PublicRoute exact path="/login" exact component={Login} />
      <PublicRoute exact path="/cadastro" exact component={Register} />
      <UserRoute exact path="/perfil" exact component={Profile} />


      {/* ADMIN ROUTES ======================================================= */}
      <AdminRoute exact path="/admin/dashboard" exact component={HomeAdmin} />

      <AdminRoute exact path="/admin/pedidos" exact component={OrdersAdmin} />
      <AdminRoute exact path="/admin/pedidos/:id" component={OrdersPage} />

      <AdminRoute exact path="/admin/produtos" exact component={ProductsAdmin} />
      <AdminRoute exact path="/admin/produtos/novo" exact component={ProductsNew} />
      <AdminRoute exact path="/admin/produtos/:id" component={ProductsPage} />

      <AdminRoute exact path="/admin/usuarios" component={UsersAdmin} />
      <AdminRoute exact path="/admin/usuarios/novo" component={UsersNew} />
      <AdminRoute exact path="/admin/usuarios/:id" component={UsersPage} />
    </Switch>
  );
}