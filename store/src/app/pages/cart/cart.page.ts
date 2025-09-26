import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { CartService, CartItem } from '../services/cart.service'; // Adjust path as needed

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false
})
export class CartPage implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private toastController: ToastController,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
  }

  trackByItemId(index: number, item: CartItem): string {
    return `${item.id}-${item.size}`;
  }

  increaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.size, item.quantity + 1);
    this.loadCartItems(); // Refresh the list
    this.presentToast(`Increased ${item.name} quantity`);
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.size, item.quantity - 1);
      this.loadCartItems(); // Refresh the list
      this.presentToast(`Decreased ${item.name} quantity`);
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.id, item.size);
    this.loadCartItems(); // Refresh the list
    this.presentToast(`${item.name} removed from cart`);
  }

  calculateSubtotal(): number {
    return this.cartService.getTotalPrice();
  }

  calculateShipping(): string {
    const subtotal = this.calculateSubtotal();
    return subtotal > 1000 ? 'FREE' : '₹99';
  }


  calculateTotal(): number {
    const subtotal = this.calculateSubtotal();
    const shipping = this.calculateShipping() === 'FREE' ? 0 : 99;
    return subtotal + shipping;
  }

  proceedToCheckout() {
    if (this.cartItems.length > 0) {
      this.presentToast('Proceeding to checkout...');
      this.dismiss();
      this.navCtrl.navigateForward('/checkout');
    } else {
      this.presentToast('Please add items to your cart first');
    }
  }

  continueShopping() {
    this.dismiss();
    this.navCtrl.navigateForward('/products');
  }

  navigateToProducts() {
    this.dismiss();
    this.navCtrl.navigateForward('/products');
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}