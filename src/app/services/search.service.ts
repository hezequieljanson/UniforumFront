import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'https://localhost:7071/api/search/search';  // URL da sua API

  constructor(private http: HttpClient) { }

  search(query: string, page: number = 1, pageSize: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(this.apiUrl, { params });
  }
}
