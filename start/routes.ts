/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/


import "./User/user.routes";
import "./User/role.routes";

import "./View/ViewCategory.routes";
import "./View/View.routes";
import "./View/RoleView.routes";

import "./Branche/branch.routes";

import "./Locations/city.routes";
import "./Locations/state.routes";

import "./Order/orderDetail.routes";
import "./Order/order.routes";

import "./Product/productBranches.routes";
import "./Product/productCategorie.routes";
import "./Product/product.routes";

import "./Sale/salesDetail.routes";
import "./Sale/sale.routes";

import "./Auth/auth.routes";

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.post('/upload', 'ImagesController.upload').prefix("api/v1");