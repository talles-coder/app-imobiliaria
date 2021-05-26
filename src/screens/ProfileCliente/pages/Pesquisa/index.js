import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native';
import 'react-native-gesture-handler';
import Button from '../../../../components/Button'

const BottonDown = '../../assets/Btn-down.png'

export default function Pesquisa({ navigation }) {
  return (
    <SafeAreaView style={{ backgroundColor: "#0C1C41", flex: 1 }}>

      <View style={styles.header}>

        <TouchableOpacity style={styles.BTvoltar} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/Btn-voltar.png')} />
        </TouchableOpacity>


        <Text style={styles.TitleProf}>FILTRO</Text>

        <View style={styles.Space}>

        </View>

      </View>

      <View style={{ backgroundColor: '#0C1C41' }}>

        <TouchableOpacity style={styles.Boxzinhas}>
          <Text style={styles.TextoBoxzinha}>Categorias</Text>
          <Image style={styles.BTdown} source={require(BottonDown)} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.Boxzinhas}>
          <Text style={styles.TextoBoxzinha}>Data da Visita</Text>
          <Image style={styles.BTdown} source={require(BottonDown)} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.Boxzinhas}>
          <Text style={styles.TextoBoxzinha}>Faixa de Preço</Text>
          <Image style={styles.BTdown} source={require(BottonDown)} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.Boxzinhas}>
          <Text style={styles.TextoBoxzinha}>Proximidade</Text>
          <Image style={styles.BTdown} source={require(BottonDown)} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.Boxzinhas}>
          <Text style={styles.TextoBoxzinha}>Avaliação</Text>
          <Image style={styles.BTdown} source={require(BottonDown)} />
        </TouchableOpacity>

        <View style={styles.Boxzinhas}><TextInput style={styles.TextoBoxzinha} placeholder="Palavra-Chave"></TextInput></View>

      </View>

      <View style={{ flex: 0.5 }}>

      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button titulo='PESQUISAR' />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  TitleProf: {
    fontSize: 28,
    color: "#fff",
    fontWeight: 'bold',

  },
  header: {
    backgroundColor: '#0C1C41',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 50,
    marginTop: 27,
    width: '100%',
    alignSelf: 'center'

  },
  BTvoltar: {
    backgroundColor: '#0C1C41',
    width: 60,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center'

  },
  Space: {
    backgroundColor: '#0C1C41',
    width: 60,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Boxzinhas: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#bbb',
    alignSelf: 'center',
    width: '75%',
    height: 50,
    margin: '5%',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  TextoBoxzinha: {
    fontSize: 20,
    opacity: 0.6,
    paddingLeft: 25,
    alignSelf: 'center'

  },
  BTdown: {
    height: '100%',
    resizeMode: 'contain',
    width: 30,
    marginRight: 10
  },
  BotaoPesq: {
    borderRadius: 15,
    backgroundColor: '#063BD5',
    width: '65%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  }

})