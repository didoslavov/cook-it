import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  xIcon = faXmark;

  @Input() recipeId?: string;

  @Output() closeModal = new EventEmitter<boolean>();

  onClose(confirmed: boolean) {
    this.closeModal.emit(confirmed);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscKeydown(event: KeyboardEvent): void {
    this.onClose(false);
  }
}
