import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar-footer/navbar/navbar.component';
import { FooterComponent } from '../../components/navbar-footer/footer/footer.component';
import { TopicSliderComponent } from '../../components/sliders/topic-slider/topic-slider.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RecentGroupsComponent } from '../../components/recent-groups/recent-groups.component';
import { SearchService } from '../../services/search.service';  // Importando o serviço de busca
import { FormsModule } from '@angular/forms';  // Importando o FormsModule para usar ngModel

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    TopicSliderComponent,
    RecentGroupsComponent,
    FormsModule  // Certifique-se de que o FormsModule está aqui
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  query: string = '';  // Variável para armazenar a pesquisa
  searchResults: any = { topics: [], groups: [] };  // Armazena os resultados da pesquisa
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private searchService: SearchService  // Injetando o serviço de pesquisa
  ) {}

  ngOnInit(): void {}

  // Função para redirecionar ao clicar em um grupo
  viewGroup(groupId: number): void {
    this.router.navigate([`/group/${groupId}`]);
  }

  // Função para redirecionar para outras páginas
  redirectToOtherPage(path: string): void {
    this.router.navigate([path]);
  }

  // Verifica se o usuário está logado
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Função para logout
  logout(): void {
    this.authService.logout();
  }

  // Função que será chamada tanto ao digitar quanto ao clicar no ícone de pesquisa
  onSearch(): void {
    if (!this.query.trim()) {
      this.searchResults = { topics: [], groups: [] };  // Limpa os resultados se a pesquisa estiver vazia
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    // Chama o serviço de busca passando a query
    this.searchService.search(this.query).subscribe(
      (response) => {
        this.searchResults = response;  // Armazena os resultados da pesquisa
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Erro ao buscar dados.';
        this.loading = false;
      }
    );
  }
}
