import { Size, Colour, Brand, Category } from "./";
import { FileExt } from "./file.ext";
import { Gender } from "./gender";
import { ProductQuantity } from "./product.quantity";
export class Product {
  $key?: string;
  productId?: string;
  productName?: string;
  productCategoryId?: number;
  productCategory?: string;
  productCategoryVM?: Category;
  productDescription?: string;
  genderKey?: string;
  gender?: string;
  genderVM?: Gender;
  productPrice?: number;
  productImageUrl?: string;
  productAdded?: number;
  ratings?: number;
  favourite?: boolean;
  productSeller?: string;
  material?: string;
  materialComposition?: string;
  liningMaterial?: string;
  colour?: Colour[];
  sizeType?: number;
  size?: Size;
  modelDetails?: string;
  isProductAvailable?: boolean;
  productBrandKey?: string;
  productBrandVM?: Brand;
  productQuantity?: ProductQuantity[];
  imageList?: FileExt[];
  createdDate?: string;
  lastUpdatedDate?: string;
  createdUser?: string;
  isActive?: boolean;
  materialKey?: string;
  selectedProductQuantityKey?: string;
}
