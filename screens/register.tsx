import React from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { Input, Button, AuthDropDown, Notification } from "../components";
import { colors, stackParamList, registrationCredentials, message, notificationType } from "../util";
import { client } from "../client";
import PlateImg from "../assets/svg/breakfast.svg"

interface Props {
    navigation: NavigationProp<stackParamList>
}

const Register: React.FC<Props> = function ({ navigation }) {

    let screenName = navigation.getId()
    let [firstName, setFirstName] = React.useState<string>("")
    let [lastName, setLastName] = React.useState<string>("")
    let [passWord, setPassWord] = React.useState<string>("")
    let [age, setAge] = React.useState<string>("")
    let [condition, setCondition] = React.useState<string | null>(null)
    let [showNotif, setShowNotif] = React.useState<boolean>(false)
    let [msg, setMsg] = React.useState<message | null>(null)

    let toggleNotificationStatus = () => {
        setShowNotif(!showNotif)
    }

    let handleSubmit = async () => {
        let data: registrationCredentials = {
            firstname: firstName,
            lastname: lastName,
            age: +age,
            password: passWord,
            condition: condition
        }

        try {
            let res = await client.Register('/auth/register', data)

            if(res.message) {
                navigation.navigate('LogIn')
            } else {
                setMsg({ text: `unable to register ${firstName} please contact an admin`, messageType: notificationType.error })
                setShowNotif(true)
            }
        } catch(e) {
            if(e instanceof Error) {
                setMsg({ text: e.message, messageType: notificationType.error })
                setShowNotif(true)
            } else {
                setMsg({ text: `technical difficulties, please contact an admin`, messageType: notificationType.error })
                setShowNotif(true)
            }
        }
    }

    return (
        <View style={styles.container}>
            { showNotif ? <Notification message={msg} show={showNotif} toggleShow={toggleNotificationStatus}/> : null }
            <PlateImg width={165} height={180}/>
            <Input placeholder="Enter your first name" onChange={setFirstName} fieldName="First Name"/>
            <Input placeholder="Enter your last name" onChange={setLastName} fieldName="Last Name"/>
            <Input placeholder="Enter a password" onChange={setPassWord} secureTextEntry fieldName="Password"/>
            <Input placeholder="Enter your age" onChange={setAge} keyboardType="number-pad" fieldName="Age"/>
            <AuthDropDown dropDownValue={condition} updateDropDownValue={setCondition} screen={screenName} />
            <Button onPress={handleSubmit} title="Register"/>
            <Text style={styles.infoTextContainer}>Already Registered? <TouchableOpacity style={styles.linkContainer} onPress={() => navigation.navigate('LogIn')}><Text style={styles.linkText}>Log In</Text></TouchableOpacity></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: `${colors.background}`,
    },

    infoTextContainer: {
        alignContent: 'center',
        fontFamily: 'Ubuntu_400Regular_Italic',
        fontWeight: "600",
        color: `${colors.primary}`,
    },

    linkContainer: {
        padding: 0,
        margin: 0,        
    },

    linkText: {
        color: `${colors.secondary}`,
        fontFamily: 'Ubuntu_400Regular_Italic',
        fontWeight: '600',
    }
});

export default Register;
