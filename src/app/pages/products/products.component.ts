import { ShoppingCartService } from './../../shared/services/shopping-cart.service';
import { Product } from './interface/product.interface';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from './service/products.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit{
  products!: Product[];

  constructor(private productService: ProductsService, private shoppingCartService: ShoppingCartService){}

  ngOnInit(): void{
    this.productService.getProducts()
    .pipe(
      tap( (product: Product[]) => this.products = product)
    ).subscribe();
  }

  addToCartC(product: Product): void{
    console.log('Add to cart uwu -> ', product);
    this.shoppingCartService.updateCart(product);
  }
}
