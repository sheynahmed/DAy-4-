import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items = signal<CartItem[]>([]);

  // Read-only signals for components
  readonly cartItems = this.items.asReadonly();

  readonly totalItems = computed(() => {
    return this.items().reduce((total, item) => total + item.quantity, 0);
  });

  readonly subtotal = computed(() => {
    return this.items().reduce((total, item) => total + item.price * item.quantity, 0);
  });

  addToCart(product: any) {
    this.items.update((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
  }

  removeFromCart(productId: number) {
    this.items.update((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.items.update((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }

  clearCart() {
    this.items.set([]);
  }
}
