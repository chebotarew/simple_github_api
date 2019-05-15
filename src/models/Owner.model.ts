
export class OwnerModel {

    public avatar_url: string;
    public html_url: string;
    public id: number;
    public login: string;

    constructor(obj: any) {
        this.avatar_url = obj.avatar_url;
        this.html_url = obj.html_url;
        this.id = obj.id;
        this.login = obj.login;
    }
}