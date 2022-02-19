import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.page.html',
  styleUrls: ['./add-recipe.page.scss'],
})
export class AddRecipePage implements OnInit {
  img1;
  constructor(private fb: FormBuilder) { }

  productForm: FormGroup;

  ngOnInit() {

    /* Initiate the form structure */
    this.productForm = this.fb.group({
      title: ['', [Validators.required]],
      recipeImg: [null, [Validators.required]],
      ingredients: this.fb.array([this.fb.group({ingredientQuantity: null, ingredientUnit: '', ingredientName: ''})]),
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
    this.ingredients.push(this.fb.group({ingredientQuantity: null, ingredientUnit: '', ingredientName: ''}));
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
    console.log(this.productForm.value);
  }

  

}
