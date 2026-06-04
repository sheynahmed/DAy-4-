import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Itemcard } from "../itemcard/itemcard";
import { ApiServices } from '../api-services';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [Itemcard, NgIf],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = ['All', 'Electronics', 'Jewelry', "Men's Clothing", "Women's Clothing"];
  selectedCategory: string = 'All';
  searchTerm: string = '';
  sortBy: string = 'default';

  constructor(private api: ApiServices, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.api.getfakestore().subscribe((res: any) => {
      this.products = res;
      this.filteredProducts = res;
      this.cdr.detectChanges();
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filterProducts();
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.filterProducts();
  }

  onSortChange(event: Event) {
    this.sortBy = (event.target as HTMLSelectElement).value;
    this.filterProducts();
  }

  filterProducts() {
    let result = [...this.products];

    // Filter by Category
    if (this.selectedCategory !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === this.selectedCategory.toLowerCase());
    }

    // Filter by Search Term
    if (this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term));
    }

    // Sort
    if (this.sortBy === 'priceLow') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'priceHigh') {
      result.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'rating') {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    this.filteredProducts = result;
    this.cdr.detectChanges();
  }
}
