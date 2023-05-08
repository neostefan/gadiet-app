import AsyncStorage from "@react-native-async-storage/async-storage";

function setToken(token: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        try {
            await AsyncStorage.setItem('@jwtToken', token)
            resolve(true)
        } catch(e) {
            reject(e)
        }
    })
}

function getToken(key: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            let token = await AsyncStorage.getItem('@jwtToken')
            resolve(token)
        } catch(e) {
            reject(e)
        }
    })
}

function removeToken(key: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        try {
            await AsyncStorage.removeItem(key)
            resolve(true)
        } catch(e) {
            reject(e)
        }
    })
}

export {
    getToken,
    setToken,
    removeToken,
}