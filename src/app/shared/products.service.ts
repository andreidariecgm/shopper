import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private searchResults: Product[] = [];
  private cart: Product[] = [];
  private searchTerm: string = '';

  searchResults$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  cart$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  searchTerm$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient) {}

  private search(): void {
    this.httpClient
      .get<Product[]>(`http://localhost:3000/products/${this.searchTerm}`)
      .subscribe((results: Product[]) => {
        this.searchResults = results;
        this.searchResults$.next(this.searchResults);
      });
  }

  updateSearchTerm(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.searchTerm$.next(this.searchTerm);
    this.search();
  }

  addToCart(product: Product): void {
    const index: number = this.cart.findIndex((cartProduct: Product) => cartProduct.id === product.id);

    if (index == -1) {
      this.cart.push(product);
      this.cart$.next(this.cart);
    }
  }

  removeFromCart(productId: string): void {
    const index: number = this.cart.findIndex((cartProduct: Product) => cartProduct.id === productId);

    if (index > -1) {
      this.cart.splice(index, 1);
      this.cart$.next(this.cart);
    }
  }

  buy(): void {
    this.httpClient
      .post(`http://localhost:3000/buy`, this.cart)
      .subscribe(() => {
        this.cart = [];
        this.cart$.next(this.cart);
      });
  }
}
