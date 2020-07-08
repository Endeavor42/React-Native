import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Icon } from "react-native-elements";
import SearchBar from "./SearchBar";
import { Consumer } from "../../../ContextProvider";
import normalize from "react-native-normalize";
import Member from "../Add_member/Member";

export default function AddMember(props) {
  const [firstDummyData, setFirstDummyData] = useState([
    { name: "Tony Stank", accessLevel: "manager", selected: false, key: 0 },
    { name: "Andrew Yang", accessLevel: "manager", selected: false, key: 1 },
    { name: "John Doe", accessLevel: "viewer", selected: false, key: 2 },
    { name: "Maria Lopez", accessLevel: "viewer", selected: false, key: 3 },
  ]);
  const [secondDummyData, setSecondDummyData] = useState([]);
  const [toggleDismiss, setToggleDismiss] = useState(false);
  const [searchBarText, setSearchBarText] = useState("");
  const [selectionData, setSelectionData] = useState({
    text: null,
    fullName: null,
  });
  const [toggle, setToggle] = useState(false);

  // function search(text) {
  //   let filteredName = list.filter((item) => {
  //     const itemData = item.toUpperCase();
  //     const textData = text.toUpperCase();
  //     return itemData.indexOf(textData) > -1;
  //   });
  //   if (text == "" || filteredName == []) {
  //     setList(locs);
  //   } else {
  //     setList(filteredName);
  //   }
  // }

  function search(text) {
    const filteredMember = firstDummyData.filter((member) => {
      const upperCasedMember = member.name.toUpperCase();
      const upperCasedText = text.toUpperCase();
      // console.log(upperCasedMember, upperCasedText);
      return upperCasedMember.indexOf(upperCasedText) != -1;
    });
    // console.log(filteredMember, filteredMember.length);
    if (filteredMember.length === 1 && !toggle) {
      const fullName = filteredMember[0].name;
      const slicedName = filteredMember[0].name.slice(text.length);
      setSelectionData({ text, fullName });
      setToggle(true);
      setSearchBarText(fullName);
    }
  }

  return (
    <View style={styles.pageContainer}>
      {toggleDismiss && (
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setToggleDismiss(false);
          }}
        >
          <View style={styles.searchBarOverlay} />
        </TouchableWithoutFeedback>
      )}
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          height: normalize(58),
        }}
      >
        {/*search bar container*/}
        <SearchBar
          placeholder="Search member..."
          color="#4E585E"
          onChangeText={(text) => {
            setSearchBarText((prev) => text);
            search(searchBarText);
          }}
          value={searchBarText}
          onFocus={() => {
            setToggleDismiss(true);
          }}
          selection={
            toggle && {
              start: selectionData.text.length,
              end: selectionData.fullName.length,
            }
          }
          toggle={toggle}
        />
      </View>
      <View style={styles.topContainer}>
        <Text
          style={{
            color: "grey",
            alignSelf: "flex-start",
            left: "8%",
            bottom: "2%",
          }}
        >
          All Members
        </Text>

        {/*Searches through the current list to only show the ones being searched for*/}
        <Consumer>
          {({ userProf, locations }) => (
            <View style={styles.topInnerContainer}>
              <FlatList
                style={{ marginTop: "3%" }}
                data={firstDummyData}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: normalize(17),
                    }}
                  >
                    <Member
                      name={item.name}
                      accessLevel={item.accessLevel}
                      selected={item.selected}
                      changeData={setFirstDummyData}
                      memberIndex={index}
                    />
                  </View>
                )}
              />
            </View>
          )}
        </Consumer>
      </View>

      <View style={styles.middleContainer}>
        <TouchableOpacity
          style={[
            styles.middleButtons,
            { right: moderateScale(20), height: normalize(37) },
          ]}
          onPress={() => {
            setSecondDummyData((prevData) => [
              ...prevData,
              ...firstDummyData.filter((member) => member.selected),
            ]); // transfer data to selected member container
            setSecondDummyData((prev) =>
              prev.map((obj) => {
                return { ...obj, selected: false };
              })
            );
            setFirstDummyData((prev) =>
              prev.filter((member) => !member.selected)
            ); // remove selected checkboxes
          }}
        >
          <Icon type="material-community" name="chevron-down" color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.middleButtons,
            { left: moderateScale(20), height: normalize(37) },
          ]}
          onPress={() => {
            setFirstDummyData((prev) => [
              ...prev,
              ...secondDummyData.filter((member) => member.selected),
            ]);
            // setDummyData(secondDummyData.filter((member) => member.selected));
            setFirstDummyData((prev) =>
              prev
                .map((obj) => {
                  return { ...obj, selected: false };
                })
                .sort((a, b) => a.key - b.key)
            ); //
            setSecondDummyData((prev) =>
              prev.filter((member) => !member.selected)
            );
          }}
        >
          <Icon type="material-community" name="chevron-up" color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <Text
          style={{
            color: "grey",
            left: "8%",
            bottom: "1%",
            alignSelf: "flex-start",
          }}
        >
          Selected Members
        </Text>
        <View style={styles.bottomInnerContainer}>
          <FlatList
            style={{ marginTop: "3%" }}
            data={secondDummyData}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: normalize(17),
                }}
              >
                <Member
                  name={item.name}
                  accessLevel={item.accessLevel}
                  selected={item.selected}
                  changeData={setSecondDummyData}
                  memberIndex={index}
                />
              </View>
            )}
          />
        </View>
      </View>

      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity style={styles.nextButton}>
          <Text style={{ color: "white", alignSelf: "center" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/*All styles associated with this class.*/
const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "#2E363B",
    height: "35%",
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  pageContainer: {
    alignItems: "center",
    backgroundColor: "#384044",
    height: "100%",
  },
  topInnerContainer: {
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    borderRadius: 5,
    height: "81%",
    width: "90%",
    backgroundColor: "#384044",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    height: "35%",
    width: "95%",
    backgroundColor: "#2E363B",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomInnerContainer: {
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    borderRadius: 5,
    height: "81%",
    width: "90%",
    backgroundColor: "#384044",
    justifyContent: "center",
    alignItems: "center",
  },
  middleContainer: {
    flexDirection: "row",
    height: normalize(55),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  middleButtons: {
    width: "20%",
    backgroundColor: "#2E363B",
    borderRadius: moderateScale(5),
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0,

    elevation: 5,
  },
  nextButton: {
    backgroundColor: "#376EC5",
    alignSelf: "flex-end",
    padding: moderateScale(10),
    paddingHorizontal: moderateScale(30),
    borderRadius: moderateScale(5),
    marginRight: "7%",
  },
  searchBarOverlay: {
    position: "absolute",
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#000",
    opacity: 0,
    zIndex: 10,
  },
});
