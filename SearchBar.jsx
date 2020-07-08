import React, { useState, useRef } from "react";
import { View, TextInput, Keyboard } from "react-native";
import { Icon } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";

export default function SearchBar(props) {
  console.log(props.selection);
  return (
    <View
      style={[
        props.style,
        {
          backgroundColor: props.color,
          borderRadius: moderateScale(20),
          // width: "95%",
          alignSelf: "center",
          flexDirection: "row",
        },
      ]}
    >
      <Icon
        name="magnify"
        type="material-community"
        color="white"
        style={{
          top: moderateScale(5),
          left: moderateScale(5),
          opacity: 0.5,
        }}
      />
      <TextInput
        style={{
          paddingHorizontal: moderateScale(5),
          minWidth: moderateScale(200),
          maxWidth: moderateScale(200),
          minHeight: moderateScale(30),
          maxHeight: moderateScale(30),
          color: "#fff",
          left: moderateScale(5),
        }}
        onChangeText={(text) => {
          props.onChangeText(text); // I like it
        }}
        onFocus={props.onFocus}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor="#979B9D"
        selection={props.toggle && props.selection}
      />
    </View>
  );
}
