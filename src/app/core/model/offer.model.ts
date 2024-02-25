import BaseModel from "./base-model"
import { ServiceModel } from "./service.model";

export class OfferModel extends BaseModel{
    _id?: number;
    title: string;
    description: string;
    services: string[];
    remise: number;
    start: string;
    end: string;
    isDeleted?: 0;
}
