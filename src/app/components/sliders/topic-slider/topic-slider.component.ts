import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { TopicService, TopicDto } from '../../../services/topic.service';  // Importando o serviço de tópicos
import { CommonModule } from '@angular/common';
import { TopicCardComponent } from '../../cards/topic-card/topic-card.component';  // Importando o componente TopicCard
import { AuthService } from '../../../services/auth.service';  // Importando o AuthService

@Component({
  selector: 'app-topic-slider',
  standalone: true,
  imports: [CommonModule, TopicCardComponent],  // Importando o componente TopicCard
  templateUrl: './topic-slider.component.html',
  styleUrls: ['./topic-slider.component.scss']
})
export class TopicSliderComponent implements OnInit {
  @ViewChild('carousel') carousel!: ElementRef;
  recentTopics: TopicDto[] = [];  // Array para armazenar os tópicos recentes
  errorMessage: string = '';  // Mensagem de erro para mostrar caso algo falhe

  constructor(
    private topicService: TopicService,
    private authService: AuthService  // Injetando o AuthService para pegar o userId
  ) {}

  ngOnInit(): void {
    // Carregar os tópicos recentes na inicialização
    this.loadRecentTopics();
  }

  // Carregar os tópicos recentes
  loadRecentTopics(): void {
    this.topicService.getRecentTopics(5).subscribe(
      (topics) => {
        this.recentTopics = topics;

        // Verifique os tópicos carregados e seus IDs
        console.log("Tópicos carregados:", this.recentTopics);

        // Verifique o userId de cada tópico
        this.recentTopics.forEach(topic => {
          console.log(`Tópico ${topic.id}: userId = ${topic.userId}`);
        });

        this.loadUserNamesForTopics(topics);  // Carregar os nomes dos usuários
      },
      (error) => {
        console.error('Erro ao carregar tópicos recentes:', error);
        this.errorMessage = 'Erro ao carregar tópicos recentes. Tente novamente mais tarde.';
      }
    );
  }

  // Função para carregar os nomes dos usuários para os tópicos
  loadUserNamesForTopics(topics: TopicDto[]): void {
    // Para tópicos com userId igual a 0 ou undefined, atribuir um nome fictício
    topics.forEach((topic, index) => {
      if (!topic.userId || topic.userId === 0) {
        topic.userName = 'Usuário não identificado';  // Atribuindo um nome fictício
      } else {
        // Aqui estamos chamando o método getUserById do AuthService
        this.authService.getUserById(topic.userId).subscribe(
          (user) => {
            console.log(`Usuário encontrado para o tópico ${topic.id}:`, user);
            // Atribuindo o nome do usuário ao tópico
            this.recentTopics[index].userName = user.name || 'Nome não disponível';
          },
          (error) => {
            console.error('Erro ao carregar o usuário para o tópico', topic.id, error);
            this.recentTopics[index].userName = 'Usuário não encontrado';
          }
        );
      }
    });
  }

  // Função para rolar o carrossel para a esquerda
  scrollLeft(): void {
    this.carousel.nativeElement.scrollBy({ left: -800, behavior: 'smooth' });
  }

  // Função para rolar o carrossel para a direita
  scrollRight(): void {
    this.carousel.nativeElement.scrollBy({ left: 800, behavior: 'smooth' });
  }
}
