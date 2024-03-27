import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';

import { Product } from '../shared/product.interface';
import { ProductsService } from '../shared/products.service';
import { TotalPricePipe } from '../shared/total-price.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    TotalPricePipe,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {

  cart$: Observable<Product[]> = of([]);

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.cart$ = this.productsService.cart$;
  }

  buy(): void {
    this.productsService.buy();
  }
}
