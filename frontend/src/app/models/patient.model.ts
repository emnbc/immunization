import { Vaccination } from './vaccination.model';

export class Patient {
    _id?: string;
    lastName: string;
    firstName: string;
    birthDate: string;
    sex: number;
    phone: string;
    registerDate?: string;
    vaccination?: Vaccination[];
}