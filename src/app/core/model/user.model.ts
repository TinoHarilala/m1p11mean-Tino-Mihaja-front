import BaseModel from "./base-model";

export class User extends BaseModel{
    _id?: string;
    nom: String;
    dateNaissance: Date;
    contact: String;
    email: String;
    password: String;
    adresse: String;
    services: any[];
    isManager: Number;
    avatar?: string
}