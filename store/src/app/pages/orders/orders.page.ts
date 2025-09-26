import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: false
})
export class OrdersPage implements OnInit {
  currentOrder: any = null;
  pastOrders: any[] = [];
  showReorderModal: boolean = false;
  reorderItems: any[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    // Mock data - in a real app, this would come from a service
    this.currentOrder = {
      id: 'ORD-789012',
      date: 'Dec 15, 2024',
      status: 'processing',
      items: [
        {
          id: 1,
          name: 'Classic Cotton T-Shirt',
          price: 45,
          size: 'M',
          quantity: 2,
          image: 'assets/images/classic-tshirt.jpg'
        },
        {
          id: 3,
          name: 'Signature Zip Hoodie',
          price: 89,
          size: 'L',
          quantity: 1,
          image: 'assets/images/zip-hoodie.jpg'
        }
      ],
      total: 179
    };

    this.pastOrders = [
      {
        id: 'ORD-123456',
        date: 'Nov 20, 2024',
        status: 'delivered',
        items: [
          {
            id: 2,
            name: 'Premium V-Neck T-Shirt',
            price: 42,
            size: 'L',
            quantity: 1,
            image: 'assets/images/vneck-tshirt.jpg'
          },
          {
            id: 5,
            name: 'Essential Chino Pants',
            price: 75,
            size: '32',
            quantity: 1,
            image: 'assets/images/chino-pants.jpg'
          }
        ],
        total: 117
      },
      {
        id: 'ORD-654321',
        date: 'Oct 5, 2024',
        status: 'delivered',
        items: [
          {
            id: 4,
            name: 'Classic Pullover Hoodie',
            price: 79,
            size: 'XL',
            quantity: 1,
            image: 'assets/images/pullover-hoodie.jpg'
          }
        ],
        total: 79
      }
    ];
  } // <-- This closing brace was missing

  viewOrderDetails(order: any) {
    this.presentAlert(
      `Order #${order.id}`,
      `Date: ${order.date}\nStatus: ${order.status}\nTotal: $${order.total}\n\nItems:\n${order.items.map((item: any) => `- ${item.name} (${item.size}) x${item.quantity} - $${item.price * item.quantity}`).join('\n')}`
    );
  }

  reorder(order: any) {
    this.reorderItems = order.items;
    this.showReorderModal = true;
  }

  closeReorderModal() {
    this.showReorderModal = false;
    this.reorderItems = [];
  }

  confirmReorder() {
    this.presentToast('Items added to cart successfully!');
    this.closeReorderModal();
    // In a real app, you would add these items to the cart service
  }

  navigateToProducts() {
    this.navController.navigateForward('/products');
  }

  trackOrder() {
    this.presentToast('Tracking information will be sent to your email.');
  }

  cancelOrder() {
    this.presentAlert(
      'Cancel Order',
      'Are you sure you want to cancel this order? This action cannot be undone.',
      true
    );
  }

  private async presentAlert(title: string, message: string, showCancel: boolean = false) {
    const buttons = showCancel ? [
      { text: 'Cancel', role: 'cancel' },
      { text: 'Confirm', handler: () => this.confirmCancelOrder() }
    ] : ['Close'];

    const alert = await this.alertController.create({
      header: title,
      message,
      buttons,
      cssClass: 'order-alert'
    });
    await alert.present();
  }

  private confirmCancelOrder() {
    this.presentToast('Order cancellation request submitted.');
    this.currentOrder = null;
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'light'
    });
    await toast.present();
  }
}