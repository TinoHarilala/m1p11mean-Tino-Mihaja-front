import BaseModel from "./base-model";

export class ServiceModel extends BaseModel {
    _id?: string
    nom: String
    prix: Number
    duree: Number
    commission: Number
    image?: string
    employe?: any[]
}