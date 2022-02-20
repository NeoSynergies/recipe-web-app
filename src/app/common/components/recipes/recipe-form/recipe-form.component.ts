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

  imagePreview;
  @Input() user: User;
  @Input() recipe: any;

  @Output() submitRecipe: EventEmitter<any> = new EventEmitter();

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.productForm = this.fb.group({
      title: this.recipe ? [this.recipe.title, [Validators.required]] : ['', [Validators.required]],
      imageUrl: [null, []],
      ingredients: this.fb.array([this.fb.group({amount: null, unit: '', label: ''})]),
      steps: this.fb.array([this.fb.group({step:''})])
    });

    if (this.recipe) {
      // if this form is for editing the recipe we will get the recipe as a @Input and assign the values here 
      
      // we set the ingredients
      this.recipe.ingredients.map(ingredient =>  {
        this.onAddIngredient(ingredient.amount, ingredient.unit, ingredient.label);
      });
      
      // we set the steps
      this.recipe.steps.map(step =>  {
        this.onAddStep(step);
      });
    }

  }

  // STEPS 
  get steps() {
    return this.productForm.get('steps') as FormArray;
  }

  onAddStep(text?) {
    this.steps.push(this.fb.group({step: text ? text : ''}));
  }

  onDeleteStep(index) {
    this.steps.removeAt(index);
  }

  // INGREDIENTS
  get ingredients() {
    return this.productForm.get('ingredients') as FormArray;
  }

  onAddIngredient(amount?, unit?, label?) {
    // if there are values then we fill them
    this.ingredients.push(this.fb.group({
      amount: amount ? amount : null,
      unit: unit ? unit : '',
      label: label ? label : ''
    }));
  }

  onDeleteIngredient(index) {
    this.ingredients.removeAt(index);
  }

  // FILE HANDLING
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event:any) => {
        this.imagePreview = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    const fileList: FileList = event.target.files;
  }

  // SUBMIT FUNCTION
  onSubmit() {
    // if the form is valid
    if (this.productForm.valid) {
      const recipe = this.productForm.value;

      // we clear the empty objects of steps and ingredients
      recipe.steps = this.clearEmptyObjects(recipe.steps);
      recipe.ingredients = this.clearEmptyObjects(recipe.ingredients);

      // we extract the steps
      recipe.steps = recipe.steps.map(step => {
        return step.step;
      });

      // we set the user id
      recipe.userId = this.user.id;

      // if it is the edit page, we set again the recipe id
      if(this.recipe) recipe.id = this.recipe.id;

      // we emit the recipe
      this.submitRecipe.emit(recipe);
    }
    return;
  }

  // function to clear empty objects/values from arrays
  private clearEmptyObjects(array: []) {
    return array.filter((element: any) => {
      // for steps
      if (element.step === '') return false;
      if(element.amount === null || element.unit === '' || element.label === '') return false;
      return true;
    })
  }
}
