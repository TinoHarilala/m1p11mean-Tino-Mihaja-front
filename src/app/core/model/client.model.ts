import BaseModel from "./base-model";

export class Client extends BaseModel{
    _id?: string;
    nom: String;
    dateNaissance:Date;
    contact: String;
    email: String;
    password: String;
    solde: Number;
}