import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartPage } from '../../pages/cart/cart.page';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: false
})
export class ToolbarComponent {
  @Input() title: string = '';

  constructor(private modalCtrl: ModalController) {}

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartPage,
      breakpoints: [0, 1],
      initialBreakpoint: 1, // full screen
      handle: false
    });
    await modal.present();
  }
}
