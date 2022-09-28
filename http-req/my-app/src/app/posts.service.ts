import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { Subject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
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
      postData,
      {
        observe: 'response'
      }
    )
    .subscribe(
      responseData => {
        console.log(responseData);
    },
    error => {
      this.error.next(error.message);
    });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http
    .get<{ [key:string]: Post }>('https://my-first-app-4033d-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
    {
      headers: new HttpHeaders({ 'custom-Header': 'Hello' }),
      params: searchParams,
      responseType: 'json'
    }
    )
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
    return this.http
    .delete('https://my-first-app-4033d-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
    {
      observe: 'events',
      responseType: 'text'
    })
    .pipe(
        tap(event => {
          console.log(event);
          if(event.type === HttpEventType.Sent){
            //...
          }
          if(event.type === HttpEventType.Response){
            console.log(event.body)
          }
        })
        );
      }
}
