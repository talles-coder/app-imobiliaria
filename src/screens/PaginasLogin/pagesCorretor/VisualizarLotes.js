import React from 'react';
import { ImageBackground, FlatList, Image, StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import Header from '../../../components/Header';
import Button from '../../../components/Button';
import GerenciarLotes from '../../../components/GerenciarLotes';
const fundo = "../../../../assets/fundo.png";

import Global from '../../../global/Global';



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
      touchable : true,
    };
  }

  componentDidMount = () => {
    this.props.atualizar()
  }

  render() {
    const {touchable} = this.state
    const {data, back, quadra, atualizar, updating} = this.props
    let titulo = 'Lotes da ' + quadra.replace("_"," ")
    return (
      <ImageBackground style={styles.imgBackground} source={require(fundo)}>
        <View style={styles.container} pointerEvents={touchable ? 'auto' : 'none'}>
          <Header titulo={titulo} funcao={back} />

          <View style={{height:150, width: wp("90%"), alignSelf: 'center'}}>
            { data.planta.resultado ?
              <Image
              style={styles.imgPerfil}
              resizeMethod="resize"
              resizeMode='cover'
              source={{ uri: data.planta.resultado}}
              />
            : <Text>Erro : Não foi realizada a captura do mapa, tente novamente</Text>}
          </View> 

          <View style={{height:"65%", width: wp("90%"), alignSelf: 'center'}}>
            <FlatList
                refreshing={updating}
                onRefresh={this.componentDidMount}
                data={Object.values(data.csvObject.content)}
                extraData={data.csvObject.content}
                renderItem={({ item, index }) => {
                  return (
                    <View>   
                      {
                        item[quadra]
                      ?
                        <GerenciarLotes
                          id={data.id}
                          index={index}
                          quadra={quadra}
                          lote={item[quadra]?.lote}
                          status={item[quadra]?.status}
                          data={item[quadra]?.data.seconds} 
                          corretor={item[quadra]?.corretor}
                          gestor={item[quadra]?.gestor}
                          tipo={Global.PROFILETYPE}
                          atualizar={atualizar}
                        />
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
    fontSize: hp('2.5%'),
    color: "#000",
    textAlign: 'center',
    textAlignVertical: 'bottom',
    fontWeight: 'bold',
    marginBottom: 10,
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