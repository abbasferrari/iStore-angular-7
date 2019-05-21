import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, ObservableLike } from 'rxjs';
import { Item } from './ad-dashboard/Item';
import { Transaction } from './order-checkout/TransactionObject';
import { Ad } from './Ad';
@Injectable({
  providedIn: 'root'
})
export class AdServiceService {
  private showad_url = "https://lit-eyrie-15561.herokuapp.com/showAds";//"http://localhost:8080/showAds";
  private postad_url = "https://lit-eyrie-15561.herokuapp.com/postAd";//"http://localhost:8080/postAd";
  private soldad_url = "https://lit-eyrie-15561.herokuapp.com/updateAdStatus";//"http://localhost:8080/updateAdStatus";
  private checkout_url = "https://lit-eyrie-15561.herokuapp.com/checkOutAd";//*/"http://localhost:8080/checkOutAd";
  private getTransId_url = "https://lit-eyrie-15561.herokuapp.com/getTransId";//*/"http://localhost:8080/getTransId";
  private c_url = "http://localhost:8080/c";

  constructor(private http:HttpClient) { }
  
  public postAd(ad : Ad){
    return this.http.post<Ad>(this.postad_url,ad);
  }
  public showAds():Observable<Item []>{
    return this.http.get<Item []>(this.showad_url);
  }
  public c(s : string){
    return this.http.post<string>(this.c_url,"done");//"{\"id\":\"123\",\"tempId\":\"123\",\"buyerId\":\"123\",\"timestamp\":\"123\"}");
  }
  public checkOutAd(transaction : Transaction){
    return this.http.post<Transaction>(this.checkout_url,transaction);
  }
  public getTransId(transaction : Transaction){
    return this.http.post<string>(this.getTransId_url,transaction);
  }
  public soldAd(ad : String){
    return this.http.post<String>(this.soldad_url,ad);
  }
  public show():Observable<Item>{
    return this.http.get<Item>(this.showad_url);
  }
}
