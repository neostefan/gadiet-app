import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";


import { Input, Button, Notification } from "../components"
import { colors, stackParamList, signInCredentials, setToken, message, notificationType } from "../util";
import { client } from '../client';
import PlateImg from "../assets/svg/breakfast.svg"
import { NavigationProp } from "@react-navigation/native";

interface Props {
    navigation: NavigationProp<stackParamList>
}

const LogIn: React.FC<Props> = function ({ navigation }) {

    let [firstName, setFirstName] = React.useState<string>("");
    let [lastname, setLastName] = React.useState<string>("")
    let [password, setPassWord] = React.useState<string>("");
    let [msg, setMsg] = React.useState<message | null>(null)
    let [showNotif, setShowNotif] = React.useState<boolean>(false)

    let toggleNotificationStatus = () => {
        setShowNotif(!showNotif)
    }

    let handleSubmit = async () => {
        let data : signInCredentials = {
            firstname: firstName,
            lastname: lastname,
            password: password
        }

        try {

            let res = await client.SignIn('/auth/sign-in', data)

            if(res.message && "token" in res && typeof res.token == "string") {
                let statusOfSetToken = await setToken(res.token)
                
                if (statusOfSetToken) {
                    navigation.navigate('App')
                } else {
                    setMsg({ text: "unable to authorize token!", messageType: notificationType.error })
                    setShowNotif(true)
                }

            } else {
                setMsg({ text: res.message, messageType: notificationType.error})
                setShowNotif(true)
            }

        } catch(e) {
            if(e instanceof Error) {
                setMsg({ text: e.message, messageType: notificationType.error })
                setShowNotif(true)
            } else {
                setMsg({ text: "technical difficulties! ", messageType: notificationType.error })
                setShowNotif(true)
            }
        }
    }

    return (
        <View style={styles.container}>
            { showNotif ? <Notification show={showNotif} message={msg} toggleShow={toggleNotificationStatus}/> : null }
            <PlateImg width={165} height={180}/>
            <Input placeholder="Enter your first name" onChange={setFirstName} fieldName="First Name"/>
            <Input placeholder="Enter your last name" onChange={setLastName} fieldName="Last Name"/>
            <Input placeholder="Enter your password" onChange={setPassWord} secureTextEntry fieldName="Password"/>
                <Text style={styles.infoTextContainer}>Not Registered?
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.linkText}> Sign Up</Text>
                    </TouchableOpacity>
                </Text>
            <Button onPress={handleSubmit} title="Log In"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: `${colors.background}`
    },

    infoTextContainer: {
        alignContent: 'center',
        fontWeight: "600",
        color: `${colors.primary}`,
        fontFamily: 'Ubuntu_400Regular_Italic',
        marginVertical: 20,
    },

    linkText: {
        color: `${colors.secondary}`,
        fontFamily: 'Ubuntu_400Regular_Italic',
        fontWeight: '600',
    }
})

export default LogIn