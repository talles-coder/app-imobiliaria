import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import 'react-native-gesture-handler';

import CadProfissionais from '../../component/CadProfissionais';


export default function Profissionais({ navigation }) {
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

        <Text style={styles.TitleProf}>PROFISSIONAIS</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Pesquisa')}>
          <Icon name="search" size={40} color="#fff" />
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


          <CadProfissionais
            img={require('../../assets/Bolinha-foto.png')}
            NameProf="Paulo Fernandes"
            NameRamo="Programador"
            DescServico='Desenvolvimento de App em JavaScript e Flash'
            Distancia="A 1km de você"
            Avali="4,6"
            onClick={() => alert('Solicitado')}>

          </CadProfissionais>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <CadProfissionais
            img={require('../../assets/Bolinha-foto-1.png')}
            NameProf="Julia Pontes"
            NameRamo="Designer Grafico"
            DescServico='Criação de Banners e desenvolvimento de logos'
            Distancia="A 10km de você"
            Avali="5,6"
            onClick={() => alert('Solicitado')}>

          </CadProfissionais>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <CadProfissionais
            img={require('../../assets/Bolinha-foto.png')}
            NameProf="Iago Roberts"
            NameRamo="Tecnico de Informatica"
            DescServico='Monto computadores e faço formatação'
            Distancia="A 5,5km de você"
            Avali="9,0"
            onClick={() => alert('Solicitado')}>


          </CadProfissionais>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <CadProfissionais
            img={require('../../assets/Bolinha-foto-1.png')}
            NameProf="Mariana Santos"
            NameRamo="Testadora de Softwares"
            DescServico='Testo SoftWares atras de buggs'
            Distancia="A 3km de você"
            Avali="3,4"
            onClick={() => alert('Solicitado')}>


          </CadProfissionais>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>


          <CadProfissionais
            img={require('../../assets/Bolinha-foto.png')}
            NameProf="Victor Limon"
            NameRamo="Web Desing"
            DescServico='Crio Sites'
            Distancia="A 6km de você"
            Avali="3,0"
            onClick={() => alert('Solicitado')}>


          </CadProfissionais>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <CadProfissionais
            img={require('../../assets/Bolinha-foto.png')}
            NameProf="Danilo Gates"
            NameRamo="Coach"
            DescServico='Faço palestra de discurso motivational'
            Distancia="A 4km de você"
            Avali="2,5"
            onClick={() => alert('Solicitado')}>


          </CadProfissionais>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>


          <CadProfissionais
            img={require('../../assets/Bolinha-foto.png')}
            NameProf="Diego Silvaldo"
            NameRamo="Tecnico de informatica"
            DescServico='Troco o Coleer do seu pc'
            Distancia="A 0,5km de você"
            Avali="4,6"
            onClick={() => alert('Solicitado')}>

          </CadProfissionais>
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