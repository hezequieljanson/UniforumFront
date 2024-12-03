import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-topic-card',
  standalone: true,
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss']
})
export class TopicCardComponent implements OnInit {
  @Input() topic: any;  // Recebe os dados do tópico (usuário, conteúdo, etc.)
  userName: string = ''; // Variável para armazenar o nome do usuário

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    if (this.topic?.userId && this.topic.userId !== 0) {
      // Caso o nome do usuário não tenha sido carregado anteriormente, chama novamente o serviço
      if (!this.userName) {
        this.loadUserName(this.topic.userId);
      }
    } else {
      this.userName = 'Usuário não identificado';  // Caso o userId seja 0 ou undefined, mostra uma mensagem padrão
    }
  }

  loadUserName(userId: number): void {
    this.authService.getUserById(userId).subscribe(
      (user) => {
        this.userName = user.name || 'Nome não disponível'; // Armazena o nome do usuário
      },
      (error) => {
        console.error('Erro ao buscar usuário', error);
        this.userName = 'Erro ao carregar nome'; // Em caso de falha, exibe uma mensagem de erro
      }
    );
  }

  // Método para redirecionar para a página de detalhes do tópico
  redirectToTopicPage(topicId: number): void {
    this.router.navigate([`/topic/${topicId}`]);  // Redireciona para a página do tópico com o id
  }
}
