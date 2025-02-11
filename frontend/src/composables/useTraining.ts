import axios from "axios";
import { type IProducerTraining, ProducerTraining, Product, type IProduct } from "@/core/model";
import { ref } from "vue";

const mockSuccessTrainingData = {
    "producerNPN": "12345678",
    "carrier": "Sample Insurance Company",
    "products": [
        {
            "CUSIP": "037833100",
            "name": "Premiere Fixed Annuity",
            "type": "Annuity",
            "jurisdiction": ["CT", "MA"],
            "carrierAuthorization": true,
            "distributorAuthorization": true,
            "courses": [
                {
                    "provider": "RGED",
                    "providerId": "123415",
                    "completionStage": "New",
                    "courseId": "132566",
                    "courseName": "Carrier A Version 5 Producer Training",
                    "courseMethod": "Online",
                    "courseType": "Product",
                    "productTrainingType": "Fixed Deferred Annuity",
                    "completionInformation": {
                        "completionDate": "2025-02-10",
                        "expirationDate": "2026-02-09",
                        "credentialHours": 25,
                        "continuingEducationHours": 10,
                        "certificationDate": "2025-02-10",
                        "certificationState": "CT",
                        "certificationNumber": "34652643"
                    }
                },
                {
                    "provider": "SIMON",
                    "providerId": "123777",
                    "completionStage": "New",
                    "courseId": "132567",
                    "courseName": "Advanced Annuity Training",
                    "courseMethod": "Online",
                    "courseType": "Product",
                    "productTrainingType": "Fixed Deferred Annuity",
                    "completionInformation": {
                        "completionDate": "2025-01-15",
                        "expirationDate": "2026-01-14",
                        "credentialHours": 20,
                        "continuingEducationHours": 8,
                        "certificationDate": "2025-01-15",
                        "certificationState": "MA",
                        "certificationNumber": "34652644"
                    }
                }
            ],
            "appointments": [
                {
                    "status": "Accepted",
                    "lineOfAuthority": "Annuity",
                    "appointmentDate": "2025-02-09",
                    "appointmentState": "CT"
                },
                {
                    "status": "Accepted",
                    "lineOfAuthority": "Annuity",
                    "appointmentDate": "2025-02-09",
                    "appointmentState": "MA"
                }
            ],
            "stateLicenses": [
                {
                    "jurisdiction": "CT",
                    "number": "1234567890",
                    "status": "Active",
                    "licenseDate": "2024-01-09",
                    "expirationDate": "2026-02-09",
                    "resident": true,
                    "lineOfAuthority": "Annuity"
                },
                {
                    "jurisdiction": "MA",
                    "number": "0987654321",
                    "status": "Active",
                    "licenseDate": "2024-01-09",
                    "expirationDate": "2026-02-09",
                    "resident": false,
                    "lineOfAuthority": "Annuity"
                }
            ],
            "registrations": [
                {
                    "status": "In Good Standing",
                    "crdNumber": "1234567890",
                    "type": "Series 6",
                    "firmName": "Advisor A",
                    "firmCRDNumber": "1234567890"
                },
                {
                    "status": "In Good Standing",
                    "crdNumber": "1234567890",
                    "type": "Series 7",
                    "firmName": "Advisor A",
                    "firmCRDNumber": "1234567890"
                }
            ]
        },
		{
            "CUSIP": "037833100",
            "name": "Supreme Fixed Annuity",
            "type": "Annuity",
            "jurisdiction": ["CT", "MA"],
            "carrierAuthorization": true,
            "distributorAuthorization": true,
            "courses": [
                {
                    "provider": "RGED",
                    "providerId": "123415",
                    "completionStage": "New",
                    "courseId": "132566",
                    "courseName": "Carrier A Version 5 Producer Training",
                    "courseMethod": "Online",
                    "courseType": "Product",
                    "productTrainingType": "Fixed Deferred Annuity",
                    "completionInformation": {
                        "completionDate": "2025-02-10",
                        "expirationDate": "2026-02-09",
                        "credentialHours": 25,
                        "continuingEducationHours": 10,
                        "certificationDate": null,
                        "certificationState": "CT",
                        "certificationNumber": "34652643"
                    }
                },
                {
                    "provider": "SIMON",
                    "providerId": "123777",
                    "completionStage": "New",
                    "courseId": "132567",
                    "courseName": "Advanced Annuity Training",
                    "courseMethod": "Online",
                    "courseType": "Product",
                    "productTrainingType": "Fixed Deferred Annuity",
                    "completionInformation": {
                        "completionDate": "2025-01-15",
                        "expirationDate": "2026-01-14",
                        "credentialHours": 20,
                        "continuingEducationHours": 8,
                        "certificationDate": "2025-01-15",
                        "certificationState": "MA",
                        "certificationNumber": "34652644"
                    }
                }
            ],
            "appointments": [
                {
                    "status": "Accepted",
                    "lineOfAuthority": "Annuity",
                    "appointmentDate": "2025-02-09",
                    "appointmentState": "CT"
                },
                {
                    "status": "Accepted",
                    "lineOfAuthority": "Annuity",
                    "appointmentDate": "2025-02-09",
                    "appointmentState": "MA"
                }
            ],
            "stateLicenses": [
                {
                    "jurisdiction": "CT",
                    "number": "1234567890",
                    "status": "Active",
                    "licenseDate": "2024-01-09",
                    "expirationDate": "2026-02-09",
                    "resident": true,
                    "lineOfAuthority": "Annuity"
                },
                {
                    "jurisdiction": "MA",
                    "number": "0987654321",
                    "status": "Active",
                    "licenseDate": "2024-01-09",
                    "expirationDate": "2026-02-09",
                    "resident": false,
                    "lineOfAuthority": "Annuity"
                }
            ],
            "registrations": [
                {
                    "status": "In Good Standing",
                    "crdNumber": "1234567890",
                    "type": "Series 6",
                    "firmName": "Advisor A",
                    "firmCRDNumber": "1234567890"
                },
                {
                    "status": "In Good Standing",
                    "crdNumber": "1234567890",
                    "type": "Series 7",
                    "firmName": "Advisor A",
                    "firmCRDNumber": "1234567890"
                }
            ]
        },
		{
            "CUSIP": "037833100",
            "name": "Ultra Fixed Annuity",
            "type": "Annuity",
            "jurisdiction": ["CT", "MA"],
            "carrierAuthorization": true,
            "distributorAuthorization": true,
            "courses": [
                {
                    "provider": "RGED",
                    "providerId": "123415",
                    "completionStage": "New",
                    "courseId": "132566",
                    "courseName": "Carrier A Version 5 Producer Training",
                    "courseMethod": "Online",
                    "courseType": "Product",
                    "productTrainingType": "Fixed Deferred Annuity",
                    "completionInformation": {
                        "completionDate": "2025-02-10",
                        "expirationDate": "2026-02-09",
                        "credentialHours": 25,
                        "continuingEducationHours": 10,
                        "certificationDate": null,
                        "certificationState": "CT",
                        "certificationNumber": "34652643"
                    }
                },
                {
                    "provider": "SIMON",
                    "providerId": "123777",
                    "completionStage": "New",
                    "courseId": "132567",
                    "courseName": "Advanced Annuity Training",
                    "courseMethod": "Online",
                    "courseType": "Product",
                    "productTrainingType": "Fixed Deferred Annuity",
                    "completionInformation": {
                        "completionDate": "2025-01-15",
                        "expirationDate": "2026-01-14",
                        "credentialHours": 20,
                        "continuingEducationHours": 8,
                        "certificationDate": null,
                        "certificationState": "MA",
                        "certificationNumber": "34652644"
                    }
                }
            ],
            "appointments": [
                {
                    "status": "Accepted",
                    "lineOfAuthority": "Annuity",
                    "appointmentDate": "2025-02-09",
                    "appointmentState": "CT"
                },
                {
                    "status": "Accepted",
                    "lineOfAuthority": "Annuity",
                    "appointmentDate": "2025-02-09",
                    "appointmentState": "MA"
                }
            ],
            "stateLicenses": [
                {
                    "jurisdiction": "CT",
                    "number": "1234567890",
                    "status": "Active",
                    "licenseDate": "2024-01-09",
                    "expirationDate": "2026-02-09",
                    "resident": true,
                    "lineOfAuthority": "Annuity"
                },
                {
                    "jurisdiction": "MA",
                    "number": "0987654321",
                    "status": "Active",
                    "licenseDate": "2024-01-09",
                    "expirationDate": "2026-02-09",
                    "resident": false,
                    "lineOfAuthority": "Annuity"
                }
            ],
            "registrations": [
                {
                    "status": "In Good Standing",
                    "crdNumber": "1234567890",
                    "type": "Series 6",
                    "firmName": "Advisor A",
                    "firmCRDNumber": "1234567890"
                },
                {
                    "status": "In Good Standing",
                    "crdNumber": "1234567890",
                    "type": "Series 7",
                    "firmName": "Advisor A",
                    "firmCRDNumber": "1234567890"
                }
            ]
        }
    ]
}

const mockNigoProductData = {
    "producerNPN": "5556667778",
    "carrier": "Carrier A",
    "products": [
        {
            "CUSIP": "209834HHHH",
            "name": "Product Name One",
            "type": "Fixed Annuity",
            "jurisdictions": [
                "MA",
                "CT"
            ],
            "carrierAuthorization": false,
            "distributorAuthorization": true,
            "courses": [
                {
                    "provider": "RGED",
                    "providerId": "123415",
                    "completionStage": "New",
                    "courseId": "132566",
                    "courseName": "Carrier A Version 5 Producer Training",
                    "courseMethod": "Online",
                    "courseType": "Product",
                    "productTrainingType": "Fixed Deferred Annuity",
                    "completionInformation": {}
                },
                {
                    "provider": "EDJ",
                    "providerId": "243524",
                    "completionStage": "New",
                    "courseId": "132566",
                    "courseName": "Best Interest Training",
                    "courseMethod": "Online",
                    "courseType": "Distributor",
                    "productTrainingType": "Fixed Deferred Annuity",
                    "completionInformation": {
                        "completionDate": "2025-02-10",
                        "expirationDate": "2026-02-09",
                        "credentialHours": 25,
                        "continuingEducationHours": 10,
                        "certificationDate": "2025-02-10",
                        "certificationState": "",
                        "certificationNumber": "34652643"
                    }
                }
            ],
            "appointments": [
                {
                    "status": "Accepted",
                    "lineOfAuthority": "Annuity",
                    "appointmentDate": "2025-02-09",
                    "appointmentState": "CT"
                },
                {
                    "status": "Accepted",
                    "lineOfAuthority": "Annuity",
                    "appointmentDate": "2025-02-09",
                    "appointmentState": "MA"
                }
            ],
            "stateLicenses": [
                {
                    "jurisdiction": "CT",
                    "number": "1234567890",
                    "status": "Active",
                    "licenseDate": "2024-01-09",
                    "expirationDate": "2026-02-09",
                    "resident": true,
                    "lineOfAuthority": "Annuity"
                },
                {
                    "jurisdiction": "MA",
                    "number": "1234567890",
                    "status": "Active",
                    "licenseDate": "2024-01-09",
                    "expirationDate": "2026-02-09",
                    "resident": false,
                    "lineOfAuthority": "Annuity"
                }
            ],
            "registrations": [
                {
                    "status": "In Good Standing",
                    "crdNumber": "1234567890",
                    "type": "Series 6",
                    "firmName": "Advisor A",
                    "firmCRDNumber": "1234567890"
                },
                {
                    "status": "In Good Standing",
                    "crdNumber": "1234567890",
                    "type": "Series 7",
                    "firmName": "Advisor A",
                    "firmCRDNumber": "1234567890"
                }
            ]
        }
    ]
}


export function useTraining() {

    const producerTraining = ref<IProducerTraining>()

    const getProductTraining = async (npn: string): Promise<IProducerTraining> => {
        try {
            // const response = await axios({
            //     method: 'get',
            //     withCredentials: false,
            //     url: `https://dc1pp0md2g.execute-api.us-west-2.amazonaws.com/v1/test?npn=${npn}`
            // });
            
            // return producerTraining.value = response.data
            
            await new Promise(resolve => setTimeout(resolve, 500));
            const response = new ProducerTraining(mockSuccessTrainingData);
            return producerTraining.value = response
        } catch (error) {
            console.error('Error fetching product training:', error);
            throw error;
        }
    }

    return {
        producerTraining,
        getProductTraining
    }

}