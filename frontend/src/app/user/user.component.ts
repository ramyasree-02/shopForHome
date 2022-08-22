import { Component, EventEmitter, OnInit, Output, Type } from '@angular/core';
import { User } from '../user';
import { Product } from '../_model/product.model';
import { Wishlist } from '../_model/wishlist.model';
import { CartService } from '../_services/cart.service';
import { ProductServiceService } from '../_services/product-service.service';
import { UserService } from '../_services/user.service';
import { WishlistService } from '../_services/wishlist.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  message: string | undefined;
  products: any;
  public categories: any;
  wishlist: Wishlist[] = [];
  enteredSearchValue: string = '';
  public cartList: any = [];
  public wish: any = [];
  public totalItem: number = 0;
  public wishlistItem: number = 0;
  constructor(private userService: UserService,
    private productService: ProductServiceService,
    private wishListService: WishlistService,
    private CartService: CartService) { }

  ngOnInit(): void {

    this.forUser();
    this.getProducts();
    this.getCount();
    this.getWishlistCount();

  }

  forUser() {
    this.userService.forUser().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (resp) => {
        console.log(resp);
        this.products = resp;
        this.categories = resp;
        this.products.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price });
        })
      },
      (error) => console.log(error)
    );
  }

  addToWishlist(product: Product) {
    console.log(product);
    const theWishList = new Wishlist(product);
    this.getWishlistCount();
    this.wishListService.addNewWishlist(product);
    this.getWishlistCount();
    alert("Product Added to wishlist!")
  }

  addtocart(product: any) {
    this.getCount();
    this.CartService.addCartList(product);
    this.getCount();
    alert("Product Added to cart! Proceed to checkout");
  }

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredSearchValue)
    console.log(this.enteredSearchValue)
    this.categories = this.products.filter((a: any) => {
      if (a.productName.toLowerCase().includes(this.enteredSearchValue) || this.enteredSearchValue == '') {
        return a;
      }
    })

  }

  public getCount() {
    this.CartService.getCartList().subscribe(res => {
      this.cartList = res
      this.totalItem = this.cartList.length;
    });
  }

  public getWishlistCount() {
    this.wishListService.getWishlist().subscribe(res => {
      this.wish = res
      this.wishlistItem = this.wish.length;
    });

  }

  public sortingPriceRange(option: String) {

    if (option == '0') {
      this.categories.sort((a: any, b: any) => Number(a.productDiscountedPrice) - Number(b.productDiscountedPrice));
    } else if (option == '1') {
      this.categories.sort((a: any, b: any) => Number(b.productDiscountedPrice) - Number(a.productDiscountedPrice));
    }
  }

  shoponCategory(category: string) {
    console.log(category);
    this.categories = this.products.filter((a: any) => {
      if (a.productCategory == category || category == '') {
        return a;
      }
    })
  }
}