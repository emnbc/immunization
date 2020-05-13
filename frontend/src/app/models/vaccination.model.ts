import { BaseModel } from './base.model';

export class Vaccination extends BaseModel {

    static fields: string[] = [
        '_id',
        'patientId',
        'vaccineId',
        'agree',
        'status',
        'createdDate',
        'vaccineName'
    ];

    _id: string;
    patientId: string;
    vaccineId: string;
    agree: number;
    status: number;
    createdDate: string;
    vaccineName: string;

    constructor(obj?: any) {
        super();
        this.init(Vaccination.fields, obj);
    }

    static initArray(array: any[]) {
        let arrayInstances = [];
        if(array && array.length > 0) {
            array.forEach(e => arrayInstances.push(new Vaccination(e)));
        }
        return arrayInstances;
    }

    validate(): boolean | string[] {
        let valid: string[] = [];

        if(!this.vaccineId) {
            valid.push('vaccineId');
        }
        if(!this.status) {
            valid.push('status');
        }

        if(valid.length > 0) {
            return valid;
        } else {
            return true;
        }
    }
}