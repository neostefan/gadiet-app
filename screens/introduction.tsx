import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import DietImg from "../assets/svg/diet.svg";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors, paramList } from "../util"

type IntroductionProps = NativeStackScreenProps<paramList, 'Introduction'>

export default function Introduction({ navigation }: IntroductionProps) {
    return (
        <View style={styles.section}>
            <View style={styles.hero}>
                <DietImg width={300} height={650}/>
                <Text style={styles.heroText}>
                    Ready to Optimize Your Diet Plans
                </Text>
            </View>
            <TouchableOpacity style={styles.action} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.actionText}>
                    Get Started
                </Text>
                <MaterialIcons name="keyboard-arrow-right" color={'#fff'}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        backgroundColor: '#F9F6EE',
        padding: 20,
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    hero: {
        
    },

    heroText: {
        color: `${colors.primary}`,
        lineHeight: 20,
        textAlign: 'center',
        fontFamily: 'Ubuntu_400Regular_Italic',
        fontWeight: '600',
        fontSize: 20,
    },

    action: {
        width: 120,
        height: 40,
        backgroundColor: `${colors.subtle}`,
        flexDirection: 'row',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    actionText: {
        padding: 5,
        color: '#fff',
        fontFamily: 'Ubuntu_400Regular_Italic',
        fontWeight: '600',
    }
})