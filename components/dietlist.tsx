import React from "react";
import { View, Text, StyleSheet } from "react-native"
import { dietListing, width, colors } from "../util";

interface props {
    meal: dietListing;
}

const DietList: React.FC<props> = function({ meal }) {
    return(
        <View style={styles.componentCard}>
            <Text style={styles.componentCardTitle}>Meal Components</Text>
            { meal !== null ?
                <View style={styles.componentCardBody}>
                    { meal.carbs ? <Text>Carbs: {meal.carbs}</Text> : null }
                    { meal.proteins ? <Text>Protein: {meal.proteins}</Text> : null }
                    { meal.vegetables ? <Text>Vegetable: {meal.vegetables}</Text> : null }
                    { meal.oils ? <Text >Oils: {meal.oils}</Text> : null }
                    { meal.fruits ? <Text >Fruits: {meal.fruits}</Text> : null }
                    { meal.beverages ? <Text >Beverage: {meal.beverages}</Text> : null }
                    <Text style={styles.additionalInfo}>NB: 1 serving is approximately NGN 100</Text>
                </View>
            :  <Text>No Meal Ingredients Selected</Text> }
        </View>
    )
}

const styles = StyleSheet.create({
    componentCard: {
        width: width / 1.1,
        padding: 10,
        borderRadius: 20,
        elevation: 20,
        backgroundColor: colors.background,
        alignItems: 'center',
        marginBottom: 20,
    },

    componentCardTitle: {
        fontSize: 15,
        fontWeight: '600',
    },

    componentCardBody: {
        justifyContent: 'space-around',
        height: '75%',
    },

    additionalInfo: {
        fontFamily: 'Ubuntu_400Regular_Italic',
        fontWeight: '800',
    }
})

export default DietList