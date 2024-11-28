import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = 'https://localhost:7071/api/groups';

  constructor(private http: HttpClient) { }

  // Método para criar grupo
  createGroup(groupData: { name: string; description: string }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.apiUrl, groupData, { headers });
  }

  // Método para obter todos os grupos
  getAllGroups(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Método para obter um grupo específico por ID
  getGroupById(groupId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/${groupId}`, { headers });
  }

  // Método para atualizar um grupo
  updateGroup(groupId: number, groupData: { name: string; description: string }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<any>(`${this.apiUrl}/${groupId}`, groupData, { headers });
  }

  // Método para excluir um grupo
  deleteGroup(groupId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<any>(`${this.apiUrl}/${groupId}`, { headers });
  }

  getCreatedGroups(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Passa o token para autenticação
    });

    return this.http.get<any>(`${this.apiUrl}/created`, { headers });  // Chama o endpoint de grupos criados
  }

  getRecentGroups(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Passa o token para autenticação
    });

    return this.http.get<any[]>(`${this.apiUrl}/recent`, { headers });  // Chama o endpoint de grupos recentes
  }
}
