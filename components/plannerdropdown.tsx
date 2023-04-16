import React, { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { width } from "../util"

interface Props {
    dropDownValue: string | null;
    updateDropDownValue: Dispatch<SetStateAction<string>>
    screen?: string;
    placeholder: string;
}

interface Item {
    label: string;
    value: string;
}

export default function PlannerDropDown({dropDownValue, updateDropDownValue, placeholder }: Props) {

    let [showFlatList, setShowFlatList] = useState<boolean>(false)
    let [items, setItems] = useState<Item[]>([
        {label: 'Price', value: 'Price'},
        {label: 'Calories', value: 'Calories'},
        {label: 'Protein', value: 'Protein'}
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
        placeholder={placeholder}
     />   
    )
}

const styles = StyleSheet.create({
    container: {
        width: width/2.2,
        margin: 10,
        zIndex: 3,
        fontFamily: 'Ubuntu_400Regular_Italic',
    },

    dropdowntext: {
        fontFamily: 'Ubuntu_400Regular_Italic',
    }
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