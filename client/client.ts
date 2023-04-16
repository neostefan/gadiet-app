import { signInCredentials, registrationCredentials, userPreferences, dietListing } from '../util'

interface authResponse {
    message: boolean;
    status: number;
    metaData?: string;
}

interface plannerResponse {
    meal: dietListing;
    status: number;
    metaData?: string;
}

function isValidauthResponse(value: unknown): value is authResponse {
    return !!value && typeof value === 'object' && 'message' in value && typeof (value as authResponse).message == 'boolean'
}

function isValidError(value: unknown): value is Error {
    return !!value && typeof value == 'object'&& 'message' in value && typeof (value as Error).message == 'string'
}

function isValidPlannerResponse(value: unknown): value is plannerResponse {
    return !!value && typeof value == 'object' && 'meal' in value && typeof (value as plannerResponse).meal == 'object' 
}

class Client {
    private basePath: string = "http://192.168.145.118:5000/api";

    async SignIn(route: string, data: signInCredentials): Promise<authResponse> {
        var status: number

        try {
            let response = await fetch(this.basePath + route, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            let resData = await response.json()
            status = response.status

            if(status == 200 && isValidauthResponse(resData)) {
                return {
                    message: true,
                    status: status
                }
            } else if(status != 200) {
                return {
                    message: false,
                    status: status,
                    metaData: resData.message
                }
            }

        } catch(error) {
            if(isValidError(error)) {
                return {
                    message: false,
                    status: status,
                    metaData: error.message
                }
            } else {
                return {
                    message: false,
                    status: status
                }
            }
        }
    }

    async Register(route: string, data: registrationCredentials): Promise<authResponse> {
        var status: number

        try {
            let res = await fetch(this.basePath + route, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
    
            let resData = await res.json()
            status = res.status
            console.log(resData)

            if(isValidauthResponse(resData)) {
                return {
                    message: true,
                    status: status,
                }
            } else {
                throw Error('unable to parse response data')
            }
        } catch(error) {
            if(isValidError(error)) {
                return {
                    message: false,
                    status: status,
                    metaData: error.message
                }
            } else {
                return {
                    message: false,
                    status: status,
                    metaData: error.message
                }
            }
        }
    }

    async GetMeal(route: string, data: userPreferences): Promise<plannerResponse> {
        var status: number

        try {
            let res = await fetch(this.basePath + route, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            let resData = await res.json()
            status = res.status

            console.log(resData.message)

            if(isValidPlannerResponse(resData)) {
                return {
                    meal: resData.meal,
                    status: status
                }
            } else {
                throw Error('unable to parse meal response')
            }

        } catch(error) {
            if(isValidError(error)) {
                return {
                    meal: {},
                    status: status,
                    metaData: error.message
                }
            } else {
                return {
                    meal: {},
                    status: status,
                }
            }
        }
    }
}

export default new Client()