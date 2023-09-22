import { View, Text, Image } from "react-native";
import React from "react";
import { homeStyles } from "../Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import moment from "moment";
import "moment-timezone";

const Home = () => {
  return (
    <SafeAreaView style={homeStyles.home}>
      <Navbar />
      <View style={homeStyles.messageContainer}>
        <View style={homeStyles.message}>
          <Text style={homeStyles.messageTitle}>Message of the Day</Text>
          <Text style={homeStyles.messageBody}>
            "So don't worry about tomorrow, because tomorrow will have its own
            warries. Each day has enough trouble of its own."
          </Text>
          <Text style={homeStyles.messageVerse}>Matthew 6:34 NCV</Text>
        </View>
      </View>
      <View style={homeStyles.exploreContainer}>
        <View style={homeStyles.exploreLeft}>
          <Text style={homeStyles.exploreText}>Explore</Text>
        </View>
        <View style={homeStyles.exploreRight}>
          <Text style={homeStyles.month}>
            {moment.tz("Asia/Manila").format("MMMM")}
          </Text>
          <Text style={homeStyles.day}>
            {moment().tz("Asia/Manila").format("DD")}
          </Text>
        </View>
      </View>
      <View></View>
      <View>
        <Text style={homeStyles.topVerseTitle}>Top Verses</Text>
        <View style={homeStyles.topVerseContainer}>
          <Image
            source={require("../../assets/top-verse-1.jpg")}
            style={homeStyles.topVerse}
          />
          <Image
            source={require("../../assets/top-verse-2.jpg")}
            style={homeStyles.topVerse}
          />
          <Image
            source={require("../../assets/top-verse-3.jpg")}
            style={homeStyles.topVerse}
          />
        </View>
      </View>
      <View>
        <View></View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
