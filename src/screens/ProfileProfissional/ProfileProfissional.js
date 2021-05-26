import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';

import Solicitaçoes from './pages/Solicitaçoes'
import MensagensCli from './pages/MensagensCli'
import NotasFiscais from './pages/NotasFiscais'
import Carteira from './pages/Carteira'
import PesquisaCli from './pages/PesquisaCli'
import Serviços from './pages/Serviços'
import Agenda from './pages/Agenda'

import CustomDrawerCli from './component/CustomDrawerCli'


export default function ProfileProfissional() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerStyle={{ width: '60%' }}
      edgeWidth={50}
      initialRouteName="Solicitaçoes"
      drawerContent={CustomDrawerCli}
      children
      screenOptions={{
        headerShown: false
      }}
    >
      <Drawer.Screen name="Solicitaçoes" component={Solicitaçoes} />
      <Drawer.Screen name="Mensagens" component={MensagensCli} />
      <Drawer.Screen name="Notas Fiscais" component={NotasFiscais} />
      <Drawer.Screen name="Carteira" component={Carteira} />
      <Drawer.Screen name="Pesquisa" component={PesquisaCli} />
      <Drawer.Screen name="Serviços" component={Serviços} />
      <Drawer.Screen name="Agenda" component={Agenda} />

    </Drawer.Navigator>
  );
}