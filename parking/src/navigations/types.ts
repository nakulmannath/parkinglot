import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from '@react-navigation/native';
import React from "react";

export interface IAsteroidData {
    name: string;
    nasa_jpl_url: string;
    is_potentially_hazardous_asteroid: string;
  }

export type AppStackNavigatorParamList = {
    Home: undefined;
    Details: {asteroidData: IAsteroidData};
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
    AppStackNavigatorParamList,
    "Details"
>;

export type DetailsScreenRouteProp = RouteProp<
AppStackNavigatorParamList,
  'Details'
>;