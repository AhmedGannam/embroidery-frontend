import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { CartService } from '../services/cart.service'; // Adjust path as needed
import { CartPage } from '../cart/cart.page'; // Import cart page

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: false
})
export class ProductPage implements OnInit {
  selectedCategory: string = 'all';
  selectedSizes: { [key: number]: string } = {};
  cartItemCount: number = 0;
  
  allProducts = [
    // T-Shirts (2 types)
    {
      id: 1,
      name: 'Classic Strip T-Shirt',
      price: 489,
      material: '100% Premium Cotton',
      category: 'tshirt',
      description: 'Our signature classic fit t-shirt with perfect drape and comfort',
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'assets/icon/strip1 (1).png',
      isInWishlist: false
    },
    {
      id: 2,
      name: 'Dusty Rose Zipper',
      price: 489,
      material: 'Polyster',
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
      price: 799,
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
      price: 799,
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
      price: 350,
      material: 'Twill Cotton',
      category: 'pants',
      description: 'Versatile chino pants perfect for casual and smart occasions',
      sizes: ['30', '32', '34', '36'],
      image: 'assets/icon/pants.png',
      isInWishlist: false
    },
    {
      id: 6,
      name: 'Classic Jogger Pants',
      price: 350,
      material: 'Jersey Cotton Blend',
      category: 'pants',
      description: 'Comfortable jogger pants with elastic cuffs and drawstring',
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'assets/icon/pants2.png',
      isInWishlist: false
    }
  ];

  filteredProducts: any[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private cartService: CartService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.filteredProducts = [...this.allProducts];
    // Initialize selected sizes
    this.allProducts.forEach(product => {
      this.selectedSizes[product.id] = product.sizes[0];
    });

    // Subscribe to cart updates
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
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
    this.cartService.addToCart(product, selectedSize, 1);
    
    this.presentToast(`Added ${product.name} (Size: ${selectedSize}) to cart`);
  }

  async openCart() {
    const modal = await this.modalController.create({
      component: CartPage,
      cssClass: 'cart-modal'
    });
    return await modal.present();
  }

  quickView(product: any) {
    this.presentAlert(
      product.name, 
      `Price: ₹${product.price}\nMaterial: ${product.material}\nDescription: ${product.description}\nSizes: ${product.sizes.join(', ')}`
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