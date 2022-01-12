
export class Post{
    _id:any;
    postID:number = 0;
    title:string = "";
    postBody:string = "";
    tags:string[] = [];
    createdAt:Date = new Date(Date.now());
    image:string = "";
    user: { userName: string ;  _id:any } = { userName: "" , _id:0};
} 
