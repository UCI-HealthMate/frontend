import { View, Text, TextInput, StyleSheet } from "react-native";

import { Colors } from "../../constants/styles";

const Input = ({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) => {
  return (
    <View style={styles.inputContainer}>
      {/* <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text> */}
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={label}
        placeholderTextColor={!isInvalid ? "#F8CECC" : Colors.error500}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: Colors.primary500,
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary800,
    borderRadius: 8,

    borderColor: Colors.primary100,
    borderWidth: 2,

    fontSize: 16,
    color: Colors.primary500,
  },
  inputInvalid: {
    // backgroundColor: Colors.error100,
    color: Colors.error500,
  },
});
