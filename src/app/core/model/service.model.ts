import BaseModel from "./base-model";

export class ServiceModel extends BaseModel {
    nom: String
    prix: Number
    duree: Number
    commission: Number
    image?: string
}