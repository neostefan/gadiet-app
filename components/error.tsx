import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

interface props {
    errorMsg: string;
}

export default function ErrorDisplay({ errorMsg }: props) {

    let [] = useState<string | null>()

    return (
        <View style={styles.container}>
            <Text style={styles.errorMsg}>
                { errorMsg }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
    },

    errorMsg: {

    }
})

