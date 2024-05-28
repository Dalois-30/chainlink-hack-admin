import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { SpinnerAction } from 'src/app/core/constant';
import { SharedService } from 'src/app/views/shared/shared.service';
import { UpdateCatDto } from '../../categories/dto/category-get.dto';
import { GetPostDto, UpdatePostDto } from '../dto/post-get.dto';
import { PostService } from '../service/post.service';
import { SelectionChange, ContentChange } from 'ngx-quill';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit {

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
  posts: GetPostDto[] = [];
  selectedSearchpostId: string = "";
  childrenpost: any;

  constructor(
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _postService: PostService,
    private _router: Router,
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    //get user from resolver
    this._route.data.subscribe({
      next: data => {
        this.post = data.post; // get resolved data
        console.log(this.post);
        // const posts = data.posts;
        // // set post object
        // for (let index = 0; index < posts.length; index++) {
        //   const postGet = posts[index];
        //   const postGetDto = new GetPostDto();
        //   // set element object
        //   postGetDto.id = postGet.post.id;
        //   postGetDto.title = postGet.post.title;
        //   postGetDto.content = postGet.post.content;
        //   postGetDto.user = postGet.post.user;
        //   postGetDto.status = postGet.post.status;
        //   postGetDto.image = postGet.image;
        //   postGetDto.comments = postGet.post.comments;
        //   postGetDto.created_at = postGet.post.created_at;
        //   postGetDto.updated_at = postGet.post.updated_at;

        //   //append post table
        //   this.posts.push(postGetDto);
        // }

        // this.posts = this.posts.filter(cat => cat.id !== this.post.cat.id)

        // console.log(this.posts);
      }
    });
    // initialise form with the data of the form
    this.createForm = this._formBuilder.group({
      title: [this.post.post.title],
      content: [this.post.post.content],
      status: [this.post.post.status],
      // verified: [this.post.verified],
    });
    this.htmlText = this.post.post.content
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
    const value = this.createForm.value;
    const post = new UpdatePostDto();
    post.title = value.title;
    post.content = value.content;
    post.status = value.status;
    console.log(post);
    const res = await lastValueFrom(this._postService.updatePost(post, this.post.post.id));
    if (res) {
      this._sharedService.showSwal("success", "post updated !");
      this._router.navigate(["/post/list"]);
    };
    this.ShowHideSpinner(SpinnerAction.HIDDEN);
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
