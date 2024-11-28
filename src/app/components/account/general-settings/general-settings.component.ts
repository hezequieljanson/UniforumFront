import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service'; // Ajuste o caminho conforme necessário
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-settings',
  standalone: true,
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent {

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redireciona para a página de login após logout
  }
}
