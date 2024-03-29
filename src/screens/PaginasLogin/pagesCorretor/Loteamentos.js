import React , {useEffect} from 'react';
import { FlatList,Modal, StyleSheet, Text, View, StatusBar, TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '../../../components/Button';

import InformacoesLoteamento from './subPages/InformacoesLoteamento'
import updateLoteamentos from "../../../services/Loteamentos";


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class Loteamentos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      dados: [],
      updating: true,
      loteData: {},
      index: ""
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  componentDidMount = () => {
    
    this.setState({
      updating: true
    })
    updateLoteamentos("loteamentos")
      .then((array)=>{
        this.setState({
          dados: array,
          updating: false
        })
        if(this.state.index.length !== null) {
          this.setState({
            loteData: this.state.dados[this.state.index]
          })
        }
      })
      .catch((error) => {console.log(error)})
  }

  

  render(){
    const { dados, updating, modalVisible , loteData} = this.state
    return (
    <View style={{flex:1, backgroundColor:'#475658'}}>
      <StatusBar hidden = {false} translucent = {false} backgroundColor = '#475658' />
        <View style={styles.header} on>
          <TouchableOpacity onPress={()=> {this.props.navigation.openDrawer()}}>
            <Icon name="menu" size={35} color="white" />
          </TouchableOpacity>
          <Text style={styles.titlepage}>Loteamentos</Text>
          <View style={{width:40}}></View>
        </View>
        {   this.state.dados.length === 0
                    ?
                    <View style={[styles.loteReservado, {height: hp("8%")}]}>
                        <Text style={[styles.titleStatus]}>Não há loteamentos cadastrados.</Text>
                    </View>
                    :
                    null
                }
        <FlatList
          refreshing={updating}
          onRefresh={this.componentDidMount}
          extraData={this.state.dados}
          keyExtractor={(item) => item.id}
          data={dados}
          renderItem={({item, index}) => 
          <TouchableOpacity onPress={() => {
            this.setState({
              loteData: item,
              index: index
            })
            this.setModalVisible(true)
          }}>
            <View style={styles.caixa }>
                <Text  style={{fontSize: 20, padding:3, fontWeight: 'bold'}} numberOfLines={1}>{String(item.nomeLote).trim().toUpperCase()}</Text>
                <Text  style={styles.titleitem}>Quantidade de Lotes: {item.csvObject.totalLotes}</Text>
                <Text  style={styles.titleitem}>Reservados: {item.csvObject.totalReservados}</Text>
                <Text  style={styles.titleitem}>Vendidos: {item.csvObject.totalVendidos}</Text>
                <Text  style={styles.titleitem}>Disponíveis: {
                  item.csvObject.totalLotes - (item.csvObject.totalReservados+item.csvObject.totalVendidos)
                }</Text>
            </View>
          </TouchableOpacity>
          }/>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              this.setModalVisible(false);
              this.setState({
                index: ""
              })
            }}
          >
            <View style={styles.maps}>
              <InformacoesLoteamento
                data={loteData}
                back={
                  () => {
                    this.setModalVisible(false)
                    this.setState({
                      index: ""
                    })
                  }}
                atualizar={()=> {
                  this.componentDidMount()
                }}
                updating={updating}
              />
            </View>
          </Modal>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  titleitem: {
    fontSize: 12,
    opacity:0.7,
  },
  titlepage:{
    fontSize: 25,
    color:"white",
    fontWeight: 'bold'
  },
  loteReservado: {
    backgroundColor:'white',
    borderRadius:15,
    padding: hp("2.2%"),
    width:wp("90%"),
    height:hp("25%"),
    marginTop:10,
    marginBottom:10,
    alignSelf:'center',
    borderWidth:0.7,
    justifyContent:'space-between'
  },
  titleStatus: {
      fontSize: hp('2.1%'),
      color: "#000",
      textAlignVertical: 'bottom',
      fontWeight: 'bold',
  },
  header:{
    backgroundColor: '#475658',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#475658',
    width: '100%',
    paddingTop:15
  },  
  maps: {
    height: '100%',
    backgroundColor: "#FFF",
    justifyContent: 'center',
  },
  caixa:{
    backgroundColor:'white',
    borderRadius:15,
    width:320,
    height:132,
    marginTop:20,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center'
  }
});
