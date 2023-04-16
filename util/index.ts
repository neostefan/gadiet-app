import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

type keyboardTypeOptions = 'default' | 'number-pad'

type paramList = {
    Register: undefined,
    LogIn: undefined,
    Planner: {authToken: string} | undefined,
    Introduction: undefined,
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
    calories?: string;
    cost?: string;
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
    paramList,
    signInCredentials,
    registrationCredentials,
    userPreferences,
    width,
    height,
    dietListing
}