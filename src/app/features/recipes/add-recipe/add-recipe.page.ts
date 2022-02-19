import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/common/interfaces/user';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { RecipesService } from 'src/app/common/services/recipes/recipes.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.page.html',
  styleUrls: ['./add-recipe.page.scss'],
})
export class AddRecipePage implements OnInit {
  img1;
  user: User;
  constructor(
    private fb: FormBuilder,
    private recipesService: RecipesService,
    private authService: AuthService
  ) { }

  productForm: FormGroup;

  ngOnInit() {
    this.authService.user
      .subscribe(user => {
        this.user = user;
      });

    /* Initiate the form structure */
    this.productForm = this.fb.group({
      title: ['', [Validators.required]],
      imageUrl: [null, []],
      ingredients: this.fb.array([this.fb.group({amount: null, unit: '', label: ''})]),
      steps: this.fb.array([this.fb.group({step:''})])
    })
  }

  get ingredients() {
    return this.productForm.get('ingredients') as FormArray;
  }

  get steps() {
    return this.productForm.get('steps') as FormArray;
  }

  addStep() {
    this.steps.push(this.fb.group({step:''}));
  }

  deleteStep(index) {
    this.steps.removeAt(index);
  }

  /////// This is new /////////////////

  addIngredient() {
    this.ingredients.push(this.fb.group({amount: null, unit: '', label: ''}));
  }

  deleteIngredient(index) {
    this.ingredients.removeAt(index);
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.img1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
    console.log(file);
  }

  onSubmit() {
    if (this.productForm.valid) {
      const recipe = this.productForm.value;
      recipe.steps = recipe.steps.map(step => {
        return step.step;
      });
      recipe.userId = this.user.id;
      
      this.recipesService.addRecipe(recipe)
        .subscribe(() => console.log('Done'));
    }
    return;
  }

  

}
