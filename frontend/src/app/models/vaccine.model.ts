import { BaseModel } from './base.model';

export class Vaccine extends BaseModel {

    static fields: string[] = [
        '_id',
        'name',
        'description',
        'date'
    ];

    _id: string;
    name: string;
    description: string;
    date: string;

    static initArray(array: any[]) {
        let arrayInstances = [];
        if(array && array.length > 0) {
            array.forEach(e => arrayInstances.push(new Vaccine(e)));
        }
        return arrayInstances;
    }

    constructor(obj?: any) {
        super();
        this.init(Vaccine.fields, obj);
    }

    validate(): boolean | string[] {
        let valid: string[] = [];

        if(!this.name) {
            valid.push('name');
        }

        if(valid.length > 0) {
            return valid;
        } else {
            return true;
        }
    }
}