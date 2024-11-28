import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface UpdateProfileData {
  name: string;
  email: string;
  password?: string; // Campo opcional para a senha
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly apiUrl = 'https://localhost:7071/api/auth'; // Base URL para facilitar a manutenção

  constructor(private http: HttpClient) { }

  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const decoded: any = jwtDecode(token);  // Decodifica o token JWT
      return decoded.id || null;  // Retorna o ID do usuário
    } catch (e) {
      console.error('Erro ao decodificar o token', e);
      return null;
    }
  }

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      catchError(this.handleError)
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getUserInfo(): Observable<any> {
    const token = this.getToken();
    return this.http.get<any>(`${this.apiUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  register(credentials: RegisterCredentials): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, credentials).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Aqui você pode adicionar lógica para logar o erro ou notificar o usuário
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Erro de rede ou servidor; por favor, tente novamente.'));
  }

  updateProfile(updateData: UpdateProfileData): Observable<any> {
    const token = this.getToken();
    return this.http.put(`${this.apiUrl}/profile-update`, updateData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }
}
