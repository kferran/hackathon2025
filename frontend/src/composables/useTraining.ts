import axios from "axios";
import { type IProducerTraining, ProducerTraining, Product, type IProduct, type ICourse } from "@/core/model";
import { computed, ref } from "vue";
import { getLocalStorageData } from '@/core/storage';
import atheneLogo from '@/assets/athene-logo.png'
import nationwideLogo from '@/assets/nationwide-logo.png'
import genericLogo2 from '@/assets/laptop2.jpg'
import edjLogo from '@/assets/edward-jones.png'
import genericLogo from '@/assets/laptop.jpg'
import { useUserStore } from "@/stores/user.store";
import { CARRIER_ATHENE, CARRIER_LINCOLN } from "@/core/carrierIds";

let logoIndex : number = 0

const mockJSON = `{
    "producerNPN": "888777666A",
    "producerCRD": "1234567890",
    "producerAgentCode": "1234567890",
    "producerFirstName": "John",
    "producerLastName": "Doe",
    "producerEmailAddress": "jdoe@gmail.com",
    "stateLicenses": [
        {
            "jurisdiction": "CT",
            "number": "72adsfG99",
            "status": "Active",
            "licenseDate": "2025-02-12",
            "expirationDate": "2026-02-12",
            "resident": true,
            "lineOfAuthority": "Annuity",
            "licenseType": "Producer"
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
    ],
    "carriers": [
        {
            "carrier": "ABC Inc",
            "assets": {
                "logo_url": "https://www.abcinc.com/logo.png",
                "carrierDisplayName": "ABC Inc"
            },
            "appointments": [
                {
                    "status": "Accepted",
                    "lineOfAuthority": "Annuity",
                    "appointmentDate": "2025-02-12",
                    "appointmentState": "CT"
                }
            ],
            "products": [
                {
                    "name": "Carrier Product Name ABC",
                    "type": "Fixed Annuity",
                    "CUSIP": "283479577",
                    "jurisdictions": ["CT", "MA"],
                    "carrierAuthorization": true,
                    "distributorAuthorization": true,
                    "courses": [
                        {
                            "provider": "RGED",
                            "providerId": "ABC Inc",
                            "courseURL": "https://www.reged.com/courses/132566",
                            "completionStage": "New",
                            "courseId": "132566",
                            "courseName": "Carrier A Version 5 Producer Training",
                            "courseMethod": "Online",
                            "courseType": "Product",
                            "productTrainingType": "Fixed Deferred Annuity",
                            "status": "Not Started",
                            "completionInformation": {
                                "certificationDate": "2025-02-10",
                                "credentialHours": 25,
                                "certificationNumber": "34652643",
                                "continuingEducationHours": 10,
                                "completionDate": "2025-02-10",
                                "certificationState": "CT",
                                "expirationDate": "2026-02-09",
								"creationDate": "2025-02-01"
                            }
                        },
						{
                            "provider": "RGED",
                            "providerId": "ABC Inc",
                            "courseURL": "https://www.reged.com/courses/132566",
                            "completionStage": "New",
                            "courseId": "132566",
                            "courseName": "Super Carrier A Version 5 Producer Training",
                            "courseMethod": "Online",
                            "courseType": "Product",
                            "productTrainingType": "Fixed Deferred Annuity",
                            "status": "Not Started",
                            "completionInformation": {
                                "certificationDate": "2025-02-10",
                                "credentialHours": 25,
                                "certificationNumber": "34652643",
                                "continuingEducationHours": 10,
                                "completionDate": "2025-02-10",
                                "certificationState": "CT",
                                "expirationDate": "2026-02-09",
								"creationDate": "2025-02-02"
                            }
                        },
						{
                            "provider": "RGED",
                            "providerId": "ABC Inc",
                            "courseURL": "https://www.reged.com/courses/132566",
                            "completionStage": "New",
                            "courseId": "132566",
                            "courseName": "Ultra Carrier A Version 5 Producer Training",
                            "courseMethod": "Online",
                            "courseType": "Product",
                            "productTrainingType": "Fixed Deferred Annuity",
                            "status": "Elective",
                            "completionInformation": {
                                "certificationDate": "2025-02-10",
                                "credentialHours": 25,
                                "certificationNumber": "34652643",
                                "continuingEducationHours": 10,
                                "completionDate": "2025-02-10",
                                "certificationState": "CT",
                                "expirationDate": "2026-02-09",
								"creationDate": "2025-02-03"
                            }
                        },
						{
                            "provider": "RGED",
                            "providerId": "ABC Inc",
                            "courseURL": "https://www.reged.com/courses/132566",
                            "completionStage": "New",
                            "courseId": "132566",
                            "courseName": "Splendid Carrier A Version 5J Producer Training",
                            "courseMethod": "Online",
                            "courseType": "Product",
                            "productTrainingType": "Fixed Deferred Annuity",
                            "status": "Elective",
                            "completionInformation": {
                                "certificationDate": "2025-02-10",
                                "credentialHours": 25,
                                "certificationNumber": "34652643",
                                "continuingEducationHours": 10,
                                "completionDate": "2025-02-10",
                                "certificationState": "CT",
                                "expirationDate": "2026-02-09",
								"creationDate": "2025-02-04"
                            }
                        }
                    ]
                }
            ]
        },

        {
            "carrier": "Athene",
            "assets": {
                "logo_url": "https://www.abcinc.com/logo.png",
                "carrierDisplayName": "ABC Inc"
            },
            "appointments": [
                {
                    "status": "Accepted",
                    "lineOfAuthority": "Annuity",
                    "appointmentDate": "2025-02-12",
                    "appointmentState": "CT"
                }
            ],
            "products": [
                {
                    "name": "Carrier Product Name ABC",
                    "type": "Fixed Annuity",
                    "CUSIP": "283479577",
                    "jurisdictions": ["CT", "MA"],
                    "carrierAuthorization": true,
                    "distributorAuthorization": true,
                    "courses": [
                        {
                            "provider": "RGED",
                            "providerId": "ABC Inc",
                            "courseURL": "https://www.reged.com/courses/132566",
                            "completionStage": "New",
                            "courseId": "132566",
                            "courseName": "Carrier A Version 5 Producer Training",
                            "courseMethod": "Online",
                            "courseType": "Product",
                            "productTrainingType": "Fixed Deferred Annuity",
                            "status": "Not Started",
                            "completionInformation": {
                                "certificationDate": "2025-02-10",
                                "credentialHours": 25,
                                "certificationNumber": "34652643",
                                "continuingEducationHours": 10,
                                "completionDate": "2025-02-10",
                                "certificationState": "CT",
                                "expirationDate": "2026-02-09",
								"creationDate": "2025-02-01"
                            }
                        },
						{
                            "provider": "RGED",
                            "providerId": "ABC Inc",
                            "courseURL": "https://www.reged.com/courses/132566",
                            "completionStage": "New",
                            "courseId": "132566",
                            "courseName": "Super Carrier A Version 5 Producer Training",
                            "courseMethod": "Online",
                            "courseType": "Product",
                            "productTrainingType": "Fixed Deferred Annuity",
                            "status": "Not Started",
                            "completionInformation": {
                                "certificationDate": "2025-02-10",
                                "credentialHours": 25,
                                "certificationNumber": "34652643",
                                "continuingEducationHours": 10,
                                "completionDate": "2025-02-10",
                                "certificationState": "CT",
                                "expirationDate": "2026-02-09",
								"creationDate": "2025-02-02"
                            }
                        },
						{
                            "provider": "RGED",
                            "providerId": "ABC Inc",
                            "courseURL": "https://www.reged.com/courses/132566",
                            "completionStage": "New",
                            "courseId": "132566",
                            "courseName": "Ultra Carrier A Version 5 Producer Training",
                            "courseMethod": "Online",
                            "courseType": "Product",
                            "productTrainingType": "Fixed Deferred Annuity",
                            "status": "Elective",
                            "completionInformation": {
                                "certificationDate": "2025-02-10",
                                "credentialHours": 25,
                                "certificationNumber": "34652643",
                                "continuingEducationHours": 10,
                                "completionDate": "2025-02-10",
                                "certificationState": "CT",
                                "expirationDate": "2026-02-09",
								"creationDate": "2025-02-03"
                            }
                        },
						{
                            "provider": "RGED",
                            "providerId": "ABC Inc",
                            "courseURL": "https://www.reged.com/courses/132566",
                            "completionStage": "New",
                            "courseId": "132566",
                            "courseName": "Splendid Carrier A Version 5J Producer Training",
                            "courseMethod": "Online",
                            "courseType": "Product",
                            "productTrainingType": "Fixed Deferred Annuity",
                            "status": "Elective",
                            "completionInformation": {
                                "certificationDate": "2025-02-10",
                                "credentialHours": 25,
                                "certificationNumber": "34652643",
                                "continuingEducationHours": 10,
                                "completionDate": "2025-02-10",
                                "certificationState": "CT",
                                "expirationDate": "2026-02-09",
								"creationDate": "2025-02-04"
                            }
                        }
                    ]
                }
            ]
        }
    ]
}`


export function useTraining() {
    const producerTraining = ref<IProducerTraining>()

    const getProductTraining = async (npn: string): Promise<IProducerTraining> => {
        try {
            const response = await axios({
                method: 'get',
                withCredentials: false,
                url: `https://dc1pp0md2g.execute-api.us-west-2.amazonaws.com/v1/producer/details?npn=${npn}`
            });

            producerTraining.value = response.data as IProducerTraining

            if (!producerTraining.value.producerNPN) {
				console.warn('falling back to mock data')
				producerTraining.value = new ProducerTraining(JSON.parse(mockJSON)) as IProducerTraining
            }

            return producerTraining.value
        } catch (error) {
            console.error('Error fetching product training:', error);
            throw error;
        }
    }

    const getStatusData = async (userGuid: string, cusip: string) => {
        const storage = getLocalStorageData()
        const user = storage.allUsers?.find(x => x.guid == userGuid)
        const userTraining = await getProductTraining(user?.npn ?? '')
        const products = userTraining.carriers.flatMap(x => x.products)
        const product = products.find(x => x.CUSIP == cusip)

        return {
            user,
            product
        }
    }

    const resolveTrainingImage = (course: ICourse) => {
		const userStore = useUserStore()
		const carrrier = userStore.trainingData?.carriers.find(x => x.products.flatMap(y => y.courses.flatMap(z => z.courseId)).includes(course.courseId))

		
		let logoImage = genericLogo

		if (carrrier?.carrier == CARRIER_ATHENE)
			logoImage = atheneLogo
		else if (carrrier?.carrier == CARRIER_LINCOLN)
			logoImage = genericLogo2
		else if (logoIndex % 2 == 0)
			logoImage = genericLogo
		else
			logoImage = edjLogo

		logoIndex++

		return logoImage
    }

    return {
        producerTraining: computed(() => producerTraining.value),
        getProductTraining,
        getStatusData,
        resolveTrainingImage
    }

}

