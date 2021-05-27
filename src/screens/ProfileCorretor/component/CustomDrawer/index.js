import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import Global from "../../../../global/Global";
import { getImageFromFirebase, signout } from '../../../../database/Firebase';

export default function CustomDrawer(props) {
  function handleSignOutButton() {
    Alert.alert('Você tem certeza que deseja sair?', '', [
      {
        text: "Cancelar",
        onPress: () => { },
        style: 'cancel'
      }, {
        text: "Sim",
        onPress: () => {
          props.navigation.navigate('Login');
          signout();
        },
        style: 'default'
      }]
    )
  }

  function buscarImagemPerfil() {
    const imagem = Global.PROFILEIMAGE;

    if (imagem) {
      getImageFromFirebase(imagem, (url, error) => {
        if (error) console.log(error);
        Global.IMAGEURL = url;
      });
    }

    return Global.IMAGEURL
  }

  function formatarNome(nome) {
    let tmp = nome.split(" ");
    if (tmp[1]) {
      nome = tmp[0] + " " + tmp[1];
    }
    return nome;
  }

  return (
    <View>
      <View style={styles.BoxUser}>
        <Image
          style={styles.imgPerfil}
          source={{ uri: buscarImagemPerfil() }}
        />
        <Text style={styles.NameUser}>{formatarNome(Global.NOME)}</Text>
      </View>

      <View style={styles.BoxMid}>

        <DrawerItem
          icon={() => <Image source={require('../../assets/profs.png')} />}
          label="Profissionais"
          onPress={() => props.navigation.navigate('Profissionais')}
        />
        <DrawerItem
          icon={() => <Image source={require('../../assets/mensagens.png')} />}
          label="Mensagens"
          onPress={() => props.navigation.navigate('Mensagens')}
        />
        <DrawerItem
          icon={() => <Image source={require('../../assets/chamados.png')} />}
          label="Seus Chamados"
          onPress={() => props.navigation.navigate('Seus Chamados')}
        />
        <DrawerItem
          icon={() => <Image source={require('../../assets/carteira.png')} />}
          label="Pagamentos"
          onPress={() => props.navigation.navigate('Pagamentos')}
        />


      </View>

      <View style={styles.LastBox}>

        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../assets/editar.png')} />
          <Text style={{ color: '#000', fontWeight: 'bold' }}>Alternar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={handleSignOutButton}>

          <Image source={require('../../assets/sair.png')} />
          <Text style={{ color: '#000', fontWeight: 'bold' }}>Sair</Text>

        </TouchableOpacity>

      </View>


    </View>
  );

}

const styles = StyleSheet.create({
  BoxUser: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '9%',
    backgroundColor: '#0C1C41',
    padding: 10,
  },
  imgPerfil: {
    width: heightPercentageToDP('6.3%'),
    height: heightPercentageToDP('6.3%'),
    borderRadius: heightPercentageToDP('50%'),
  },
  BoxMid: {
    height: '80%'
  },
  LastBox: {
    height: '11%',
    flexDirection: 'row'
  },
  NameUser: {
    padding: 10,
    fontSize: hp('2%'),
    color: '#fff',
    fontWeight: 'bold',
  },

})
