export class RegisteredUser{
    _id:any;
    userName:string = "";
    password:string = "";
    public constructor(init?: Partial<RegisteredUser>) {
        Object.assign(this, init);
    }
} 
