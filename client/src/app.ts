import './assets/app.scss';
//@ts-ignore
import Alpine from 'alpinejs'
import admin from './components/admin'
import products from './components/products'
import comments from "./components/comments";
import users from "./components/users";
import orders from "./components/orders";
import offers from "./components/offers";
import index from "./components/index";
import product from "./components/product";
import basket from "./components/basket";
//@ts-ignore
window.Alpine = Alpine
Alpine.data('admin',admin)
Alpine.data('products',products)
Alpine.data('comments',comments)
Alpine.data('users',users)
Alpine.data('orders',orders)
Alpine.data('offers',offers)
Alpine.data('index',index)
Alpine.data('product',product)
Alpine.data('basket',basket)
Alpine.start()