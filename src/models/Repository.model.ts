import { OwnerModel } from './Owner.model'

export class RepositoryModel {

    public created_at: string;
    public html_url: string;
    public language: string;
    public name: string;
    public owner: OwnerModel;

    constructor(obj: any) {
        this.created_at = obj.created_at;
        this.html_url = obj.html_url;
        this.language = obj.language;
        this.name = obj.name;
        this.owner = new OwnerModel(obj.owner)
    }
}