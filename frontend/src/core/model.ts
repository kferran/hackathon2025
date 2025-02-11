
// Enum types for fields with specific values
export enum Provider {
    RGED = 'RGED',
    SIMON = 'SIMON'
}

export enum CompletionStage {
    New = 'New'
    // Add other possible stages as needed
}

export enum CourseMethod {
    Online = 'Online'
    // Add other possible methods as needed
}

export enum CourseType {
    Product = 'Product'
    // Add other possible types as needed
}

export enum ProductTrainingType {
    FixedDeferredAnnuity = 'Fixed Deferred Annuity'
    // Add other possible training types as needed
}

export enum Status {
    Accepted = 'Accepted',
    Active = 'Active',
    InGoodStanding = 'In Good Standing'
    // Add other possible statuses as needed
}

export enum LineOfAuthority {
    Annuity = 'Annuity'
    // Add other possible lines of authority as needed
}

export enum State {
    CT = 'CT',
    MA = 'MA'
    // Add other possible states as needed
}

export enum RegistrationType {
    Series6 = 'Series 6',
    Series7 = 'Series 7'
    // Add other possible registration types as needed
}

export interface IAppointment {
    status: Status;
    lineOfAuthority: LineOfAuthority;
    appointmentDate: string;
    appointmentState: State;
}

// State License interface
export interface IStateLicense {
    jurisdiction: State;
    number: string;
    status: Status;
    licenseDate: string;
    expirationDate: string;
    resident: boolean;
    lineOfAuthority: LineOfAuthority;
}

// Registration interface
export interface IRegistration {
    status: Status;
    crdNumber: string;
    type: RegistrationType;
    firmName: string;
    firmCRDNumber: string;
}

// Interface for completion information
export interface ICompletionInformation {
    completionDate: string;
    expirationDate: string;
    credentialHours: number;
    continuingEducationHours: number;
    certificationDate: string;
    certificationState: string;
    certificationNumber: string;
}

// Interface for individual course
export interface ICourse {
    provider: Provider;
    providerId: string;
    completionStage: CompletionStage;
    courseId: string;
    courseName: string;
    courseMethod: CourseMethod;
    courseType: CourseType;
    productTrainingType: ProductTrainingType;
    completionInformation: ICompletionInformation;
}


export interface IProduct {
    CUSIP: string
    name: string
    type: string // Enum?
    jurisdiction: string // StateType?
    carrierAuthorization: boolean,
    distributorAuthorization: boolean,
    course: ICourse[],


}

export class Product implements IProduct {
    CUSIP: string
    name: string
    type: string
    jurisdiction: string
    carrierAuthorization: boolean
    distributorAuthorization: boolean
    course: ICourse[]
    appoinments: IAppointment[]
    stateLicenses: IStateLicense[]
    registrations: IRegistration[]

    constructor(data: IProduct) {
        Object.assign(this, data);
    }
}