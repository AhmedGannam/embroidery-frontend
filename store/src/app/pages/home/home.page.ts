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
      name: 'Tailored Suits',
      description: 'Bespoke craftsmanship',
      image: 'assets/images/suits.jpg'
    },
    {
      id: 2,
      name: 'Dress Shirts',
      description: 'Premium cotton collection',
      image: 'assets/images/shirts.jpg'
    },
    {
      id: 3,
      name: 'Accessories',
      description: 'Leather & silk essentials',
      image: 'assets/images/accessories.jpg'
    }
  ];

  featuredProducts = [
    {
      id: 1,
      name: 'Navy Blue Blazer',
      price: 299,
      material: 'Italian Wool',
      image: 'assets/images/blazer.jpg'
    },
    {
      id: 2,
      name: 'Cashmere Sweater',
      price: 189,
      material: 'Pure Cashmere',
      image: 'assets/images/sweater.jpg'
    },
    {
      id: 3,
      name: 'Oxford Dress Shoes',
      price: 249,
      material: 'Premium Leather',
      image: 'assets/images/shoes.jpg'
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