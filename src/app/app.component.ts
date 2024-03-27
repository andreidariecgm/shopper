import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ProductsService } from './shared/products.service';
import { Product } from './shared/product.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{

  cart$: Observable<Product[]> = of([]);

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.cart$ = this.productsService.cart$;
  }
}
