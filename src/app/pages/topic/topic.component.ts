import { Component, Input } from '@angular/core';
import { NavbarComponent } from '../../components/navbar-footer/navbar/navbar.component';
import { TopicContainerComponent } from '../../components/cards/topic-container/topic-container.component';
import { CommentContainerComponent } from '../../components/cards/comment-container/comment-container.component';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [NavbarComponent, TopicContainerComponent, CommentContainerComponent],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss'
})
export class TopicComponent {
  @Input() topic: any;

}
