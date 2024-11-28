import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar-footer/navbar/navbar.component';
import { FooterComponent } from '../../components/navbar-footer/footer/footer.component';
import { TopicSliderComponent } from '../../components/sliders/topic-slider/topic-slider.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RecentGroupsComponent } from '../../components/recent-groups/recent-groups.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, TopicSliderComponent, RecentGroupsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  }

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
}
