import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service'; // Ajuste o caminho conforme necessário
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  userName: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    if (this.authService.isLoggedIn()) {
      this.authService.getUserInfo().subscribe(
        userInfo => {
          this.userName = userInfo.name; // Supondo que o nome do usuário está na propriedade 'name'
        },
        error => {
          console.error('Erro ao obter informações do usuário', error);
        }
      );
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  redirectToOtherPage(path: string) {
    this.router.navigate([path]);
  }
}
