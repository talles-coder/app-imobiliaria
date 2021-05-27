import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import 'react-native-gesture-handler';
import CadPag from '../../component/CadPag';


export default function Pagamentos({ navigation }) {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  return (
    <SafeAreaView style={{ backgroundColor: "#0C1C41", flex: 1 }}>
      <StatusBar style="light" hidden={false} translucent={false} backgroundColor='#0C1C41' />

      <Animated.View
        style={[
          styles.header,
          {
            height: scrollY.interpolate({
              inputRange: [10, 160, 185],
              outputRange: [100, 21, 0],
              extrapolate: 'clamp'
            }),
            opacity: scrollY.interpolate({
              inputRange: [1, 75, 170],
              outputRange: [1, 1, 0],
              extrapolate: 'clamp'
            })
          }
        ]} >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>

          <Icon name="menu" size={40} color="#fff" />

        </TouchableOpacity>

        <Text style={styles.TitleProf}>PAGAMENTOS</Text>

        <TouchableOpacity style={{ width: 40, height: 40 }}>

        </TouchableOpacity>

      </Animated.View>

      <ScrollView
        scrollEventThrottle={20}
        onScroll={Animated.event([{
          nativeEvent: {
            contentOffset: { y: scrollY }
          },
        }],
          { useNativeDriver: false })}

      >

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <CadPag
            img={require('../../assets/Bolinha-foto.png')}
            NameProf="Kaio Augusto"
            Divida="Pendente">
          </CadPag>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <CadPag
            img={require('../../assets/Bolinha-foto.png')}
            NameProf="Rodolfo Freitas"
            Divida="Pago">
          </CadPag>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <CadPag
            img={require('../../assets/Bolinha-foto.png')}
            NameProf="Marcos Silva"
            Divida="Pago">
          </CadPag>
        </View>





      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  TitleProf: {
    fontSize: 28,
    color: "#fff",
    fontWeight: 'bold'

  },
  header: {
    backgroundColor: '#0C1C41',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 23,
    paddingLeft: 23,
    borderBottomWidth: 2,
    borderBottomColor: '#0C1C41',
    width: '100%',
    alignSelf: 'center'

  }
})