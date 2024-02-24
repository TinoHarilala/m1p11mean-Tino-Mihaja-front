import BaseModel from "./base-model"
import { ServiceModel } from "./service.model";

export class OfferModel extends BaseModel{
    title: string;
    description: string;
    services: ServiceModel[];
    remise: number;
    start: Date;
    end: Date;
    isDeleted: 0;
}
