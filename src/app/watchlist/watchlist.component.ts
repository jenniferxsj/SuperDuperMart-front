import {Component, OnInit} from '@angular/core';
import {ProductData} from "../model/productData.model";
import {ProductService} from "../services/product.service";
import {UserProduct} from "../model/userProduct.model";

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  products:ProductData[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getUserAllWatchlist();
  }

  public getUserAllWatchlist() {
    this.productService.getAllWatchlist().subscribe(
      (response: any) => {
        this.products = response.data;
        console.log(this.products);
        console.log(response);
      }
    )
  }

  public removeFromWatchlist(id: number) {
    this.productService.removeFromWatchlist(id).subscribe(
      (response:any) => {
        alert(response.message);
        this.ngOnInit();
      },
      error => {
        console.error(error);
        alert("Something's wrong, try again");
      }
    )
  }
}
