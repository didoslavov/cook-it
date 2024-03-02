import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../recipes/recipe.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile-search.component.html',
  styleUrl: './profile-search.component.scss',
})
export class ProfileHomeComponent implements OnInit {
  searchForm: FormGroup;
  recipes: Recipe[] | null = [];

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      searchQuery: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.searchForm.valid) {
      const searchQuery = this.searchForm.value.searchQuery;

      const params = new HttpParams().set('q', searchQuery);
    }
  }
}
