import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

const API = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api/aparelhos/';
  private estadosUrl = 'http://localhost:8000/api/estados/';  // URL fictícia para estados
  private bandeirasUrl = 'http://localhost:8000/api/bandeiras/';  // URL fictícia para bandeiras

  constructor(private http: HttpClient) {}

  getAparelhos(params: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  addAparelho(aparelho: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, aparelho);
  }

  deleteAparelho(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }

  // Novo método para pegar estados
  getEstados(): Observable<any[]> {
    return this.http.get<any[]>(this.estadosUrl);
  }

  // Novo método para pegar bandeiras
  getBandeiras(): Observable<any[]> {
    return this.http.get<any[]>(this.bandeirasUrl);
  }
  getAmbientes(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/ambientes/');
  }

  updateAparelho(id: number, aparelho: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}${id}/`, aparelho);
  }
}
