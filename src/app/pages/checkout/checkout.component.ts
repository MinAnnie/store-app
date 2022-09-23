import { Router } from '@angular/router';
import { ShoppingCartService } from './../../shared/services/shopping-cart.service';
import { Product } from './../products/interface/product.interface';
import { Order, Details } from './../../shared/interfaces/order.interface';
import { Store } from './../../shared/interfaces/stores.interface';
import { switchMap, tap, delay } from 'rxjs/operators';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../products/service/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  model = {
    name: 'Store app',
    store: '',
    shippingAddress: '',
    city: ''
  }

  isDelivery = true;

  cart: Product[] = [];

  stores: Store[] = [];

  constructor(private dataService: DataService,
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private productService: ProductsService) {
      this.checkIfCartIsEmpty();
    }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickupOrDelivery(value: boolean):void {
    this.isDelivery = value;
    console.log(value);
  }

  onSubmit({value: formData}: NgForm): void{
    const data: Order ={
      ... formData,
      date: this.getCurrentDay,
      isDelivery: this.isDelivery
    }

    this.dataService.saveOrder(data)
    .pipe(
      tap(res => console.log('Order -> ',res)),
      switchMap( ({id: orderId}) => {
        const details = this.prepareDetails();
        return this.dataService.saveDetailsOrder({details, orderId});
      }),
      tap(() => this.router.navigate(['/checkout/thank-you-page'])),
      delay(2000),
      tap(() => this.shoppingCartService.resetCart())
    )
    .subscribe();
    console.log('guardar uwu', formData);
  }

  private getStores(): void{
    this.dataService.getStores()
    .pipe(
      tap( (stores: Store[]) => this.stores = stores)
    )
    .subscribe();
  }

  private getCurrentDay(): string{
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[]{
    const details: Details[] = [];
    this.cart.forEach((product: Product) => {
      const {
        id: productId,
        name: productName,
        quantity,
        stock } = product;

        const updateStcok = (stock - quantity);

        this.productService
        .updateStock(productId, updateStcok)
        .pipe(
          tap(() => details.push({productId, productName, quantity}))
        )
        .subscribe();

        details.push({productId, productName, quantity});

    })
    return details;
  }

  private getDataCart(): void{
    this.shoppingCartService.cartActions$
    .pipe(
      tap((products: Product[]) => this.cart = products)
    )
    .subscribe();
  }

  private checkIfCartIsEmpty():void {
    this.shoppingCartService.cartActions$
    .pipe(
      tap((product: Product[]) => {
        if(Array.isArray(product) && !product.length){
          this.router.navigate(['/products']);
        }
      })
    )
    .subscribe();
  }

}
