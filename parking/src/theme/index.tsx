import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import { useToast } from "react-native-toast-notifications";
import { variables } from "../../theme";

import asteroidApi from "../../services/asteroidApi";
import {
  HomeScreenNavigationProp,
  IAsteroidData,
} from "../../navigrations/types";
import randomApi from "../../services/randomApi";

const HomePage = () => {
  const { navigate } = useNavigation<HomeScreenNavigationProp>();
  const [asteroidId, setAsteroidId] = useState("");
  const [error, setError] = useState(false);

  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const [rloading, setrLoading] = useState(false);

  async function handleAsteroid() {
    setLoading(true);
    return asteroidApi(asteroidId)
      .then(({ data }) => {
        // Transforming data
        const { name, nasa_jpl_url, is_potentially_hazardous_asteroid } =
          data as IAsteroidData;
        const prepareData: IAsteroidData = {
          name,
          nasa_jpl_url,
          is_potentially_hazardous_asteroid,
        };
        setLoading(false);
        setAsteroidId("");
        navigate("Details", { asteroidData: prepareData });
      })
      .catch((error) => {
        toast.show("Invalid AsteroidID");
        console.error(error);
        setLoading(false);
        setError(true);

        setAsteroidId("");
      });
  }

  useEffect(() => {
    if (asteroidId === "") {
      return setError(false);
    }
  }, [asteroidId]);

  async function handleRandom() {
    setrLoading(true);
    return randomApi()
      .then(({ data }) => {
        const randomObject = Math.floor(
          Math.random() * data.near_earth_objects.length
        );
        const randomId = data.near_earth_objects[randomObject];

        // Transforming data
        const { name, nasa_jpl_url, is_potentially_hazardous_asteroid } =
          randomId as IAsteroidData;
        const prepareData: IAsteroidData = {
          name,
          nasa_jpl_url,
          is_potentially_hazardous_asteroid,
        };
        setrLoading(false);
        // Set data
        navigate("Details", { asteroidData: prepareData });
      })
      .catch((error) => {
        console.error(error);
        setrLoading(false);
        setError(true);
      });
  }

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Asteroid</Text>
            {/* Input search */}
            <View style={{ display: "flex" }}>
              <TextInput
                placeholder="Enter Asteroid ID"
                style={styles.loginFormTextInput}
                value={asteroidId}
                onChangeText={setAsteroidId}
                onSubmitEditing={handleAsteroid}
              />

              <View style={{ marginTop: 16, alignSelf: "center" }}>
                <Button
                  buttonStyle={styles.loginButton}
                  onPress={handleAsteroid}
                  title="SUBMIT"
                  disabled={!asteroidId}
                />

                {loading && (
                  <ActivityIndicator
                    size="small"
                    style={{ paddingLeft: 8 }}
                    color={variables.colors.black500}
                  />
                )}
              </View>

              <View style={{ marginTop: 16, alignSelf: "center" }}>
                <Button
                  buttonStyle={styles.loginButton}
                  onPress={handleRandom}
                  title="Random Asteroid"
                />

                {rloading && (
                  <ActivityIndicator
                    size="small"
                    style={{ paddingLeft: 8 }}
                    color={variables.colors.black500}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default HomePage;
