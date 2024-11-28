import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface TopicDto {
  id: number;
  title: string;
  content: string;
  groupId: number;
  createdAt: string;
  updatedAt: string;
  userId?: number;
  userName?: string;
}

export interface CreateTopicDto {
  title: string;
  content: string;
  groupId: number;
}

export interface UpdateTopicDto {
  title?: string;   // A propriedade pode ser opcional para que possamos atualizar apenas o título
  content?: string; // O conteúdo também pode ser opcional
}

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private readonly apiUrl = 'https://localhost:7071/api/topics'; // URL base fixa da API de tópicos

  constructor(private http: HttpClient) { }

  // Método para buscar um tópico específico por ID
  getTopicById(id: number): Observable<TopicDto> {
    return this.http.get<TopicDto>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para buscar tópicos de um grupo específico
  getTopicsByGroupId(groupId: number): Observable<TopicDto[]> {
    return this.http.get<TopicDto[]>(`${this.apiUrl}/group/${groupId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para criar um novo tópico
  createTopic(topicDTO: { title: string, content: string, groupId: number, userId: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, topicDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError((error) => {
        console.error('Erro ao criar tópico:', error);
        throw error;
      })
    );
  }

  // Método para atualizar um tópico
  updateTopic(id: number, updateTopicDto: UpdateTopicDto): Observable<TopicDto> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<TopicDto>(`${this.apiUrl}/${id}`, updateTopicDto, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para deletar um tópico
  deleteTopic(id: number): Observable<void> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para pegar os tópicos mais recentes
  getRecentTopics(limit: number = 5): Observable<TopicDto[]> {
    return this.http.get<TopicDto[]>(`${this.apiUrl}/recent?limit=${limit}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para pegar o token armazenado no localStorage
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsersByIds(userIds: number[]): Observable<any[]> {
    const userIdsParam = userIds.join(',');
    return this.http.get<any[]>(`${this.apiUrl}/users?ids=${userIdsParam}`).pipe(
      catchError(this.handleError)
    );
  }

  // Tratamento de erros para todas as requisições
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido';
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente ou rede
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    // Logar o erro no console
    console.error('Ocorreu um erro:', errorMessage);
    return throwError(() => new Error('Erro ao realizar a operação. Por favor, tente novamente.'));
  }
}
