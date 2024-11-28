import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar-footer/navbar/navbar.component';
import { FooterComponent } from '../../components/navbar-footer/footer/footer.component';
import { CommonModule } from '@angular/common';

interface FAQ {
  question: string;
  answer: string;
  open: boolean; // Para controlar se a resposta está aberta
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqs: FAQ[] = [
    {
      question: 'Como posso criar uma conta?',
      answer: 'Para criar uma conta, clique em "Registrar" na página inicial e siga as instruções.',
      open: false
    },
    {
      question: 'Como redefinir minha senha?',
      answer: 'Clique em "Esqueceu sua senha?" na tela de login e siga as instruções enviadas para seu e-mail.',
      open: false
    },
    {
      question: 'Como entrar em contato com o suporte?',
      answer: 'Você pode entrar em contato com o suporte através da seção "Contato" em nosso site.',
      open: false
    },
    {
      question: 'Quais métodos de pagamento são aceitos?',
      answer: 'Aceitamos cartões de crédito, débito e PayPal.',
      open: false
    },
    // Adicione mais perguntas conforme necessário
  ];
}
