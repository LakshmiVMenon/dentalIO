export class Doctor{
    _id : string;
    name : string;
    role : string;
    qualification : string;
    experience : string;
    clinics : [{
        name : string;
        address : string;
        weekdaytiming : string;
        weekendtiming :string;
        fee : number;
    }];
    profileimg : string;
}