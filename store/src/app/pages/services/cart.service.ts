import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
  material?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);
  private cartTotal = new BehaviorSubject<number>(0);

  cartItemCount$ = this.cartItemCount.asObservable();
  cartTotal$ = this.cartTotal.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addToCart(product: any, size: string, quantity: number = 1) {
    const existingItem = this.cartItems.find(item => 
      item.id === product.id && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        size: size,
        quantity: quantity,
        image: product.image,
        material: product.material
      });
    }

    this.updateCartData();
  }

  removeFromCart(itemId: number, size: string) {
    this.cartItems = this.cartItems.filter(item => 
      !(item.id === itemId && item.size === size)
    );
    this.updateCartData();
  }

  updateQuantity(itemId: number, size: string, quantity: number) {
    const item = this.cartItems.find(item => 
      item.id === itemId && item.size === size
    );
    
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(itemId, size);
      } else {
        item.quantity = quantity;
        this.updateCartData();
      }
    }
  }

  clearCart() {
    this.cartItems = [];
    this.updateCartData();
  }

  getItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  private updateCartData() {
    this.cartItemCount.next(this.getItemCount());
    this.cartTotal.next(this.getTotalPrice());
    this.saveCartToStorage();
  }

  private saveCartToStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  private loadCartFromStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedItems = localStorage.getItem('cartItems');
      if (storedItems) {
        this.cartItems = JSON.parse(storedItems);
        this.updateCartData();
      }
    }
  }
}