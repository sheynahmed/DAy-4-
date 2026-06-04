import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CartService } from '../cart-service';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgFor, NgIf, CurrencyPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isCartOpen = false;

  constructor(public cartService: CartService) {}

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
}
