import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { SpinnerAction } from 'src/app/core/constant';
import { SharedService } from 'src/app/views/shared/shared.service';
import { PostService } from '../service/post.service';
import { CategoryGetDto } from '../../categories/dto/category-get.dto';
import { AuthService } from '../../auth/service/auth.service';
import { ContentChange, SelectionChange } from 'ngx-quill';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  // Quill editor settings
  htmlText = ``
  quillConfig = {
     toolbar: {
       container: [
         ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
         ['code-block'],
        //  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
         [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
         [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        //  [{ 'direction': 'rtl' }],                         // text direction

        //  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

         [{ 'align': [] }],

        //  ['clean'],                                         // remove formatting button

        //  ['link'],
         ['link']
       ],
     },
  }

  public createForm: FormGroup;
  submitted = false;
  post!: any;
  categories: CategoryGetDto[] = [];
  selectedSearchPostId: string = "";
  formData = new FormData();

  constructor(
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _postService: PostService,
    private _router: Router,
    private _sharedService: SharedService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    console.log("user", this._authService.decodedToken);
    //get user from resolver
    this._route.data.subscribe({
      next: data => {
        const categories = data.categories;
        // set category object
        for (let index = 0; index < categories.length; index++) {
          const catGet = categories[index];
          const catDto = new CategoryGetDto();
          // set element object
          catDto.id = catGet.cat.id;
          catDto.name = catGet.cat.name;
          catDto.description = catGet.cat.description;
          catDto.image = catGet.image;
          catDto.children = catGet.cat.children;
          catDto.posts = catGet.cat.posts;
          catDto.created_at = catGet.cat.created_at;
          catDto.updated_at = catGet.cat.updated_at;

          //append category table
          this.categories.push(catDto);
        }

        console.log(this.categories);
      }
    });
    // initialise form with the data of the form
    this.createForm = this._formBuilder.group({
      title: ["", [Validators.required]],
      content: ["", [Validators.required]],
      status: [false],
      category: ["", [Validators.required]],
      file: ["", [Validators.required]],
    });
    // get all parent posts
  }

  /*show and hide spinner*/
  ShowHideSpinner(action: SpinnerAction) {
    let spinner = document.getElementById("spinner");
    spinner!.style.visibility = action;
  }
  onpostChange(postId: string) {
    this._router.navigate(['/post/detail', postId]);
  }

  async submit() {
    this.ShowHideSpinner(SpinnerAction.VISIBLE);
    console.log(this.createForm.value);
    this.formData.append('title', this.createForm.value.title);
    this.formData.append('content', this.createForm.value.content);
    this.formData.append('status', this.createForm.value.status);
    this.formData.append('category', this.createForm.value.category);
    this.formData.append('author', this._authService.decodedToken.id);
    const res = await lastValueFrom(this._postService.createPost(this.formData));
    if (res) {
      this._sharedService.showSwal("success", "post created !");
      this._router.navigate(["/post/list"]);
    };
    this.ShowHideSpinner(SpinnerAction.HIDDEN);
  }

  /* Show Image select modal */
  checkAndUpload(e: any) {
    let imgFile = e.target.files[0] as File;
    if (imgFile.type === 'image/png' || imgFile.type === 'image/jpeg' || imgFile.type === 'image/jpg') {
      if ((imgFile.size / 1000000) > 4) {
        this._sharedService.showSwal("error", 'Veuillez selectionner un fichier plus petit!');
      } else {
        console.log("image save", imgFile);
        this.formData.append('file', imgFile!);
      }
    } else {
      this._sharedService.showSwal("info", 'Veuillez selectionner un fichier image ,Attention!');
      let file = document.getElementById('formFile') as HTMLInputElement | null;
      file!.value = '';
    }
  }

  onSelectionChanged = (event: SelectionChange) => {
    if(event.oldRange == null) {
      this.onFocus();
    }
    if(event.range == null) {
      this.onBlur();
    }
  }

  onContentChanged = (event: ContentChange) => {
    // console.log(event.html);
  }

  onFocus = () => {
    console.log("On Focus");
  }
  onBlur = () => {
    console.log("Blurred");
  }

}
