import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { homeStyles } from "../Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import moment from "moment";
import "moment-timezone";
import { bibleAPIKey, bibleBaseAPIURL } from "../EnvironmentVariable";
import axios from "axios";
import { DailyMessageInterface } from "../types/Types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const [randomVerse, setRandomVerse] = useState<DailyMessageInterface[]>();

  useEffect(() => {
    const fetchRandomVerse = async () => {
      try {
        const response = await axios.get(`${bibleBaseAPIURL}/random-verse`, {
          headers: {
            "X-RapidAPI-Key": bibleAPIKey,
          },
        });
        setRandomVerse(response.data);

        await AsyncStorage.setItem(
          "randomVerse",
          JSON.stringify(response.data)
        );
        await AsyncStorage.setItem("lastFetchTime", moment().toString());
      } catch (error) {
        console.error("Error fetching random verse:", error);
      }
    };

    const checkLastFetchTime = async () => {
      try {
        const lastFetchTime = await AsyncStorage.getItem("lastFetchTime");

        if (lastFetchTime) {
          const currentTime = moment();
          const lastFetchMoment = moment(lastFetchTime);

          if (currentTime.diff(lastFetchMoment, "days") >= 1) {
            fetchRandomVerse();
          } else {
            const storedVerse = await AsyncStorage.getItem("randomVerse");
            if (storedVerse) {
              setRandomVerse(JSON.parse(storedVerse));
            }
          }
        } else {
          fetchRandomVerse();
        }
      } catch (error) {
        console.error("Error checking last fetch time:", error);
      }
    };

    checkLastFetchTime();
  }, []);

  return (
    <SafeAreaView style={homeStyles.home}>
      <Navbar />
      {randomVerse !== undefined && (
        <View style={homeStyles.messageContainer}>
          <View style={homeStyles.message}>
            <Text style={homeStyles.messageTitle}>Message of the Day</Text>
            <Text style={homeStyles.messageBody}>{randomVerse[0]?.text}</Text>
            <Text style={homeStyles.messageVerse}>
              {randomVerse[0]?.book_name} {randomVerse[0]?.chapter}:
              {randomVerse[0]?.verse} {randomVerse[0]?.translation_id}
            </Text>
          </View>
        </View>
      )}
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
