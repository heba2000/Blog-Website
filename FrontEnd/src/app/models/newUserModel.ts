export class NewUser{
    _id:any;
    firstName:string = "";
    lastName:string = "";
    userName:string = "";
    email:string ="";
    password:string = "";
    createdAt:Date = new Date(Date.now());

    public constructor(init?: Partial<NewUser>) {
        Object.assign(this, init);
    }
} 
