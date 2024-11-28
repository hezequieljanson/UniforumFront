import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GroupService } from '../../services/group.service';
import { NavbarComponent } from "../../components/navbar-footer/navbar/navbar.component";
import { FooterComponent } from "../../components/navbar-footer/footer/footer.component"; // Certifique-se de que o caminho está correto
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-group',
  standalone: true,
  imports: [FormsModule, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent {
  groupName: string = '';
  groupDescription: string = '';

  constructor(private groupService: GroupService, private router: Router) {}

  createGroup(): void {
    const groupData = {
      name: this.groupName,
      description: this.groupDescription
    };

    this.groupService.createGroup(groupData).subscribe({
      next: (response) => {
        console.log('Grupo criado com sucesso:', response);
        this.router.navigate(['/my-groups']); // Redireciona para a página de grupos após a criação
      },
      error: (error) => {
        console.error('Erro ao criar grupo:', error);
        alert('Ocorreu um erro ao criar o grupo. Por favor, tente novamente.');
      }
    });
  }

  cancel() {
    this.router.navigate(['/my-groups']); // Redireciona para a página de "Meus Grupos"
  }
}
