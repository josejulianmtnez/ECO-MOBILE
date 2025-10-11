import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const MainButton = ({onPress, title, disabled}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`mt-10 bg-primary py-3 rounded-full h-16 w-full items-center justify-center shadow-lg`}
            disabled={disabled}
        >
            <Text className="text-white font-bold">{title}</Text>
        </TouchableOpacity>
    );
}

export default MainButton;