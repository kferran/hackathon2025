
// Enum types for fields with specific values
// export enum Provider {
//     RGED = 'RGED',
//     SIMON = 'SIMON'
// }

// export enum CompletionStage {
//     New = 'New'
//     // Add other possible stages as needed
// }

// export enum CourseMethod {
//     Online = 'Online'
//     // Add other possible methods as needed
// }

// export enum CourseType {
//     Product = 'Product'
//     // Add other possible types as needed
// }

// export enum ProductTrainingType {
//     FixedDeferredAnnuity = 'Fixed Deferred Annuity'
//     // Add other possible training types as needed
// }

// export enum Status {
//     Accepted = 'Accepted',
//     Active = 'Active',
//     InGoodStanding = 'In Good Standing'
//     // Add other possible statuses as needed
// }

// export enum LineOfAuthority {
//     Annuity = 'Annuity'
//     // Add other possible lines of authority as needed
// }

// export enum State {
//     CT = 'CT',
//     MA = 'MA'
//     // Add other possible states as needed
// }

// export enum RegistrationType {
//     Series6 = 'Series 6',
//     Series7 = 'Series 7'
//     // Add other possible registration types as needed
// }

export type UserRole = 'adviser' | 'delegate'

export interface IUser {
	guid?: string,
	firstName: string,
	lastName: string,
	userName: string,
	password: string,
	role: UserRole,
}

export interface IUserRelationship {
	parentGuid: string,
	childGuid: string,
	relationshipType: 'adviser-delegate'
}

export interface IAppointment {
    status: string;
    lineOfAuthority: string;
    appointmentDate: string;
    appointmentState: string[];
}

// State License interface
export interface IStateLicense {
    jurisdiction: string[];
    number: string;
    status: string;
    licenseDate: string;
    expirationDate: string;
    resident: boolean;
    lineOfAuthority: string;
}

// Registration interface
export interface IRegistration {
    status: string;
    crdNumber: string;
    type: string;
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
    provider: string;
    providerId: string;
    completionStage: string;
    courseId: string;
    courseName: string;
    courseMethod: string;
    courseType: string;
    productTrainingType: string;
    completionInformation: ICompletionInformation;
}

export interface IProducerTraining {
    ProducerNPN: string
	Carrier: string
    products: IProduct[]
}

export class ProducerTraining implements IProducerTraining {
    ProducerNPN: string;
    Carrier: string;
    products: IProduct[];

    constructor(data: IProducerTraining) {
        Object.assign(this, data);
    }

}

export interface IProduct {
    CUSIP: string
    name: string
    type: string // Enum?
    jurisdiction: string[] // StateType?
    carrierAuthorization: boolean,
    distributorAuthorization: boolean,
    courses: ICourse[],
    appointments:IAppointment[],
    stateLicenses: IStateLicense[]
    registrations: IRegistration[]
}

export class Product implements IProduct {
    CUSIP: string = ""
    name: string = "" 
    type: string = ""
    jurisdiction: string[] = []
    carrierAuthorization: boolean = false
    distributorAuthorization: boolean = false
    courses: ICourse[] = []
    appointments: IAppointment[] = []
    stateLicenses: IStateLicense[] = []
    registrations: IRegistration[] = []

    constructor(data: IProduct) {
        Object.assign(this, data);
    }
}

export function getProductIncompleteTrainings(product : IProduct) {
	return product.courses.filter(x => !x.completionInformation.certificationDate)
}

export function getProductCompleteTrainings(product : IProduct) {
	return product.courses.filter(x => !!x.completionInformation.certificationDate)
}

export function getProductTrainingCompletionPercentage(product : IProduct) {
	const completedCourses = getProductCompleteTrainings(product)

	return completedCourses.length / product.courses.length 
}

export function getEstimatedTrainingTimeInMinutes(product : IProduct) {
	return getProductIncompleteTrainings(product).length * 5 // assume 5 minutes per training
}