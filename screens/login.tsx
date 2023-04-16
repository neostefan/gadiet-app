import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Input, Button } from "../components"
import { colors, paramList, signInCredentials } from "../util";
import { client } from '../client';
import PlateImg from "../assets/svg/breakfast.svg"

type LogInProps = NativeStackScreenProps<paramList, "LogIn">

export default function LogIn({ navigation }: LogInProps) {

    let [firstName, setFirstName] = useState<string>("");
    let [lastname, setLastName] = useState<string>("")
    let [password, setPassWord] = useState<string>("");

    let handleSubmit = async () => {
        let data : signInCredentials = {
            firstname: firstName,
            lastname: lastname,
            password: password
        }
        let res = await client.SignIn('/auth/sign-in', data)

        console.log("msg: ", res.message)
        if(res.message) {
            navigation.push('Planner')
        } else {
            console.log(res.metaData)
        }
    }

    return (
        <View style={styles.container}>
            <PlateImg width={165} height={180}/>
            <Input placeholder="Enter your first name" onChange={setFirstName} fieldName="First Name"/>
            <Input placeholder="Enter your last name" onChange={setLastName} fieldName="Last Name"/>
            <Input placeholder="Enter your password" onChange={setPassWord} secureTextEntry fieldName="Password"/>
                <Text style={styles.infoTextContainer}>Not Registered?
                    <TouchableOpacity onPress={() => navigation.push("Register")}>
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