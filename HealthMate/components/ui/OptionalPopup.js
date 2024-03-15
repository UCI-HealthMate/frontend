import React, { useState } from 'react';
import { Modal, Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import { Colors } from "../../constants/styles";


const FoodNeedsPopup = ({ isVisible, onClose, title, message, onPressYes }) => {
 return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={{ ...styles.openButton, borderColor: Colors.primary500, borderWidth: 1, marginRight: 10}}
              onPress={onClose}
            >
              <Text style={styles.cancelStyle}>Cancel</Text>
            </TouchableHighlight>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: Colors.primary500 }}
            onPress={() => {
                onPressYes();
                onClose();
            }}
          >
            <Text style={styles.yesStyle}>Yes, I'm sure!</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
    </Modal>
 );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 40,
        backgroundColor: Colors.primary100,
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
    },
    modalTitle: {
        marginBottom: 15,
        fontWeight: "bold",
        textAlign: "center"
    },
    modalMessage: {
        marginBottom: 15,
        textAlign: "center"
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: '100%',
        paddingHorizontal: 20,
     },
    openButton: {
        borderRadius: 8,
        padding: 10,
        marginTop: 0,
        marginBottom: -10,
    },
    yesStyle: {
        color: Colors.primary600,
        fontWeight: "bold",
        textAlign: "center",
    },
    cancelStyle: {
        color: Colors.primary600,
        fontWeight: "bold",
        textAlign: "center",
        width: 60,
        
    }
});

export default FoodNeedsPopup;