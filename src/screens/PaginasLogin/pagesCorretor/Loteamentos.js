import React , {useEffect} from 'react';
import { FlatList,Modal, StyleSheet, Text, View, StatusBar, TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '../../../components/Button';

import VisualizarQuadras from './VisualizarQuadras'
import updateLoteamentos from "../../../services/Loteamentos";


export default class Loteamentos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      dados : [],
      updating : true,
      loteData : {},
      index: ""
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  // componentDidUpdate(){
  //   this.props.navigation.removeListener();
  // }

  // componentWillUnmount(){
  // }

  componentDidMount = () => {
    
    this.setState({
      updating : true
    })
    updateLoteamentos("loteamentos")
    .then((array)=>{
      this.setState({
        dados : array,
        updating : false
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
    <View style={{flex:1, backgroundColor:'#F4A261'}}>
      <StatusBar hidden = {false} translucent = {false} backgroundColor = '#0C1C41' />
        <View style={styles.header} on>
          <TouchableOpacity onPress={()=> {this.props.navigation.openDrawer()}}>
            <Icon name="menu" size={35} color="white" />
          </TouchableOpacity>
          <Text style={styles.titlepage}>Loteamentos</Text>
          <View style={{width:40}}></View>
        </View>
        <FlatList
          refreshing={updating}
          onRefresh={this.componentDidMount}
          extraData={this.state.dados}
          keyExtractor={(item) => item.id}
          data={dados}
          renderItem={({item, index}) => 
          <TouchableOpacity onPress={() => {
            this.setState({
              loteData : item,
              index: index
            })
            this.setModalVisible(true)
          }}>
            <View style={styles.caixa }>
                <Text  style={{fontSize: 20, padding:3, fontWeight: 'bold'}} numberOfLines={1}>{item.nomeLote}</Text>
                <Text  style={styles.titleitem}>Quantidade de Lotes : {item.csvObject.totalLotes}</Text>
                <Text  style={styles.titleitem}>Reservados: {item.csvObject.totalReservados}</Text>
                <Text  style={styles.titleitem}>Vendidos : {item.csvObject.totalVendidos}</Text>
                <Text  style={styles.titleitem}>Disponíveis : {
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
                index : ""
              })
            }}
          >
            <View style={styles.maps}>
              <VisualizarQuadras
                data={loteData}
                back={
                  () => {
                    this.setModalVisible(false)
                    this.setState({
                      index : ""
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
  header:{
    backgroundColor: '#F4A261',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#F4A261',
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
