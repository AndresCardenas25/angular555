import { Component } from '@angular/core';

import { Product} from './models/product.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;

  toogleImg(){
    this.showImg = !this.showImg;
  }

  products:Product[] = [
    {
      id: '1',
      price: 19.99,
      name: 'Producto 1',
      image: 'URL_DE_LA_IMAGEN_1', // Reemplaza con tu URL
    },
    {
      id: '2',
      price: 29.99,
      name: 'Producto 2',
      image: 'URL_DE_LA_IMAGEN_2', // Reemplaza con tu URL
    },
    {
      id: '3',
      price: 39.99,
      name: 'Producto 3',
      image: 'URL_DE_LA_IMAGEN_3', // Reemplaza con tu URL
    },
    {
      id: '4',
      price: 49.99,
      name: 'Producto 4',
      image: 'URL_DE_LA_IMAGEN_4', // Reemplaza con tu URL
    },
    {
      id: '5',
      price: 59.99,
      name: 'Producto 5',
      image: 'URL_DE_LA_IMAGEN_5', // Reemplaza con tu URL
    },
  ];

  onLoaded(img: string){
    console.log('log padre', img);
  }
}
