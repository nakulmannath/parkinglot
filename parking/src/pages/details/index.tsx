import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from './styles';

const DetailsPage = () => {
  var myloop = [];
  for (let i = 0; i < 10; i++) {
    myloop.push(
      <View key={i}>
        <View style={styles.SquareShapeView}>
          <Text style={styles.textArea}>{i}</Text>
        </View>
      </View>,
    );
  }

  return <ScrollView>{myloop}</ScrollView>;
};

export default DetailsPage;
