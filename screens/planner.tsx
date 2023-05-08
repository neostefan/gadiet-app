import React, { useState } from "react";
import { Text, View, StyleSheet, Image, Dimensions, ActivityIndicator } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { PlannerDropDown, Button, DietList, Notification } from "../components";
import { colors, stackParamList, userPreferences, dietListing, message, notificationType, width, getToken } from "../util";
import { client } from "../client";

interface Props {
    navigation: NavigationProp<stackParamList, 'App'>
}

const Planner: React.FC<Props> = function ({ navigation }) {

    let [meal, setMeal] = useState<dietListing | null>(null)
    let [maxCondition, setMaxCondition] = useState<string | null>(null)
    let [minCondition, setMinCondition] = useState<string | null>(null)
    let [calculating, setCalculating] = useState<boolean>(false)
    let [msg, setMsg] = useState<message | null>(null)
    let [showNotif, setShowNotif] = useState<boolean>(false)

    let screenName = navigation.getId()

    let toggleNotificationStatus = () => {
        setShowNotif(!showNotif)
    }

    let handleSubmit = async () => {
        let data: userPreferences = {
            maximum: maxCondition,
            minimum: minCondition
        }

        setCalculating(true)

        if(maxCondition === null || minCondition === null) {
            setMsg({ text: "Please ensure all constraints are filled for optimization", messageType: notificationType.info })
            setShowNotif(true)
            setCalculating(false)
            return 
        }

        try {
            let token = await getToken('@jwtToken')
            let res = await client.GetMeal('/planner/create', data, token)

            if("meal" in res) {
                setCalculating(false)
                setMeal(res.meal)
            }

            if("message" in res) {
                setCalculating(false)
                setMsg({ messageType: notificationType.error, text: res.message })
                setShowNotif(true)
            }
        } catch(e) {
            if(e instanceof Error) {
                setMsg({ text: e.message, messageType: notificationType.error })
                setShowNotif(true)
                setCalculating(false)
            }
        }
    }

    return (
        <View style={styles.container}>
            { showNotif ? <Notification show={showNotif} message={msg} toggleShow={toggleNotificationStatus} /> : null }
            <View style={styles.imageCard}>
                <Image style={styles.img} source={require("../assets/plate.png")}/>
            </View>
            <View style={styles.options}>
                <PlannerDropDown placeholder="Select Condition To Maximize" dropDownValue={maxCondition} updateDropDownValue={setMaxCondition} screen={screenName}/>
                <PlannerDropDown placeholder="Select Condition To Minimize" dropDownValue={minCondition} updateDropDownValue={setMinCondition} screen={screenName}/>
            </View>
            { meal !== null ? 
                <View style={styles.nutritionCard}>
                    <Text style={styles.nutritionCardTitle}>Nutritional Information</Text>
                    <View style={styles.nutritionCardBody}>
                        <View style={[styles.infoCard, styles.protein]}>
                            <Text>Protein</Text>
                            {calculating ? <ActivityIndicator color={`${colors.subtle}`} size="large"/> : <Text>{meal.proteinValue}g</Text>}
                        </View>
                        <View style={[ styles.infoCard, styles.calories ]}>
                            <Text>Calories</Text>
                            {calculating ? <ActivityIndicator color={`${colors.subtle}`} size="large"/> : <Text>{meal.calories}KCal</Text>}
                        </View>
                        <View style={[ styles.infoCard, styles.price ]}>
                            <Text>Price</Text>
                            {calculating ? <ActivityIndicator color={`${colors.subtle}`} size="large"/> : <Text>NGN {meal.cost}</Text>}
                        </View>
                    </View>
                </View> : null
            }
                { calculating ? <ActivityIndicator color={`${colors.subtle}`} size="large"/>
                    :  <DietList meal={meal}/>
                }

                <Button title="Optimize" onPress={handleSubmit}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: `${colors.background}`,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 50,
        overflow: "scroll",
    },

    imageCard: {
        backgroundColor: `${colors.background}`,
        padding: 2,
        borderWidth: 2,
        borderColor: `${colors.background}`,
        borderRadius: 15,
        elevation: 10,
    },

    img: {
        width: 350,
        height: 315,
    },

    options: {
        flexDirection: 'row',
        padding: 20,
    },

    nutritionCard: {
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: "#566573",
        elevation: 30,
        width: width / 1.1,
        backgroundColor: colors.background,
        marginBottom: 30,
    },

    nutritionCardTitle: {
        fontWeight: '600',
        fontSize: 15,
    },

    nutritionCardBody: {
        flexDirection: "row",
        width: '100%',
        marginTop: 10,
        justifyContent: 'space-around',
    },

    infoCard: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: 5,
        padding: 10,
        width: '25%',
    },

    protein: {
        backgroundColor: "#F35151",
    },

    calories: {
        backgroundColor: "#46F1EF",
    },

    price: {
        backgroundColor: "#D346F3",
    },
});

export default Planner