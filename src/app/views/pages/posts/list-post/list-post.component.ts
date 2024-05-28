import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { SharedService } from 'src/app/views/shared/shared.service';
import { CategoryGetDto } from '../../categories/dto/category-get.dto';
import { PostService } from '../service/post.service';
import { GetPostDto } from '../dto/post-get.dto';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {
  searchQuery: string;

  constructor(
    private _postService: PostService,
    private _router: Router,
    private _sharedService: SharedService
  ) { }

  searchText: string;
  filteredPost: GetPostDto[];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  posts: GetPostDto[] = [];

  ngOnInit(): void {
    this.init()
  }

  async init() {
    this._postService.getAllPosts(0, 10).subscribe(posts => {
      // set category object
      for (let index = 0; index < posts.length; index++) {
        const postGet = posts[index];
        const postGetDto = new GetPostDto();
        // set element object
        postGetDto.id = postGet.post.id;
        postGetDto.title = postGet.post.title;
        postGetDto.content = postGet.post.content;
        postGetDto.user = postGet.post.user;
        postGetDto.status = postGet.post.publish;
        postGetDto.image = postGet.image;
        postGetDto.comments = postGet.post.comments;
        postGetDto.created_at = postGet.post.created_at;
        postGetDto.updated_at = postGet.post.updated_at;

        //append category table
        this.posts.push(postGetDto);
      }

      this.filteredPost = this.posts;
      console.log('posts loaded', this.posts);
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });

    // this._sharedService.searchQuery$.subscribe(query => {
    //   this.searchText = query;
    //   this.updateFilter();
    // });
  }
  viewDetails(objId: string) {
    // Redirige vers la page des détails de l'utilisateur en utilisant l'identifiant
    this._router.navigate(['/post/detail', objId]);
  }
  clearSearch() {
    this.searchText = '';
    this.updateFilter();
  }


  updateFilter() {
    if (!this.searchText) {
      this.filteredPost = this.posts;
      return;
    }
    const filterText = this.searchText.toLowerCase();
    this.filteredPost = this.posts.filter((cat: any) => {
      return (
        cat.title.toLowerCase().includes(filterText) ||
        cat.user.toLowerCase().includes(filterText)
      );
    });
  }
}
