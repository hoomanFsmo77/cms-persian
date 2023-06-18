import './assets/app.scss';
//@ts-ignore
import Alpine from 'alpinejs'
import admin from './components/admin'
import products from './components/products'
import comments from "./components/comments";
//@ts-ignore
window.Alpine = Alpine
Alpine.data('admin',admin)
Alpine.data('products',products)
Alpine.data('comments',comments)
Alpine.start()