import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../../../shared/services/product.service";
import { ToastService } from "../../../../shared/services";
import { ProductQuantity, Product } from "src/app/shared/models";
@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  product: Product;
  totalQuantity: number;
  selectedImage: any;

  // Get the <span> element that closes the modal
  span = document.getElementsByClassName("close")[0];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private ToastService: ToastService
  ) {
    this.product = new Product();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const id = params.id; // (+) converts string 'id' to a number
      this.getProductDetail(id);
    });
  }

  getProductDetail(id: string) {
    const x = this.productService.getProductById(id);
    x.valueChanges().subscribe(
      (product) => {
        // const y = { ...(product.payload.toJSON() as Product), $key: id };
        this.product = product;

        if (this.product) {
          this.totalQuantity = 0;
          this.product.productQuantity.forEach((p) => {
            if (p.productQuantity) {
              this.totalQuantity += p.productQuantity;
            }
          });
        }
      },
      (error) => {
        this.ToastService.error("Error while fetching Product Detail", error);
      }
    );
  }

  addToCart(product: Product) {
    if (this.totalQuantity > 0) this.productService.addToCart(product);
    else this.ToastService.error("Item not Available", "");
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private calculateProductQuantity() {
    if (this.product && this.product.productQuantity) {
      if (
        this.product.productQuantity.some((quantity) => quantity.isSelected)
      ) {
        this.product.productQuantity.map((quantity) => {
          if (quantity.isSelected) {
            this.totalQuantity = quantity.productQuantity;
          }
        });
      } else {
        this.totalQuantity = 0;
      }
    }
  }

  onImageClick(selectedImage: any) {
    // Get the modal
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
    this.selectedImage = selectedImage;
  }

  onCloseClick() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
    this.selectedImage = null;
  }

  onSelectSize(size: ProductQuantity) {
    this.product.selectedProductQuantityKey = null;
    if (size && this.product.productQuantity) {
      this.product.productQuantity.map((quantity) => {
        if (quantity.productSize.data === size.productSize.data) {
          quantity.productSize.isSelected = true;
          if (quantity.isColorSelected && quantity.productSize.isSelected) {
            quantity.isSelected = true;
            this.product.selectedProductQuantityKey = quantity.id;
          } else {
            quantity.isSelected = false;
          }
        } else {
          quantity.isSelected = false;
          quantity.productSize.isSelected = false;
        }
      });
      this.calculateProductQuantity();
    }
  }

  onSelectColor(color: ProductQuantity) {
    if (color && this.product.productQuantity) {
      this.product.selectedProductQuantityKey = null;
      this.product.productQuantity.map((quantity) => {
        if (quantity.productColor === color.productColor) {
          quantity.isColorSelected = true;
          if (quantity.isColorSelected && quantity.productSize.isSelected) {
            quantity.isSelected = true;
            this.product.selectedProductQuantityKey = quantity.id;
          } else {
            quantity.isSelected = false;
          }
        } else {
          quantity.isSelected = false;
          quantity.isColorSelected = false;
        }
      });
      this.calculateProductQuantity();
    }
  }
}
