import BaseModel from "./base-model";

export class User extends BaseModel{
    nom: String;
    dateNaissance:Date;
    contact: String;
    email: String;
    password: String;
    solde: Number;
    avatar?: string;
}