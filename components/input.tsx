import React, { FC } from "react";
import { View, TextInput, StyleSheet, Dimensions, Text } from "react-native";
import { colors, keyboardTypeOptions, width } from "../util";

interface Props {
    placeholder: string;
    onChange: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: keyboardTypeOptions;
    fieldName: string;
}

export default function Input({ onChange, placeholder, secureTextEntry, keyboardType, fieldName }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.field}>{fieldName}</Text>
            <TextInput 
            style={styles.textField} 
            placeholder={placeholder}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width / 1.1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
    },

    textField: {
        borderColor: `${colors.primary}`,
        borderRadius: 5,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 5,
        width: 250,
        padding: 5,
        fontFamily: 'Ubuntu_400Regular_Italic',
    },

    field: {
        color: `${colors.subtle}`,
        fontWeight: '600',
        marginVertical: 1,
        fontFamily: 'Ubuntu_400Regular_Italic',
        width: 250,
    }
});
