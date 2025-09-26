import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  newsletterEmail: string = '';
  
  categories = [
    {
      id: 1,
      name: 'Zipper T-Shirts',
      image: 'assets/icon/hoodies (1).png'
    },
    {
      id: 2,
      name: 'Classic Hoodies',
      image: 'assets/images/shirts.jpg'
    },
    {
      id: 3,
      name: 'Pants',
      image: 'assets/images/accessories.jpg'
    }
  ];
  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    // In a real app, you would load data from a service here
  }

  shopNow() {
    this.presentToast('Navigating to our collection...');
    // Navigation logic would go here
  }

  viewCategory(categoryId: number) {
    this.presentToast(`Viewing category ${categoryId}`);
    // Navigation to category page
  }

  quickView(product: any) {
    this.presentAlert(product.name, `Price: $${product.price}\nMaterial: ${product.material}`);
  }

  addToWishlist(product: any) {
    this.presentToast(`Added ${product.name} to wishlist`);
    // Add to wishlist logic
  }

  addToCart(product: any) {
    this.presentToast(`Added ${product.name} to cart`);
    // Add to cart logic
  }

  async subscribeNewsletter() {
    if (this.newsletterEmail && this.isValidEmail(this.newsletterEmail)) {
      this.presentToast('Thank you for subscribing!');
      this.newsletterEmail = '';
    } else {
      this.presentToast('Please enter a valid email address');
    }
  }

  private isValidEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  private async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message,
      buttons: ['Close']
    });
    await alert.present();
  }
}