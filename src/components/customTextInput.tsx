import React,  { useState } from "react";
import { Text, TextInput, View } from "react-native";

const CustomTextInput = ({ label, value, onChangeText, secureTextEntry }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = secureTextEntry === true;

  return (
    <View className="mt-4">
      <View
        className={`border-b-2 ${isFocused ? "border-blue-500" : "border-gray-300"} flex-row items-center`}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={label}
          placeholderTextColor="#A0AEC0"
          className="flex-1 py-2 text-base text-gray-700"
        />
        {isPassword && (
          <Text className="text-gray-400 text-xl ml-2">👁</Text>
        )}
      </View>
    </View>
  );
};
export default CustomTextInput;
