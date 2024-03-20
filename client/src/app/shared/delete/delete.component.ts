import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './delete.component.html',
  styleUrl: `./delete.component.scss`,
})
export class DeleteComponent implements OnInit {
  recipeId: string = '';
  @Output() closeModal = new EventEmitter<boolean>();

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.recipeId = params.get('recipeId') || '';
    });
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipeId).subscribe({
      next: () => {
        this.notificationService.setNotification({
          message: 'Recipe deleted successfully',
          type: 'success',
        });

        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        this.notificationService.setNotification({
          message: `There was a problem deleting the recipe
          ${error.message}`,
          type: 'error',
        });
      },
    });
  }

  onClose(confirmed: boolean) {
    if (confirmed) {
      this.onDelete();
    } else {
      this.router.navigate([`/recipes/${this.recipeId}/details`]);
    }
  }
}
