import React from "react";
import { View, StyleSheet, Text, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";
import { client } from "../client";
import { Notification } from "../components";
import { dietListing, User, colors, message, notificationType, removeToken, stackParamList, getToken } from "../util";

interface Props {
    navigation: NavigationProp<stackParamList>;
}

const DashBoard: React.FC<Props> = ({ navigation }) => {

    let [recommendations, setRecommendations] = React.useState<dietListing[]>([])
    let [user, setUser] = React.useState<User | null>(null)
    let [msg, setMsg] = React.useState<message | null>(null)
    let [showNotif, setShowNotif] = React.useState<boolean>(false)
    let [calories, setCalories] = React.useState<number>(0)
    let [protein, setProtein] = React.useState<number>(0)
    let [cost, setCost] = React.useState<number>(0)

    let fetchData = React.useCallback(async () => {
        try {
            let token = await getToken('@jwtToken')
            let res = await client.GetDashBoardInfo("/planner/d", token)

            if("message" in res) {
                setMsg({ text: res.message, messageType:  notificationType.error})
                setShowNotif(true)
            }

            if("meals" in res && "user" in res) {
                setRecommendations(res.meals)
                setUser({... res.user})

                let cal = res.meals.reduce((prevMealCalories, currMeal) => (prevMealCalories + currMeal.calories), 0)
                let proteinValue = res.meals.reduce((prevMealProtein, currMeal) => (prevMealProtein + currMeal.proteinValue), 0)
                let price = res.meals.reduce((prevMealCost, currMeal) => (prevMealCost + currMeal.cost), 0)  
                setCalories(cal)
                setProtein(Math.round(proteinValue))
                setCost(price)
            }
        } catch(e) {
            if(e instanceof Error) {
                setMsg({ text: e.message, messageType: notificationType.error})
                setShowNotif(true)
            } else {
                setMsg({ text: "technical issues, will get to you later!", messageType: notificationType.error })
                setShowNotif(true)
            }
        }
    }, [])

    let handleSignOut = async () => {
        try {
            let status = await removeToken('@jwtToken')

            if(status) {
                navigation.navigate('Introduction')
            }

        } catch(e) {
            if(e instanceof Error) {
                setMsg({ text: e.message, messageType: notificationType.error })
            }

            setMsg({ text: e, messageType: notificationType.info })
        }
    }

    useFocusEffect(React.useCallback(() => {
        fetchData()
        return () => {
    
        }
    }, [fetchData]))

    function toggleNotificationStatus() {
        setShowNotif(!showNotif)
    }

    return (
        <View style={styles.container}>
            { showNotif ? <Notification show={showNotif} message={msg} toggleShow={toggleNotificationStatus}/> : null }
            <View style={styles.heroContainer}>
                <Text style={styles.heroText}>Hi, {user ? user.firstname : ""}</Text>
                <TouchableOpacity onPress={handleSignOut}>
                    <FontAwesome name="sign-out" size={24} color={colors.secondary}/>
                </TouchableOpacity>
            </View>
            <View style={styles.summaryCard}>
                <View style={[styles.infoSummaryContainer, styles.calorieContainer]}>
                    <Text style={{ color: '#566573', fontWeight: '500' }}>Calories</Text>
                    <View style={styles.infoSummaryValues}>
                        <Ionicons name="restaurant" size={16} color={"blue"}/>
                        <Text style={{ color: 'blue', fontSize: 25, marginHorizontal: 5, fontWeight: '500' }}>{calories}</Text>
                        <Text style={{ color: 'blue', fontWeight: '300' }}>kcal</Text>
                    </View>
                </View>
                <View style={[styles.infoSummaryContainer, styles.proteinContainer]}>
                    <Text style={{ color: '#566573', fontWeight: '500' }}>Protein</Text>
                    <View style={styles.infoSummaryValues}>
                        <Ionicons name="egg" size={16} color={"red"}/>
                        <Text style={{ color: 'red', fontSize: 25, marginHorizontal: 5, fontWeight: '500' }}>{protein}</Text>
                        <Text style={{ color: 'red', fontWeight: '300' }}>grams</Text>
                    </View>
                </View>
                <View style={[styles.infoSummaryContainer, styles.totalCostContainer]}>
                    <Text style={{ color: '#566573', fontWeight: '500' }}>Total Cost</Text>
                    <View style={styles.infoSummaryValues}>
                        <Ionicons name="cash" size={16} color={"green"}/>
                        <Text style={{ color: 'green', fontSize: 25, marginHorizontal: 5, fontWeight: '500' }}>{cost}</Text>
                        <Text style={{ color: 'green', fontWeight: '300' }}>NGN</Text>
                    </View>
                </View>

            </View>
            <Text style={{ fontWeight: '600', fontSize: 20, marginVertical: 15 }}>Meals today</Text>
            <View style={styles.mealsContainer}>
                { recommendations.length > 0 ?
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: '15%' }}>
                    { recommendations.map((meal, index) => (
                        <View key={index} style={{...styles.mealContainer, backgroundColor: getRandomColor()}}>
                            <View style={styles.mealLogo}>
                                <Entypo name="bowl" size={48} color={colors.primary}/>
                            </View>
                            <View style={styles.mealDetails}>
                                {meal.carbs ? <Text>{meal.carbs}</Text> : null}
                                {meal.proteins ? <Text>{meal.proteins}</Text> : null}
                                {meal.vegetables ? <Text>{meal.vegetables}</Text> : null}
                                {meal.fruits ? <Text>{meal.fruits}</Text> : null}
                                {meal.beverages ? <Text>{meal.beverages}</Text> : null}
                            </View>
                        </View>
                    )) }
                </ScrollView>
                : <Text>No meal data to show yet</Text> }
            </View>
        </View>
    )
}

function getRandomColor(): string {
    // let cardColors = ["red", "blue", "orange", "purple", "peach", "maroon"]
    let cardColors = [
        "#FFD6E7",
        "#AEC6CF",
        "#D7B9FF",
        "#B4F2D4",
        "#FFCBB5",
        "#C9E4FF",
        "#D3D3D3",
        "#A7E9AF",
        "#E5D7FF",
        "#FFFFE0",
        "#B6FFC9",
        "#87CEEB",
        "#E6B8B8",
        "#FCE0C7",
        "#C8BFFF",
        "#FFD1DC",
        "#AFEEEE",
        "#FFDAB5",
        "#E9D1FF",
        "#FFFFF0",
        "#FFC9C9", 
        "#B5E5FF", 
        "#FFE5B5", 
        "#FFC1C1", 
        "#E0B3FF", 
        "#FFD8B5", 
        "#B5FFC9"
      ]
    let actualLength = cardColors.length - 1;

    let chosenIndex = Math.floor(Math.random() * actualLength)
    return cardColors[chosenIndex]
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 45,
        paddingHorizontal: 15,
        alignItems: "center",
        width: '100%',
        backgroundColor: `${colors.background}`
    },

    heroContainer: {
        width: '100%',
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
    },

    heroText: {
        fontSize: 30,
        fontWeight: '800',
        color: 'black'
    },

    summaryCard: {
        padding: 20,
        elevation: 10,
        width: '80%',
        height: '40%',
        justifyContent: 'space-around',
        borderTopRightRadius: 70,
        backgroundColor: '#ffff',
        marginBottom: 20,
    },

    mealsContainer: {
        flexDirection: 'row',
    },

    infoSummaryContainer: {
        padding: 8,
        borderLeftWidth: 3,
    },

    calorieContainer: {
        borderColor: 'blue',
    },

    proteinContainer: {
        borderColor: 'red',
    },

    totalCostContainer: {
        borderColor: 'green',
    },

    infoSummaryValues: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    mealContainer: {
        padding: 10,
        borderTopEndRadius: 150,
        elevation: 8,
        width: 230,
        height: 200,
        marginHorizontal: 10,
        marginBottom: 10,
        justifyContent: 'space-around',
    },

    mealLogo: {
        alignSelf: 'center',
    },

    mealDetails: {
        justifyContent: 'space-around',
        height: '55%',
    }
})

export default DashBoard;