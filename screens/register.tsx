import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Input, Button, AuthDropDown } from "../components";
import { colors, paramList, registrationCredentials } from "../util";
import { client } from "../client";
import PlateImg from "../assets/svg/breakfast.svg"

type RegisterProps = NativeStackScreenProps<paramList, "LogIn">

export default function Register({ navigation }: RegisterProps) {

    let screenName = navigation.getId()
    let [firstName, setFirstName] = useState<string>("")
    let [lastName, setLastName] = useState<string>("")
    let [passWord, setPassWord] = useState<string>("")
    let [age, setAge] = useState<string>("")
    let [condition, setCondition] = useState<string | null>(null)
    let [error, setError] = useState<string | null>(null)

    let handleSubmit = async () => {
        let data: registrationCredentials = {
            firstname: firstName,
            lastname: lastName,
            age: +age,
            password: passWord,
            condition: condition
        }

        let res = await client.Register('/auth/register', data)

        if(res.message) {
            navigation.navigate('LogIn')
        } else {
            setError(res.metaData)
        }
    }

    return (
        <View style={styles.container}>
            <PlateImg width={165} height={180}/>
            <Input placeholder="Enter your first name" onChange={setFirstName} fieldName="First Name"/>
            <Input placeholder="Enter your last name" onChange={setLastName} fieldName="Last Name"/>
            <Input placeholder="Enter a password" onChange={setPassWord} secureTextEntry fieldName="Password"/>
            <Input placeholder="Enter your age" onChange={setAge} keyboardType="number-pad" fieldName="Age"/>
            <AuthDropDown dropDownValue={condition} updateDropDownValue={setCondition} screen={screenName} />
            <Button onPress={handleSubmit} title="Register"/>
            <Text style={styles.infoTextContainer}>Already Registered? <TouchableOpacity style={styles.linkContainer} onPress={() => navigation.push("LogIn")}><Text style={styles.linkText}>Log In</Text></TouchableOpacity></Text>
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
