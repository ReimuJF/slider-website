import {Injectable, NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule]
})
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {}

  sendOrder(data: any){
    return this.http.post('https://testologia.site/burgers-order', data);
  }

  getItemsProd(): Observable<any> {
    return this.http.get<any[]>('https://testologia.site/burgers-data?extra=black');
  }

  getItemsWhy(): Observable<any> {
    return this.http.get<any[]>('./assets/scripts/why.json');
  }
}
