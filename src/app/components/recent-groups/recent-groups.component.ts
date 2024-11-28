import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../services/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent-groups',
  standalone: true,
  imports: [CommonModule],  // Importando CommonModule para usar ngIf, ngFor
  templateUrl: './recent-groups.component.html',
  styleUrls: ['./recent-groups.component.scss']
})
export class RecentGroupsComponent implements OnInit {
  recentGroups: any[] = [];  // Grupos recentes

  constructor(
    private router: Router,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.loadRecentGroups();  // Carregar os grupos quando o componente for inicializado
  }

  // Função para carregar os grupos mais recentes
  loadRecentGroups(): void {
    this.groupService.getRecentGroups().subscribe(
      (groups) => {
        this.recentGroups = groups;  // Armazenar os grupos recentes
      },
      (error) => {
        console.error('Erro ao carregar grupos recentes:', error);
      }
    );
  }

  // Função para visualizar um grupo ao clicar nele
  viewGroup(groupId: number): void {
    this.router.navigate([`/group/${groupId}`]);
  }
}
