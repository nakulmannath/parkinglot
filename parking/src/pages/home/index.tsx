import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';
import {HomeScreenNavigationProp} from '../../navigations/types';
// import {variables} from '../../theme';

const HomePage = () => {
  const {navigate} = useNavigation<HomeScreenNavigationProp>();
  const [space, setSpace] = useState('');
  const [, setError] = useState(false);

  const [loading] = useState(false);

  async function handleSpace() {
    navigate('Details');
    // setLoading(true);
    // return asteroidApi(asteroidId)
    //   .then(({ data }) => {
    //     // Transforming data
    //     const { name, nasa_jpl_url, is_potentially_hazardous_asteroid } =
    //       data as IAsteroidData;
    //     const prepareData: IAsteroidData = {
    //       name,
    //       nasa_jpl_url,
    //       is_potentially_hazardous_asteroid,
    //     };
    //     setLoading(false);
    //     setAsteroidId("");
    //     navigate("Details", { asteroidData: prepareData });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setLoading(false);
    //     setError(true);
    //     setSpace("");
    //   });
  }

  useEffect(() => {
    if (space === '') {
      return setError(false);
    }
  }, [space]);

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Parking Manager</Text>
            {/* Input search */}
            <View style={{display: 'flex'}}>
              <TextInput
                placeholder="Enter Number of Spaces"
                style={styles.loginFormTextInput}
                value={space}
                onChangeText={setSpace}
                onSubmitEditing={handleSpace}
              />

              <View style={{marginTop: 16, alignSelf: 'center'}}>
                <Button
                  buttonStyle={styles.loginButton}
                  onPress={handleSpace}
                  title="SUBMIT"
                  disabled={!space}
                />

                {loading && (
                  <ActivityIndicator
                    size="small"
                    style={{paddingLeft: 8}}
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
