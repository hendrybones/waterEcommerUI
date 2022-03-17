import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { CartService } from 'src/app/service/cart.service';


@NgModule({
  imports: [CommonModule]

})
export class ProductsModule { }

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  public totalItem :number =0;
  api: any;
  searchTerm!: string;
  constructor(private cartService: CartService) { }
  

  ngOnInit(): void {
    this.cartService.getProducts()
    // .subscribe((res: string | any[])=>{
    //   this.totalItem = res.length;
    // })
    
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

}
