import { Component, OnInit } from '@angular/core';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model'

import { StoreService} from '../../services/store.service'

import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  myShoppingCart: Product[] = [];

  total = 0;

  products:Product[] = [];

  today = new Date();

  date = new Date(2020, 2, 12);

  showProductDetail = false;

  productChoosen: Product = {
    id: ' ',
    title: ' ',
    price: 0,
    images: [],
    description: ' ',
    category: {
      id: ' ',
      name: ' ',
      typeImg: ' '
    }
  };

  limit = 10;

  offset = 0;

  constructor( private storeService: StoreService, private productsService: ProductsService ){
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(){
    this.productsService.getProductByPage(10,0)
                        .subscribe(data => {
                          this.products = data;
                          this.offset += this.limit;
                        })
  }

  onAddToShoppingCart(product: Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toogleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.productsService.getProduct(id)
                        .subscribe( data => {
                          this.toogleProductDetail();
                          this.productChoosen = data;
                        });
  }

  createNewProduct(){
    const product: CreateProductDTO = {
      title: 'Jordan Lcsole',
      price: 120,
      images: [''],
      description: ' Jalka estusipo ismi alsi ',
      categoryId: 2,
      }

      this.productsService.create(product)
                          .subscribe(data => {
                            this.products.unshift(data);
                          });
    }

    updateProduct(){
      const changes: UpdateProductDTO = {
        title: 'Lacsote los Jrg',
        price: 12,
      }

      const id = this.productChoosen.id;

      this.productsService.update(id, changes)
                          .subscribe(data => {
                            const productIndex = this.products.findIndex( 
                              item => item.id === this.productChoosen.id);
                              this.products[productIndex] = data;
                          });

    }

    deleteProduct(){
      const id = this.productChoosen.id;
      this.productsService.delete(id)
                          .subscribe(() => {
                            const productIndex = this.products.findIndex(
                              item => item.id === this.productChoosen.id);
                              this.products.splice(productIndex, 1);   
                              this.showProductDetail = false;                
                          });
    }

    loadMore(){
      this.productsService.getProductByPage(this.limit ,this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      })
    }
}

