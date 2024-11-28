import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importar CommonModule para ngIf, ngFor e outros diretivas essenciais
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-topic-form',
  standalone: true,  // Define que o componente é standalone
  imports: [CommonModule, FormsModule],  // Importa CommonModule para permitir o uso de diretivas como ngIf e ngFor
  templateUrl: './create-topic-form.component.html',
  styleUrls: ['./create-topic-form.component.scss']
})
export class CreateTopicFormComponent {
  @Output() createTopicEvent = new EventEmitter<any>();
  @Output() closeModalEvent = new EventEmitter<void>();

  newTopic = { title: '', content: '' };
  errorMessage: string = '';  // Variável para mensagens de erro

  createTopic(form: NgForm): void {
    // Valida se o formulário é válido
    if (form.valid) {
      // Emite o evento com o novo tópico para o componente pai
      this.createTopicEvent.emit(this.newTopic);
      this.closeModal();  // Fecha o modal após criar o tópico
      this.clearForm();  // Limpa o formulário após enviar
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
    }
  }

  closeModal(): void {
    this.closeModalEvent.emit();  // Emite o evento para fechar o modal
  }

  clearForm(): void {
    // Limpa os campos do formulário
    this.newTopic = { title: '', content: '' };
    this.errorMessage = '';  // Limpa a mensagem de erro
  }
}
