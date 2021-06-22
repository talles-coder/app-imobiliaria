import React from 'react';
import { FlatList, StyleSheet, Text, View, StatusBar, TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';



const Loteamentos = () => {
  

  
  return (

  <View style={{flex:1, backgroundColor:'#F4A261'}}>
    <StatusBar hidden = {false} translucent = {false} backgroundColor = '#0C1C41' />
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={35} color="white" />
        </TouchableOpacity>
        <Text style={styles.titlepage}>Loteamentos</Text>
        <View style={{width:40}}></View>
      </View>
      <FlatList
        data=
        {[
          {key: '1', Rua: 'Estr. de vitório Torantim', QntLts: '4', Rrvs: '1', Vnd: '1'},
          {key: '2', Rua: 'Rua Arconde Barros', QntLts: '5', Rrvs: '4', Vnd: '0'},
          {key: '3', Rua: 'Avenida Santo Antônio', QntLts: '5', Rrvs: '', Vnd: '1'},
        ]}
        renderItem={({item}) => 
          
        <View style={styles.caixa }>
              
              <Text  style={{fontSize: 20, padding:3, fontWeight: 'bold'}} numberOfLines={1}>{item.Rua}</Text>
              <Text  style={styles.titleitem}>Quantidade de Lotes : {item.QntLts}</Text>
              <Text  style={styles.titleitem}>Reservados: {item.Rrvs}</Text>
              <Text  style={styles.titleitem}>Vendidos : {item.Vnd}</Text>

        </View>
        }/>
  </View>
  );
}
export default Loteamentos;

const styles = StyleSheet.create({
  titleitem: {
    fontSize: 12,
    opacity:0.7
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
  caixa:{
    backgroundColor:'white',
    borderRadius:15,
    width:320,
    height:132,
    marginTop:20,
    alignSelf:'center',
    alignItems:'center',
    borderWidth:0.7,
    justifyContent:'center'
  }
});
