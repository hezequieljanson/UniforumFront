import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar-footer/navbar/navbar.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Altere para o caminho correto
import { FormsModule } from '@angular/forms'; // Importante para usar ngModel

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const credentials = { name: this.name, email: this.email, password: this.password };
    this.authService.register(credentials).subscribe({
      next: response => {
        console.log('Registro realizado com sucesso:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro ao registrar:', error);
        // Aqui você pode acessar `error.error` para ver os detalhes da resposta do servidor
        if (error.error && error.error.errors) {
          // Se houver erros de validação, você pode exibi-los
          console.error('Erros de validação:', error.error.errors);
        } else {
          // Caso contrário, mostre uma mensagem genérica
          alert('Erro ao cadastrar: ' + error.message);
        }
      }
    });
  }

  redirectToOtherPage(path: string) {
    this.router.navigate([path]);
  }
}
