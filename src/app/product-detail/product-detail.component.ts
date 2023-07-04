import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {UserProduct} from "../model/userProduct.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: UserProduct = {id: 0, quantity:0, retail_price: 0, description: "", name:""};
  watchlist: number[] = [];
  constructor(private productService: ProductService, private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.getProduct();
    this.getAllWatchlist();
  }

  public getProduct() {
    const id:number = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe(
      product => {
        this.product = product;
        },
      error => {
          console.log(error);
        }
      )
  }

  public addToWatchlist() {
    this.productService.addToWatchlist(this.product.id).subscribe(
      (response:any) => {
        alert(response.message);
      },
      error => {
        console.error(error);
        alert("Something's wrong, try again");
      }
    );
  }

  public getAllWatchlist() {
    this.productService.getAllWatchlist().subscribe(
      (response:any) => {
        response.data.forEach((item:any) => this.watchlist.push(item.product.id));
        console.log("watchlist:" + this.watchlist);
      },
      error => {
        console.log(error);
      }
    );
  }

  public removeFromWatchlist() {
    this.productService.removeFromWatchlist(this.product.id).subscribe(
      (response:any) => {
        this.watchlist = [];
        this.getAllWatchlist();
        alert(response.message);
      },
      error => {
        console.error(error);
        alert("Something's wrong, try again");
      }
    )
  }
}
