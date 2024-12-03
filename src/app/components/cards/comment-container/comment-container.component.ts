import { Component, Input } from '@angular/core';
import { CommentReadDTO } from '../../../services/comment.service';  // Importa o DTO de comentário
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-container.component.html',
  styleUrls: ['./comment-container.component.scss']
})
export class CommentContainerComponent {
  @Input() comments: CommentReadDTO[] = [];  // Recebe a lista de comentários como uma propriedade de entrada

  // Método para formatar a data de acordo com o fuso horário de São Paulo (Brasil)
  formatDate(date: string): string {
    const formattedDate = new Date(date);

    // Formatar a data para o Brasil, fuso horário São Paulo (UTC-3)
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Para usar o formato 24 horas
    };

    // Formatar a data para o fuso horário de São Paulo (GMT-3)
    const dateFormatter = new Intl.DateTimeFormat('pt-BR', options);
    const localDate = dateFormatter.format(formattedDate);

    return localDate;
  }
}
