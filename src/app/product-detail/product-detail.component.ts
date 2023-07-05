import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {UserProduct} from "../model/userProduct.model";
import {ActivatedRoute} from "@angular/router";
import {UserAuthService} from "../services/auth.service";
import {ProductData} from "../model/productData.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  isAdmin: boolean = false;
  product: ProductData = {id: 0, quantity:0, retail_price: 0, description: "", name:"", wholesale_price:0};
  watchlist: number[] = [];
  count: number = 0;
  constructor(private productService: ProductService, private route: ActivatedRoute,
              private userAdminService: UserAuthService) {
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
    this.isAdmin = this.userAdminService.isAdmin();
    if(this.isAdmin) {
      this.countSold(id);
    }
  }

  public addToWatchlist() {
    this.productService.addToWatchlist(this.product.id).subscribe(
      (response:any) => {
        alert(response.message);
        this.ngOnInit();
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
        response.data.forEach((item:any) => this.watchlist.push(item.id));
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
        this.ngOnInit();
      },
      error => {
        console.error(error);
        alert("Something's wrong, try again");
      }
    )
  }

  editProduct(editProductForm: NgForm, id: number) {
    console.log(editProductForm.value);
    this.productService.updateProduct(editProductForm.value, id).subscribe(
      (response:any) => {
        alert(response.message);
        this.ngOnInit();
      },
      error => console.log(error)
    );
  }

  public countSold(id: number) {
    this.productService.getSoldCount(id).subscribe(
      (response:any) => {
        console.log(response);
        this.count = response.data;
      },
      error => console.log(error)
    );
  }
}
