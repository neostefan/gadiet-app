import React from "react";
import { View, Text, StyleSheet } from "react-native"
import { dietListing } from "../util";

export default function DietList({ calories, beverages, carbs, cost, proteins, vegetables, oils, fruits }: dietListing) {
    return(
        <View style={styles.listContainer}>
            <Text style={styles.mealItem}>{carbs}</Text>
            <Text style={styles.mealItem}>{proteins}</Text>
            <Text style={styles.mealItem}>{vegetables}</Text>
            <Text style={styles.mealItem}>{oils}</Text>
            <Text style={styles.mealItem}>{fruits}</Text>
            <Text style={styles.mealItem}>{beverages}</Text>
            <Text style={styles.mealItem}>Calories: {calories}</Text>
            <Text style={styles.mealItem}>Cost: {cost}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        alignItems: 'center',
    },

    mealItem: {

    }
})