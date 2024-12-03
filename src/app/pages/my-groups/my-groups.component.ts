import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../../services/group.service';  // Certifique-se de ter o GroupService
import { NavbarComponent } from '../../components/navbar-footer/navbar/navbar.component';  // Importando o NavbarComponent
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/navbar-footer/footer/footer.component';

@Component({
  selector: 'app-my-groups',
  standalone: true,  // Marca como standalone component
  imports: [NavbarComponent, CommonModule, FooterComponent],  // Incluindo NavbarComponent
  templateUrl: './my-groups.component.html',  // Caminho do template
  styleUrls: ['./my-groups.component.scss']  // Estilos do componente
})
export class MyGroupsComponent implements OnInit {
  createdGroups: any[] = [];  // Array para armazenar os grupos criados

  constructor(private router: Router, private groupService: GroupService) {}

  ngOnInit(): void {
    this.loadCreatedGroups();  // Carregar os grupos ao inicializar o componente
  }

  // Método para carregar os grupos criados pelo usuário
  loadCreatedGroups(): void {
    this.groupService.getCreatedGroups().subscribe(
      (data) => {
        this.createdGroups = data;  // Atualiza o array com os dados dos grupos criados
      },
      (error) => {
        console.error('Erro ao carregar os grupos criados:', error);
      }
    );
  }

  // Método para visualizar um grupo ao clicar nele
  viewGroup(groupId: number): void {
    this.router.navigate([`/group/${groupId}`]);
  }

  // Redireciona para a página de criação de grupo
  redirectToCreateGroup(): void {
    this.router.navigate(['/create-group']);
  }
}
