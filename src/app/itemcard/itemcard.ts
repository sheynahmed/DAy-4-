import { Component, Input } from '@angular/core';
import { CartService } from '../cart-service';
import { CurrencyPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-itemcard',
  imports: [CurrencyPipe, NgIf],
  templateUrl: './itemcard.html',
  styleUrl: './itemcard.css',
})
export class Itemcard {
  @Input() item: any;

  constructor(private cartService: CartService) {}

  onAddToCart() {
    this.cartService.addToCart(this.item);
  }
}
