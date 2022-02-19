import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common/interfaces/user';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { RecipesService } from 'src/app/common/services/recipes/recipes.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {

  img1;
  @Input() user: User;
  @Input() recipe: any;

  @Output() submitRecipe: EventEmitter<any> = new EventEmitter();

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.productForm = this.fb.group({
      title: ['', [Validators.required]],
      imageUrl: [null, []],
      ingredients: this.fb.array([this.fb.group({amount: null, unit: '', label: ''})]),
      steps: this.fb.array([this.fb.group({step:''})])
    });

    if (this.recipe) {
      this.productForm.patchValue({
        title: this.recipe.title,
        imageUrl: this.recipe.imageUrl,
        ingredients: this.recipe.ingredients,
        steps: this.recipe.ingredients
      });

      // we set the ingredients
      this.recipe.ingredients.map(ingredient =>  {
        this.addIngredient(ingredient.amount, ingredient.unit, ingredient.label);
      });
      
      // we set the steps
      this.recipe.steps.map(step =>  {
        this.addStep(step);
      })
    }

  }

  // STEPS 
  get steps() {
    return this.productForm.get('steps') as FormArray;
  }

  addStep(text?) {
    this.steps.push(this.fb.group({step: text ? text : ''}));
  }

  deleteStep(index) {
    this.steps.removeAt(index);
  }

  // INGREDIENTS
  get ingredients() {
    return this.productForm.get('ingredients') as FormArray;
  }

  addIngredient(amount?, unit?, label?) {
    // if there are values then we fill them
    this.ingredients.push(this.fb.group({
      amount: amount ? amount : null,
      unit: unit ? unit : '',
      label: label ? label : ''
    }));
  }

  deleteIngredient(index) {
    this.ingredients.removeAt(index);
  }

  // FILE HANDLING
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event:any) => {
        this.img1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    const fileList: FileList = event.target.files;  
    const file: File = fileList[0];
  }

  // SUBMIT FUNCTION
  onSubmit() {
    if (this.productForm.valid) {
      const recipe = this.productForm.value;
      recipe.steps = recipe.steps.map(step => {
        return step.step;
      });
      recipe.userId = this.user.id;

      this.submitRecipe.emit(recipe);
    }
    return;
  }

  

}
