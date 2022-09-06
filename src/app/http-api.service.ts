import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {
  constructor(private http: HttpClient) {}

  public postData(data:any): Observable<any> {
    return this.http.post('http://localhost:3000/studentInfo/', data);
  }
  public getData(): Observable<any> {
    return this.http.get('http://localhost:3000/studentInfo/');
  }
  public putData(data:any, id:number): Observable<any> {
    return this.http.put('http://localhost:3000/studentInfo/'+id, data);
  }
  public deleteData(id:number): Observable<any> {
    return this.http.delete('http://localhost:3000/studentInfo/'+id);
  }
}
