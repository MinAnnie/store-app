import { CartComponent } from './shared/components/cart/cart.component';
import { DeveloperComponent } from './pages/developer/developer.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ProductsModule } from './pages/products/products.module';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutModule } from './pages/checkout/checkout.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DeveloperComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ProductsModule,
    HttpClientModule,
    CheckoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
