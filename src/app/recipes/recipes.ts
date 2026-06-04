import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiServices } from '../api-services';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-recipes',
  imports: [NgIf],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes implements OnInit {
  recipes: any[] = [];
  filteredRecipes: any[] = [];
  cuisines: string[] = ['All'];
  selectedCuisine: string = 'All';
  searchTerm: string = '';
  selectedRecipe: any = null;

  constructor(private api: ApiServices, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.api.getRecipes().subscribe((res: any) => {
      // dummyjson recipe endpoint returns { recipes: [...], total: 50, skip: 0, limit: 30 }
      if (res && res.recipes) {
        this.recipes = res.recipes;
        this.filteredRecipes = res.recipes;
        this.extractCuisines();
      }
      this.cdr.detectChanges();
    });
  }

  extractCuisines() {
    const list = this.recipes.map((r: any) => r.cuisine);
    const unique = Array.from(new Set(list));
    this.cuisines = ['All', ...unique];
  }

  selectCuisine(cuisine: string) {
    this.selectedCuisine = cuisine;
    this.filterRecipes();
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.filterRecipes();
  }

  filterRecipes() {
    let result = [...this.recipes];

    // Filter by Cuisine
    if (this.selectedCuisine !== 'All') {
      result = result.filter(
        (r) => r.cuisine.toLowerCase() === this.selectedCuisine.toLowerCase()
      );
    }

    // Filter by Search Keyword
    if (this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(term) ||
          r.tags.some((t: string) => t.toLowerCase().includes(term)) ||
          r.ingredients.some((i: string) => i.toLowerCase().includes(term))
      );
    }

    this.filteredRecipes = result;
    this.cdr.detectChanges();
  }

  openRecipeDetails(recipe: any) {
    this.selectedRecipe = recipe;
    this.cdr.detectChanges();
  }

  closeRecipeDetails() {
    this.selectedRecipe = null;
    this.cdr.detectChanges();
  }
}
