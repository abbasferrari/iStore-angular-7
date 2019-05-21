import { Component, OnInit } from '@angular/core';
import { Item } from './Item';
import { AdServiceService } from '../ad-service.service';
import { UserauthService } from '../userauth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderItem } from './order';
import { strictEqual } from 'assert';
import { stringify } from 'querystring';
@Component({
  selector: 'app-ad-dashboard',
  templateUrl: './ad-dashboard.component.html',
  styleUrls: ['./ad-dashboard.component.css']
})
export class AdDashboardComponent implements OnInit {
  
  public ads : Item[] = [];
  public ad : Item;
  public temp : string = localStorage.getItem("logFlag") ;
  public userId : string = localStorage.getItem('userId');
  private obj  = new OrderItem();
  public ele : any ;
  public accDetails : boolean[] = [true,true,true,true]; //Login MyOrders MyAds Logout 
  constructor(private adservice : AdServiceService, private router : Router) {
    this.showAds();
    if (this.userId != null) {
      this.accDetails[0] = false;
      this.accDetails[1] = true;
      this.accDetails[2] = true;
      this.accDetails[3] = true;
    }
    else{
      this.accDetails[0] = true;
      this.accDetails[1] = false;
      this.accDetails[2] = false;
      this.accDetails[3] = false;
    }
  }
  show(){
    this.adservice.show().subscribe((data : Item) => this.ad = data);
  }
  postAd(){
    this.ele = document.getElementById('ad-dashboard-div');
    this.ele.parentNode.removeChild(this.ele);
    this.router.navigateByUrl('/postad');
  }
  login(){
    this.ele = document.getElementById('ad-dashboard-div');
    this.ele.parentNode.removeChild(this.ele);
    this.router.navigateByUrl("/login");
  }

  getOut(){
    this.ele = document.getElementById('ad-dashboard-div');
    this.ele.parentNode.removeChild(this.ele);
    
    this.router.navigateByUrl('/logout');
  }

  buyNow(item_id : string,seller_id : string,price : number){
    if (this.userId != null) {console.log("Buying now" + item_id + seller_id + price+"");
      this.obj.price = price;
      this.obj.item_id = item_id;
      localStorage.setItem('sellerId',seller_id);
      localStorage.setItem('orderObj',JSON.stringify(this.obj));
      this.ele = document.getElementById('ad-dashboard-div');
      this.ele.parentNode.removeChild(this.ele);
      this.router.navigateByUrl('/checkout');
    }
    else{ window.alert("Please sign in to buy your item"); 
    this.ele = document.getElementById('ad-dashboard-div');
    this.ele.parentNode.removeChild(this.ele);
    
    this.router.navigateByUrl('/login');}
  }
  showAds(){
    this.adservice.showAds().subscribe((ad_data : Item[]) => {
      this.ads = ad_data;
      //this.temp = JSON.stringify(this.ads);
      console.log(this.temp);
      console.log(JSON.stringify(this.ads));
    } );
    //this.adservice.show().subscribe((data) => {return this.ad = data});
  }


  ngOnInit() {
    
  }
  
  
  

}
