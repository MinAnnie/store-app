import { Product } from './../../pages/products/interface/product.interface';
import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  products: Product[] = [];

  private cartSubject = new BehaviorSubject<Product[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);

  get totalActions$(): Observable<number>{
    return this.totalSubject.asObservable();
  }
  get cartActions$(): Observable<Product[]>{
    return this.cartSubject.asObservable();
  }
  get quantityActions$(): Observable<number>{
    return this.quantitySubject.asObservable();
  }

  updateCart(product: Product): void{
    this.addToCart(product);
    this.quantityProducts();
    this.calcTotal();
  }

  private calcTotal(): void{
    const total = this.products.reduce( (acc, prod) => acc += (prod.price * prod.quantity), 0 );
    this.totalSubject.next(total);
  }

  private quantityProducts():void{
    const quantity = this.products.reduce( (acc, prod) => acc +=  prod.quantity, 0 );
    this.quantitySubject.next(quantity);
  }

  private addToCart(product: Product): void{
    const isProductInCart = this.products.find( ({id}) => id == product.id );
    if(isProductInCart){
      isProductInCart.quantity += 1;
    }else{
      this.products.push({... product, quantity : 1});
    }

    this.cartSubject.next(this.products);
  }

  resetCart(): void{
    this.cartSubject.next([]);
    this.totalSubject.next(0);
    this.quantitySubject.next(0);
    this.products = [];
  }

  constructor() { }
}
