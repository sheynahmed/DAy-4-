import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Contact } from './contact/contact';
import { Products } from './products/products';
import { Items } from './items/items';
import { Recipes } from './recipes/recipes';

export const routes: Routes = [
  { path: "", component: Home },
  { path: "products", component: Products },
  { path: "contact", component: Contact },
  { path: "Items", component: Items },
  { path: "recipes", component: Recipes }
];
