import React from 'react';
import { ImageBackground, FlatList, Image, StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
const fundo = "../../../../../assets/fundo.png";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class PreviaLotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nomeLote: "",
      planta: {
        fileName: "",
        resultado: ""
      },
      csvObject: {
        name: "",
        uri: "",
        content: "",
        values: {
          totalQuadras: "" ,
          totalLotes: "" ,
        }
      },
      address: {
        descricao: "",
        mapSnapshotURI: ""
      },
    };
  }

  render() {
    const {data, back, quadra} = this.props
    let nome = 'Previa Lotes'
    return (
      <ImageBackground style={styles.imgBackground} source={require(fundo)}>
        <View style={styles.container}>
          <Header titulo={nome} funcao={back} />

          <View style={{height: hp("23%"), width: wp("90%"), alignSelf: 'center'}}>
            { data.planta.resultado ?
              <Image
              style={styles.imgPerfil}
              resizeMethod="resize"
              resizeMode='cover'
              source={{ uri: data.planta.resultado}}
              />
           : <Text>Erro: Não foi realizada a captura do mapa, tente novamente</Text>}
          </View> 
          

          <View style={{height:"65%", width: wp("90%"), alignSelf: 'center'}}>
            <FlatList
                data={Object.values(data.csvObject.content)}
                renderItem={({ item }) => {
                  return (
                    <View>   
                          {
                            item[quadra]
                          ?
                          <View style={styles.caixa}>
                            <Text style={[styles.title]}>{item[quadra].lote}</Text>
                            <Button titulo='Reservar' btStyle={{marginBottom: 0, width:wp("24%"), height:hp("5%")}} hidden={true}/>
                            <Button titulo='Vender' funcao={this.vender} btStyle={{marginBottom: 0, width:wp("24%"), height:hp("5%")}} hidden={true}/>    
                          </View>
                         :
                          null
                          }
                      </View> 
                    );
                  }}
                  keyExtractor={(item, index) => {return String(index)}}
              />
          </View> 
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  caixa:{
    flexDirection: 'row',
    backgroundColor:'white',
    borderRadius:15,
    width:wp("90%"),
    height:hp("8%"),
    marginTop:20,
    alignSelf:'center',
    alignItems:'center',
    borderWidth:0.7,
    justifyContent:'space-around'
  },
  formulario: {
    marginBottom: hp('3.5%')
  },
  title: {
    fontSize: hp('2.2%'),
    color: "#000",
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
  imgBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "space-around", 
    alignItems: "center"
  },
  imgPerfil: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    borderColor: "#999",
    borderWidth:2
},
});