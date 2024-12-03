import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicService, TopicDto } from '../../services/topic.service';
import { CommentService, CommentReadDTO } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { TopicCardComponent } from '../../components/cards/topic-card/topic-card.component';
import { NavbarComponent } from '../../components/navbar-footer/navbar/navbar.component';
import { CommentContainerComponent } from '../../components/cards/comment-container/comment-container.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [CommonModule, TopicCardComponent, NavbarComponent, CommentContainerComponent, FormsModule],
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  topic: TopicDto | null = null;  // Armazenando o tópico carregado
  comments: CommentReadDTO[] = [];  // Lista de comentários
  newCommentContent: string = '';  // Conteúdo do novo comentário
  errorMessage: string = '';  // Mensagem de erro ao criar comentário
  isLoggedIn: boolean = false;  // Variável para controlar a exibição do campo de comentário

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Verifica se o usuário está logado
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loadTopic();
    this.loadComments();
  }

  // Carregar o tópico com base no ID da URL
  loadTopic(): void {
    const topicId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(topicId)) {
      this.errorMessage = 'ID de tópico inválido';
      return;
    }

    this.topicService.getTopicById(topicId).subscribe(
      (topic) => {
        this.topic = topic;
      },
      (error) => {
        this.errorMessage = 'Erro ao carregar o tópico';
      }
    );
  }

  // Carregar os comentários para o tópico
  loadComments(): void {
    const topicId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(topicId)) {
      this.errorMessage = 'ID de tópico inválido';
      return;
    }

    this.commentService.getCommentsByTopic(topicId).subscribe(
      (comments) => {
        this.comments = comments;
      },
      (error) => {
        this.errorMessage = 'Erro ao carregar os comentários';
      }
    );
  }

  // Criar um novo comentário
  createComment(): void {
    if (!this.authService.isLoggedIn()) {
      this.errorMessage = 'Você precisa estar logado para comentar.';
      return;
    }

    if (!this.newCommentContent.trim()) {
      this.errorMessage = 'O conteúdo do comentário não pode ser vazio.';
      return;
    }

    const topicId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(topicId)) {
      this.errorMessage = 'ID de tópico inválido';
      return;
    }

    this.commentService.createComment(this.newCommentContent, topicId).subscribe(
      (newComment) => {
        this.comments.push(newComment);  // Adiciona o novo comentário
        this.newCommentContent = '';    // Limpa o campo de comentário
        this.errorMessage = '';         // Limpa a mensagem de erro
      },
      (error) => {
        this.errorMessage = 'Erro ao criar comentário. Tente novamente.';
      }
    );
  }
}
