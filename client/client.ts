import { signInCredentials, registrationCredentials, userPreferences, dietListing, User } from '../util'

interface authResponse {
    message: any;
    status: number;
    token?: string;
}

interface plannerResponse {
    meal: dietListing;
}

interface dashboardResponse {
    meals: dietListing[];
    user: User
}

interface failedPlannerResponse {
    message: string;
}

function isValidauthResponse(value: unknown): value is authResponse {
    return !!value && typeof value === 'object' && 'message' in value && typeof (value as authResponse).message == 'boolean'
}

function isValidError(value: unknown): value is Error {
    return !!value && typeof value == 'object'&& 'message' in value && typeof (value as Error).message == 'string'
}

class Client {
    private basePath: string = "http://213.168.250.5:5000/api";

    async SignIn(route: string, data: signInCredentials): Promise<authResponse> {
        var status: number

        try {
            let response = await fetch(this.basePath + route, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 
                    'Content-Type': 'application/json'
                }
            });

            let resData: authResponse = await response.json()
            status = response.status

            if(status == 200 && isValidauthResponse(resData)) {
                return {
                    message: true,
                    status: status,
                    token: resData.token
                }
            } else if(status != 200) {
                return {
                    message: resData.message,
                    status: status,
                    token: resData.token
                }
            }

        } catch(error) {
            if(isValidError(error)) {
                throw Error(error.message)

            } else {
                throw Error("unable to login: " + error)
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
                throw Error(error.message)
            } else {
               throw Error("unable to register, contact admin with message: " + error)
            }
        }
    }

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.JXUnFSAPT0Y_lyRAz6mOr-1A4K61GzJRh94RXR8VUqU
    async GetDashBoardInfo(route: string, userToken: string): Promise<dashboardResponse | failedPlannerResponse> {
        try {
            let res = await fetch(this.basePath + route, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + userToken
                }
            })

            let resData: dashboardResponse | failedPlannerResponse = await res.json()

            if(!res.ok && "message" in resData) {
                throw Error(resData.message)
            }

            return resData

        } catch(e) {
            if(isValidError(e)) {
                throw Error(`Failed to fetch dashboard info: ${e.message}`)
            } else {
                throw Error("Failed to fetch dashboard info")
            }
        }
    }

    async GetMeal(route: string, data: userPreferences, userToken: string): Promise<plannerResponse | failedPlannerResponse> {
        try {
            let res = await fetch(this.basePath + route, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken,
                }
            });

            let resData: plannerResponse | failedPlannerResponse = await res.json()

            if(!res.ok && "message" in resData) {
                throw Error(resData.message)
            }

            return resData

        } catch(error) {
            if(isValidError(error)) {
               throw Error(`Failed to fetch meal: ${error.message}`)
            } else {
                throw Error('Failed to fetch meal')
            }
        }
    }
}

export default new Client()