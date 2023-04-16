import React, { FC } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../util"

interface Props {
    title: string;
    onPress: () => void
}

export default function Button({ title, onPress }: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.title}>
                    { title }
                </Text>
            </TouchableOpacity>
        </View>
    )
}

let styles = StyleSheet.create({
    container: {
        color: `${colors.dark}`,
        borderRadius: 10,
        width: 'auto',
        borderWidth: 0,
        margin: 5,
        backgroundColor: `${colors.subtle}`,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    title: {
        fontWeight: '600',
        color: 'white',
        fontFamily: 'Ubuntu_400Regular_Italic',
    }
});