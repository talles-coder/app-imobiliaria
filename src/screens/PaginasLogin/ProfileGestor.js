import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';

import DashboardGestor from './pagesCorretor/DashboardGestor'
// import Loteamentos from './pagesCorretor/Loteamentos'
import CadastrarLoteamento from './pagesCorretor/CadastrarLoteamento'
import CriarUsuario from './pagesCorretor/CriarUsuario'
// import GerenciarCorretores from './pagesCorretor/GerenciarCorretores'
// import TodasReservas from './pagesCorretor/TodasReservas'
// import MinhasReservas from './pagesCorretor/MinhasReservas'

import CustomDrawerGestor from '../../components/componentPages/CustomDrawerGestor'


export default function ProfileGestor() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerStyle={{ width: '60%' }}
      edgeWidth={50}
      initialRouteName="CadastrarLoteamento"
      drawerContent={CustomDrawerGestor}
      children
      screenOptions={{
        headerShown: false
      }}
    >
      <Drawer.Screen name="DashboardGestor" component={DashboardGestor} />
      {/* <Drawer.Screen name="Loteamentos" component={Loteamentos} /> */}
      <Drawer.Screen name="CadastrarLoteamento" component={CadastrarLoteamento} />
      <Drawer.Screen name="CriarUsuario" component={CriarUsuario} />
      {/* <Drawer.Screen name="GerenciarCorretores" component={GerenciarCorretores} /> */}
      {/* <Drawer.Screen name="TodasReservas" component={TodasReservas} /> */}
      {/* <Drawer.Screen name="MinhasReservas" component={MinhasReservas} /> */}

    </Drawer.Navigator>
  );
}