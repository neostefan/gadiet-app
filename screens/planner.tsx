import React, { useState } from "react";
import { Text, View, StyleSheet, Image, Dimensions, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { PlannerDropDown, Button, DietList } from "../components";
import { colors, paramList, userPreferences, width, height, dietListing } from "../util";
import { client } from "../client";

type PlannerProps = NativeStackScreenProps<paramList, 'Planner'>

export default function Planner({ navigation }: PlannerProps) {

    let [meal, setMeal] = useState<dietListing | null>(null)
    let [maxCondition, setMaxCondition] = useState<string | null>(null)
    let [minCondition, setMinCondition] = useState<string | null>(null)
    let [calculating, setCalculating] = useState<boolean>(false)

    let screenName = navigation.getId()

    let handleSubmit = async () => {
        let data: userPreferences = {
            maximum: maxCondition,
            minimum: minCondition
        }

        setCalculating(true)
        console.log(maxCondition, minCondition)
        let res = await client.GetMeal('/planner/create', data)
        
        if(res.status == 200) {
            setCalculating(false)
            setMeal(res.meal)
            console.log(res.meal)
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Image source={require("../assets/plate.png")}/>
            </View>
            <View style={styles.options}>
                <PlannerDropDown placeholder="Select Condition To Maximize" dropDownValue={maxCondition} updateDropDownValue={setMaxCondition} screen={screenName}/>
                <PlannerDropDown placeholder="Select Condition To Minimize" dropDownValue={minCondition} updateDropDownValue={setMinCondition} screen={screenName}/>
            </View>
            <View>
                { calculating ? <ActivityIndicator color={`${colors.subtle}`} size="large"/>
                    : <DietList {...meal}/>
                }
                <Button title="Run Algorithm" onPress={handleSubmit}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: `${colors.background}`,
        justifyContent: 'center',
        alignItems: 'center', 
    },

    options: {
        flexDirection: 'row',
    }
});