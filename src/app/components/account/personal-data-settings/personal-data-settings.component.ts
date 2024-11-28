import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Adicione esta importação
import { FormsModule } from '@angular/forms'; // Importa o FormsModule
import { AuthService } from '../../../services/auth.service'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-personal-data-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personal-data-settings.component.html',
  styleUrls: ['./personal-data-settings.component.scss']
})
export class PersonalDataSettingsComponent implements OnInit {
  userInfo: any = {
    nome: '',
    email: '',
    senha: ''
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    if (this.authService.isLoggedIn()) {
      // Aqui você deve ter um método no AuthService para pegar os dados do usuário
      this.authService.getUserInfo().subscribe(
        data => {
          this.userInfo = data; // Ajuste isso de acordo com a estrutura do seu objeto de usuário
        },
        error => {
          console.error('Erro ao buscar informações do usuário', error);
        }
      );
    }
  }

  saveChanges() {
    const updateData = {
        name: this.userInfo.name,
        email: this.userInfo.email,
        password: this.userInfo.password || null
    };

    this.authService.updateProfile(updateData).subscribe(
        () => alert("Perfil atualizado com sucesso!"),
        (error) => console.error("Erro ao atualizar perfil:", error)
    );
  }

}
