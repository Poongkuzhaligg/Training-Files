import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { map } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({providedIn: 'root'})

export class PostsService {

  error = new Subject<string>();


  constructor(private http: HttpClient) {}


  createAndStorePost(title: string, content: string){
    const postData: Post = { title: title, content: content }
    this.http
    .post<{ name: string }>(
      'https://my-first-app-4033d-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      postData
    )
    .subscribe(
      responseData => {
        console.log(responseData);
    }, error => {
      this.error.next(error.message);
    });
  }

  fetchPosts() {
    return this.http
    .get<{ [key:string]: Post }>('https://my-first-app-4033d-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
    .pipe(
      map(responseData  => {
        const postArray:Post[] = [];
        for (const key in responseData) {
          if(responseData.hasOwnProperty(key)){
            postArray.push({ ...responseData[key], id: key })
          }
        }
        return postArray;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  deletePosts() {
    return this.http.delete('https://my-first-app-4033d-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json');
  }
}
