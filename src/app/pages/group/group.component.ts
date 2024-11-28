import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { TopicService } from '../../services/topic.service'; // Serviço de tópicos
import { NavbarComponent } from '../../components/navbar-footer/navbar/navbar.component';
import { TopicCardComponent } from '../../components/cards/topic-card/topic-card.component';
import { CreateTopicFormComponent } from '../../components/create-topic-form/create-topic-form.component'; // Importando o componente do formulário
import { AuthService } from '../../services/auth.service'; // Importe o serviço de autenticação
import { CommonModule } from '@angular/common'; // Certifique-se de importar o CommonModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-group',
  standalone: true, // Modo standalone
  imports: [
    NavbarComponent,
    TopicCardComponent,
    CreateTopicFormComponent,
    CommonModule,  // Importa o CommonModule para usar o ngIf, ngFor, etc.
    FormsModule
  ],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  groupId!: number;
  group: any;
  isLoading: boolean = true;
  errorMessage: string = '';
  isCreateTopicFormVisible: boolean = false; // Controla a visibilidade do formulário de criação de tópico
  isUserLoggedIn: boolean = false; // Variável para verificar se o usuário está logado

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private topicService: TopicService, // Serviço de tópicos
    private router: Router,
    private authService: AuthService // Injetar o serviço de autenticação
  ) {}

  ngOnInit(): void {
    // Verifique se o usuário está logado
    this.isUserLoggedIn = this.authService.isLoggedIn();

    // Captura o ID do grupo da URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.groupId = +id;
        this.loadGroupDetails();  // Carrega as informações do grupo
      } else {
        this.errorMessage = 'ID do grupo não encontrado.';
        this.isLoading = false;
      }
    });
  }

  // Carregar os detalhes do grupo
  loadGroupDetails(): void {
    this.isLoading = true;

    // Carregar os dados do grupo
    this.groupService.getGroupById(this.groupId).subscribe(
      (groupData) => {
        this.group = groupData;

        // Carregar os tópicos do grupo
        this.topicService.getTopicsByGroupId(this.groupId).subscribe(
          (topicsData) => {
            this.group.topics = topicsData;  // Adiciona os tópicos ao grupo
            this.isLoading = false;
          },
          (error) => {
            this.isLoading = false;
            this.errorMessage = 'Erro ao carregar os tópicos do grupo. Tente novamente.';
            console.error(error);
          }
        );
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao carregar os dados do grupo. Tente novamente.';
        console.error(error);
      }
    );
  }

  // Abrir o formulário de criação de tópico
  openCreateTopicForm(): void {
    if (!this.isUserLoggedIn) {
      this.errorMessage = 'Você precisa estar logado para criar um tópico.';
      return;
    }
    this.isCreateTopicFormVisible = true;  // Torna o formulário visível
  }

  // Fechar o formulário de criação de tópico
  closeCreateTopicForm(): void {
    this.isCreateTopicFormVisible = false;  // Fecha o formulário
  }

  // Função chamada quando o evento de criação de tópico é emitido
  onCreateTopic(newTopic: { title: string; content: string }): void {
    if (!newTopic.title || !newTopic.content) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    // Obtendo o userId do token
    const userId = this.authService.getUserIdFromToken();

    if (!userId) {
      this.errorMessage = 'ID do usuário não encontrado.';
      return;
    }

    const createTopicDto = {
      title: newTopic.title,
      content: newTopic.content,
      groupId: this.groupId,
      userId: userId  // Adicionando o UserId aqui
    };

    console.log('Criando tópico com o DTO:', createTopicDto);

    this.topicService.createTopic(createTopicDto).subscribe(
      (createdTopic) => {
        this.group.topics.push(createdTopic);  // Adiciona o novo tópico à lista de tópicos do grupo
        this.closeCreateTopicForm();  // Fecha o formulário após a criação
      },
      (error) => {
        console.error('Erro ao criar o tópico', error);
        this.errorMessage = 'Erro ao criar o tópico. Tente novamente.';
      }
    );
  }

  // Função chamada para fechar o modal quando cancelado
  onCloseModal(): void {
    this.closeCreateTopicForm();  // Fecha o formulário de criação de tópico
  }
}
