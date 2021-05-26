import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import 'react-native-gesture-handler';

import CadClie from '../../component/CadClie';


export default function Solicitaçoes({ navigation }) {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  return(

    
    
    <SafeAreaView style={{backgroundColor:"#0C1C41", flex:1}}>
      
      
      <StatusBar style = "light" hidden = {false} translucent = {false} backgroundColor = '#0C1C41' />
      
      <Animated.View 
      style={[
        styles.header,
        {
          height: scrollY.interpolate({
            inputRange:[10, 160, 185],
            outputRange:[100, 21, 0],
            extrapolate: 'clamp'
          }),
          opacity: scrollY.interpolate({
            inputRange:[1, 75, 170],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp'
          })
        }
        ]} > 
        <TouchableOpacity onPress={ () => navigation.openDrawer()}>
         
           <Icon name="menu" size={40} color="#fff" />
           
        </TouchableOpacity>
        
           <Text style={styles.TitleProf}>SOLICITAÇÕES</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Pesquisa')}>
           <Icon name="search" size={40} color="#fff" />
        </TouchableOpacity>
      
      </Animated.View>

      <ScrollView
      scrollEventThrottle={20}
      onScroll={Animated.event([{
        nativeEvent:{
          contentOffset: { y: scrollY}
        },
      }],
      { useNativeDriver: false  })}

      >
      
      <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
          
        
          <CadClie
          img={require('../../assets/Bolinha-foto.png')} 
          NameCli="Vieira Saulo" 
          Serviço="Manutenção de Nootbook" 
          Preço='300.00' 
          Status="PENDENTE">
  
          </CadClie>
          <CadClie
          img={require('../../assets/Bolinha-foto-1.png')} 
          NameCli="Alessandra Aparecida" 
          Serviço="Formatação" 
          Preço='120.00' 
          Status="PENDENTE">
                      </CadClie>
          <CadClie
          img={require('../../assets/Bolinha-foto.png')} 
          NameCli="Lucas Alvim" 
          Serviço="Atualização de Drivers" 
          Preço='130.00' 
          Status="PENDENTE">          </CadClie>
          <CadClie
          img={require('../../assets/Bolinha-foto.png')} 
          NameCli="Zihao Peçanha" 
          Serviço="Criar Banco de Dados" 
          Preço='5.000.00' 
          Status="PENDENTE">          </CadClie>
          <CadClie
          img={require('../../assets/Bolinha-foto.png')} 
          NameCli="Maksim Mansilha" 
          Serviço="Configurar Rede" 
          Preço='350.00' 
          Status="PENDENTE">          </CadClie>
          <CadClie
          img={require('../../assets/Bolinha-foto-1.png')} 
          NameCli="Julieta Caires" 
          Serviço="Montar Maquina" 
          Preço='250.00' 
          Status="PENDENTE">
  
          </CadClie>
          <CadClie
          img={require('../../assets/Bolinha-foto.png')} 
          NameCli="Gianluca Neves " 
          Serviço="Criar Sistema ERP" 
          Preço='10.000.00' 
          Status="PENDENTE">
  
          </CadClie>
          <CadClie
          img={require('../../assets/Bolinha-foto-1.png')} 
          NameCli="Kieza Café" 
          Serviço="Trocar Placa de Video" 
          Preço='100.00' 
          Status="PENDENTE">
  
          </CadClie>
          <CadClie
          img={require('../../assets/Bolinha-foto-1.png')} 
          NameCli="Tamára Malafaia " 
          Serviço="Manutenção de Computador" 
          Preço='300.00' 
          Status="PENDENTE">
  
          </CadClie>
          
        </View>    
      
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  TitleProf:{
    fontSize: 28,
    color:"#fff",
    fontWeight: 'bold'
    
  },
  header:{
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