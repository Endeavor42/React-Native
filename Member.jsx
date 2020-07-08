import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CheckBox, normalize } from "react-native-elements";
import AccessLevel from "../Accesslevel";

export default (props) => {
  return (
    <>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CheckBox
          containerStyle={{
            padding: 0,
            margin: 0,
            marginRight: 0,
            marginLeft: 0,
          }}
          checked={props.selected}
          onPress={() => {
            props.changeData((prev) => {
              return prev.map((obj, index) => {
                if (index === props.memberIndex) {
                  return { ...obj, selected: !obj.selected };
                }
                return obj;
              });
            });
          }}
          iconType="material-community"
          checkedIcon="checkbox-blank-circle"
          uncheckedIcon="checkbox-blank-circle-outline"
          checkedColor="white"
          uncheckedColor="white"
          size={normalize(17)}
        />
      </View>
      <View
        style={{
          width: "80%",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>{props.name}</Text>
        <AccessLevel accessLevel={props.accessLevel} />
      </View>
    </>
  );
};
