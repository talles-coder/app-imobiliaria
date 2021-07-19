import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';

import DashboardGestor from './pagesCorretor/DashboardGestor'
import DashboardCorretor from './pagesCorretor/DashboardCorretor';
import Loteamentos from './pagesCorretor/Loteamentos'
import CadastrarLoteamento from './pagesCorretor/CadastrarLoteamento'
import GerenciarCorretores from './pagesCorretor/GerenciarCorretores'
import TodasReservas from './pagesCorretor/TodasReservas'
import MinhasReservas from './pagesCorretor/MinhasReservas'

import CustomDrawer from '../../components/componentPages/CustomDrawer'
import {
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Global from '../../global/Global';

export default function Profile() {
  const Drawer = createDrawerNavigator();
  
  return (
    <Drawer.Navigator
      drawerStyle={{ width: '60%' }}
      edgeWidth={wp("20%")}
      initialRouteName="Dashboard"
      drawerContent={CustomDrawer}
      children
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false
      }}
    >
      { Global.PROFILETYPE == "gestor" ?
      <Drawer.Screen options={{unmountOnBlur:true}} name="Dashboard" component={DashboardGestor} />
     :
      <Drawer.Screen options={{unmountOnBlur:true}} name="Dashboard" component={DashboardCorretor} />
      }
      <Drawer.Screen options={{unmountOnBlur:true}} name="Loteamentos" component={Loteamentos} />
      <Drawer.Screen options={{unmountOnBlur:true}} name="CadastrarLoteamento" component={CadastrarLoteamento} />
      <Drawer.Screen options={{unmountOnBlur:true}} name="GerenciarCorretores" component={GerenciarCorretores} />
      <Drawer.Screen options={{unmountOnBlur:true}} name="MinhasReservas" component={MinhasReservas} />
      <Drawer.Screen options={{unmountOnBlur:true}} name="TodasReservas" component={TodasReservas} />

    </Drawer.Navigator>
  );
}