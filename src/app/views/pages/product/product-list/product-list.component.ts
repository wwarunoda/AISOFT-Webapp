import { Component, OnInit } from "@angular/core";
import { Product } from "../../../../shared/models/product";
import { AuthService } from "../../../../shared/services/auth.service";
import { ProductService } from "../../../../shared/services/product.service";
import { Brand } from "../../../../shared/models";
import { ToastService } from "src/app/shared/services/toast.service";
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  productList: Product[];
  loading = false;
  brands: Brand[];

  selectedBrand: "All";

  page = 1;
  constructor(
    public authService: AuthService,
    private productService: ProductService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.getAllBrands();
  }

  getAllProducts() {
    this.loading = true;
    const x = this.productService.getProducts();
    x.snapshotChanges().subscribe(
      (product) => {
        this.loading = false;
        this.productList = [];
        product.forEach((element) => {
          const y = { ...element.payload.toJSON(), $key: element.key };
          this.productList.push(y as Product);
        });
      },
      (err) => {
        this.toastService.error("Error while fetching Products", err);
      }
    );
  }

  getAllBrands() {
    const x = this.productService.getBrands();
    x.snapshotChanges().subscribe(
      (product) => {
        this.loading = false;
        this.brands = [{
          $key: '',
          id: 0,
          name: 'All',
          description: ''
        }];
        product.forEach((element) => {
          const y = { ...element.payload.toJSON(), $key: element.key };
          this.brands.push(y as Brand);
        });
      },
      (err) => {
        this.toastService.error("Error while fetching Products", err);
      }
    );
  }

  removeProduct(key: string) {
    this.productService.deleteProduct(key);
  }

  addFavourite(product: Product) {
    this.productService.addFavouriteProduct(product);
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }
}
