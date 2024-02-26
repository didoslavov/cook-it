import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './delete.component.html',
  styleUrl: `./delete.component.scss`,
})
export class DeleteComponent {}
