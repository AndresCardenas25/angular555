import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { environment } from './../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { checkTime } from './../interceptors/time.interceptor'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/products`;

  constructor( private http: HttpClient) { }

  getAllProducts(limit?: number, offset?: number ){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(this.apiUrl, {params, context: checkTime()})
    .pipe(
      map(products => products.map(item => {
        return {
          ...item,
          taxes: 0.19 * item.price
        }
      }))
    );
  }

  getProduct(id: string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { context: checkTime()})
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if( error.status === HttpStatusCode.Conflict){
          return throwError(() => 'Algo esta fallando en el server');
        }
        if( error.status === HttpStatusCode.NotFound){
          return throwError(() => 'El producto no existe')
        }
        if( error.status === HttpStatusCode.Unauthorized){
          return throwError(() => 'No esta autorizado')
        }
        return throwError(() => 'Ups algo salio mal')
      })
    )
  }

  getProductByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset }
    });
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateProductDTO ){
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
