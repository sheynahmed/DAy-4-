import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Itemcard } from "../itemcard/itemcard";
import { ApiServices } from '../api-services';

@Component({
  selector: 'app-items',
  imports: [Itemcard],
  templateUrl: './items.html',
  styleUrl: './items.css',
})
export class Items implements OnInit {
  data: any[] = [];

  constructor(private api: ApiServices, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.api.getfakestore().subscribe((res: any) => {
      this.data = res;
      this.cdr.detectChanges();
    });
  }
}
