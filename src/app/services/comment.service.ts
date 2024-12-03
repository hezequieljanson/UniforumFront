import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Importe o AuthService

// DTOs
export interface CommentReadDTO {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
  topicId: number;
  userName?: string;  // Adicionando o nome do usuário aqui
}


export interface CommentCreateDTO {
  content: string;
  userId: number; // Agora, incluímos o userId
  topicId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'https://localhost:7071/api/comments'; // URL fixa da API

  constructor(
    private http: HttpClient,
    private authService: AuthService // Injete o AuthService
  ) {}

  // Método para pegar todos os comentários de um tópico
  getCommentsByTopic(topicId: number): Observable<CommentReadDTO[]> {
    return this.http.get<CommentReadDTO[]>(`${this.apiUrl}/topic/${topicId}`);
  }

  // Método para criar um comentário
  createComment(content: string, topicId: number): Observable<CommentReadDTO> {
    const userId = this.authService.getUserIdFromToken(); // Pega o userId do token

    if (!userId) {
      throw new Error('Usuário não autenticado');
    }

    const comment: CommentCreateDTO = {
      content,
      userId, // Passa o userId para o comentário
      topicId
    };

    return this.http.post<CommentReadDTO>(this.apiUrl, comment, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    });
  }

  // Método para atualizar um comentário
  updateComment(id: number, comment: CommentCreateDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, comment);
  }

  // Método para deletar um comentário
  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
