import React, { Dispatch, SetStateAction, useState } from "react";
import { View, FlatList, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { colors, width } from "../util";

interface Props {
    dropDownValue: string | null;
    updateDropDownValue: Dispatch<SetStateAction<string>>
    screen?: string;
}

interface Item {
    label: string;
    value: string;
}

export default function AuthDropDown({dropDownValue, updateDropDownValue, screen }: Props) {
    let [showFlatList, setShowFlatList] = useState<boolean>(false)
    let [items, setItems] = useState<Item[]>([
        {label: 'Ulcer', value: 'Ulcer'},
        {label: 'Diabetes', value: 'Diabetes'},
        {label: 'Lactose-Intolerant', value: 'Lactose-Intolerant'}
    ])

    return (
     <DropDownPicker
        containerStyle={styles.container}
        open={showFlatList}
        items={items}
        value={dropDownValue}
        setItems={setItems}
        setOpen={setShowFlatList}
        setValue={updateDropDownValue}
        placeholder="Select Your Health Condition"
     />   
    )
}

const styles = StyleSheet.create({
    container: {
        width: 250,
        margin: 10,
        zIndex: 3,
    },
});

/*
<View style={styles.container}>
            <Text style={styles.field}>{fieldName}</Text>
            <TouchableOpacity onPress={() => setShowFlatList(!showFlatList)}>
                <TextInput style={styles.dropdownInputField} value={dropDownValue} editable={false}/>
            </TouchableOpacity>
            { showFlatList ?
                <FlatList style={styles.flatList}
                    data={ data }
                    renderItem={({item}) => (
                        <ScrollView style={styles.dropDownItem}>
                            <TouchableOpacity onPress={() => {
                                updateDropDownValue(item)
                                setShowFlatList(false)
                            }}>
                                <Text style={styles.dropDownItemOptions}>{ item }</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    )}
                    keyExtractor={(i) => i}
            /> : <View/> }
        </View>
*/