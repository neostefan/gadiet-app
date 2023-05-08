import { Dimensions } from "react-native";
import { getToken, setToken, removeToken } from "./auth-util";
import ErrorBoundary from "./error-boundary";

const { width, height } = Dimensions.get('window')

type keyboardTypeOptions = 'default' | 'number-pad'

type stackParamList = {
    Register: undefined,
    LogIn: undefined,
    Introduction: undefined,
    App: undefined
}

type tabParamList = {
    Dashboard: undefined,
    Planner: { authToken: string } | undefined
}

enum notificationType {
    info = "INFO",
    error = "ERROR"
}

interface User {
    Id: number;
    firstname: string;
    lastname: string;
    age: number;
    allergies: string;
    conditions: string;
    password: string;
}

interface message {
    text: string;
    messageType: notificationType;
}

interface userPreferences {
    maximum: string;
    minimum: string;
}

interface dietListing {
    carbs?: string;
    proteins?: string;
    oils?: string;
    vegetables?: string;
    beverages?: string;
    fruits?: string;
    calories?: number;
    proteinValue?: number;
    cost?: number;
}

interface signInCredentials {
    firstname: string;
    lastname: string;
    password: string;
}

interface registrationCredentials {
    firstname: string;
    lastname: string;
    password: string;
    condition?: string;
    age: number;
    allergies?: string;
}

const conditions: string[] = [
    "ulcer",
    "diabetes",
    "lactose-intolerant",
]

const colorScheme = {
    bright: "#fbcc01", //golden yellow
    primary: "#315625", //green
    secondary: "#e18c01", //orange
    dark: "#411f0e", //maroonish
    subtle: "#709d6b", //bluish green
    background: '#F9F6EE'
}

export {
    colorScheme as colors,
    keyboardTypeOptions,
    conditions,
    stackParamList,
    tabParamList,
    signInCredentials,
    registrationCredentials,
    userPreferences,
    width,
    height,
    dietListing,
    getToken,
    setToken,
    removeToken,
    ErrorBoundary,
    notificationType,
    message,
    User
}