import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { LikedMusic } from '../model/liked-music';
import { PurchasedMusic } from '../model/purchased-music';
import { SharedMusic } from '../model/shared-music';
import { STORAGE_KEY } from '../util/constant';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url = "http://localhost:4444/customer/";
  
  constructor(private http: HttpClient) { }

  createCustomer(customer:Customer){
    return this.http.post<boolean>(this.url + 'createCustomer',customer);
  }

  updateCustomer(customer:Customer){
    return this.http.patch<Customer>(this.url + 'updateCustomer',customer);
  }

}
