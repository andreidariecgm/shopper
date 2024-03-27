import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, take } from 'rxjs';

import { ProductsService } from '../shared/products.service';
import { Product } from '../shared/product.interface';
import { IsInCartPipe } from '../shared/is-in-cart.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    IsInCartPipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {

  searchResults$: Observable<Product[]> = of([]);
  cart$: Observable<Product[]> = of([]);

  searchFormControl = new FormControl('');

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.searchResults$ = this.productsService.searchResults$;
    this.cart$ = this.productsService.cart$;

    this.productsService.searchTerm$
      .pipe(take(1))
      .subscribe((term: string) => {
        this.searchFormControl.patchValue(term);
      });
  }

  updateSearchTerm(): void {
    this.productsService.updateSearchTerm(this.searchFormControl.value || '');
  }

  addToCart(product: Product): void {
    this.productsService.addToCart(product);
  }

  removeFromCart(productId: string): void {
    this.productsService.removeFromCart(productId);
  }
}
