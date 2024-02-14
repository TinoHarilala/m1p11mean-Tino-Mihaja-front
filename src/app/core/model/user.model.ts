import BaseModel from "./base-model";

export class User extends BaseModel{
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