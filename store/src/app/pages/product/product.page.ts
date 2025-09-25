import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: false
})
export class ProductPage implements OnInit {
  selectedCategory: string = 'all';
  selectedSizes: { [key: number]: string } = {};
  
  allProducts = [
    // T-Shirts (2 types)
    {
      id: 1,
      name: 'Classic Strip T-Shirt',
      price: 45,
      material: '100% Premium Cotton',
      category: 'tshirt',
      description: 'Our signature classic fit t-shirt with perfect drape and comfort',
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'assets/icon/strip1 (1).png',
      isInWishlist: false
    },
    {
      id: 2,
      name: 'Premium V-Neck T-Shirt',
      price: 42,
      material: 'Organic Cotton Blend',
      category: 'tshirt',
      description: 'Elegant v-neck design for a sophisticated casual look',
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'assets/icon/strip1 (2).png',
      isInWishlist: false
    },
    
    // Hoodies (2 types)
    {
      id: 3,
      name: 'Crimson Red Hoodie',
      price: 89,
      material: 'Premium Cotton Blend',
      category: 'hoodie',
      description: 'Hoodie with premium finish and comfortable fit',
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'assets/icon/red.png',
      isInWishlist: false
    },
    {
      id: 4,
      name: 'Beach Hoodie',
      price: 79,
      material: 'French Terry Cotton',
      category: 'hoodie',
      description: 'Timeless pullover design with kangaroo pocket',
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'assets/icon/hoodies (1).png',
      isInWishlist: false
    },
    
    // Pants (2 types)
    {
      id: 5,
      name: 'Essential Chino Pants',
      price: 75,
      material: 'Twill Cotton',
      category: 'pants',
      description: 'Versatile chino pants perfect for casual and smart occasions',
      sizes: ['30', '32', '34', '36'],
      image: 'assets/images/chino-pants.jpg',
      isInWishlist: false
    },
    {
      id: 6,
      name: 'Classic Jogger Pants',
      price: 65,
      material: 'Jersey Cotton Blend',
      category: 'pants',
      description: 'Comfortable jogger pants with elastic cuffs and drawstring',
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'assets/images/jogger-pants.jpg',
      isInWishlist: false
    }
  ];

  filteredProducts: any[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.filteredProducts = [...this.allProducts];
    // Initialize selected sizes
    this.allProducts.forEach(product => {
      this.selectedSizes[product.id] = product.sizes[0];
    });
  }

  filterProducts() {
    if (this.selectedCategory === 'all') {
      this.filteredProducts = [...this.allProducts];
    } else {
      this.filteredProducts = this.allProducts.filter(
        product => product.category === this.selectedCategory
      );
    }
  }

  selectSize(productId: number, size: string) {
    this.selectedSizes[productId] = size;
  }

  toggleWishlist(product: any) {
    product.isInWishlist = !product.isInWishlist;
    const message = product.isInWishlist ? 
      `Added ${product.name} to wishlist` : 
      `Removed ${product.name} from wishlist`;
    
    this.presentToast(message);
  }

  addToCart(product: any) {
    const selectedSize = this.selectedSizes[product.id];
    this.presentToast(`Added ${product.name} (Size: ${selectedSize}) to cart`);
  }

  quickView(product: any) {
    this.presentAlert(
      product.name, 
      `Price: $${product.price}\nMaterial: ${product.material}\nDescription: ${product.description}`
    );
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'light'
    });
    await toast.present();
  }

  private async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message,
      buttons: ['Close'],
      cssClass: 'product-alert'
    });
    await alert.present();
  }
}