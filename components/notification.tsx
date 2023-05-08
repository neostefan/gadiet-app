import React from "react";
import { View, Modal, Text, StyleSheet, Pressable } from "react-native";
import { message, colors, notificationType } from "../util"

interface Props {
    show: boolean;
    message: message;
    toggleShow: () => void;
}

const Notification: React.FC<Props> =  function({ show, message, toggleShow }) {
    return (
            <Modal
                style={styles.modalContainer}
                animationType="slide"
                transparent={true}
                visible={show}
            >
                { show && <View style={styles.modalBackdrop}></View> }
                <View style={styles.container}>
                    <View style={styles.modalContainer}>
                        <Text style={message.messageType == notificationType.error ? [styles.modalInformation, styles.errorText] : [styles.modalInformation, styles.messageText]}>{message.text}</Text>
                        <View>
                            <Pressable style={styles.modalButton} onPress={toggleShow}>
                                <Text style={{ color: "#fff" }}>Dismiss</Text>
                            </Pressable>
                        </View>
                    </View>
                </View> 
            </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderColor: '#000',
        height: 180,
        width: 350,
        justifyContent: 'space-around',
    },

    modalBackdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },

    modalInformation: {
        alignSelf: 'center',
    },

    errorText: {
        color: colors.secondary,
    },

    messageText: {
        color: colors.primary,
    },

    modalButton: { 
        backgroundColor: colors.primary, 
        borderWidth: 2, 
        borderRadius: 10,
        borderColor: colors.primary, 
        height: 40, 
        width: 80,
        alignItems: 'center',
        padding: 10,
        alignSelf: 'flex-end',
    },
})

export default Notification
