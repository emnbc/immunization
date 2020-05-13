import { BaseModel } from './base.model';
import { Vaccination } from './vaccination.model';

export class Patient extends BaseModel {

    static fields: string[] = [
        '_id',
        'lastName',
        'firstName',
        'birthDate',
        'sex',
        'phone',
        'registerDate',
        'vaccination'
    ];

    _id: string;
    lastName: string;
    firstName: string;
    birthDate: string;
    sex: number;
    phone: string;
    registerDate: string;
    vaccination: Vaccination[];

    constructor(obj?: any) {
        super();
        this.init(Patient.fields, obj);
        this.vaccination = obj && obj.vaccination ? this.initVaccination(obj.vaccination) : this.initVaccination();
    }

    static initArray(array: any[]) {
        let arrayInstances = [];
        if(array && array.length > 0) {
            array.forEach(e => arrayInstances.push(new Patient(e)));
        }
        return arrayInstances;
    }

    initVaccination(array?: any[]) {
        let arrayInstances: Vaccination[] = [];
        if(array && array.length > 0) { 
            array.forEach(e => arrayInstances.push(new Vaccination(e)));
        }
        return arrayInstances;
    }

    validate(): boolean | string[] {
        let valid: string[] = [];

        if(!this.firstName) {
            valid.push('firstName');
        }
        if(!this.lastName) {
            valid.push('lastName');
        }
        if(!this.birthDate) {
            valid.push('birthDate');
        }
        if(!this.sex) {
            valid.push('sex');
        }
        if(!this.phone) {
            valid.push('phone');
        }

        if(valid.length > 0) {
            return valid;
        } else {
            return true;
        }
    }
}