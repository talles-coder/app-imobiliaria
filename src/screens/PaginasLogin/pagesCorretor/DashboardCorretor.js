import React from 'react';
import { FlatList, StyleSheet, Text, View, StatusBar, TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo';



export default class DashboardCorretor extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
        
        };
    }

    render() {
        return (

        <View style={{flex:1, backgroundColor:'#0C1C41'}}>
            <StatusBar hidden = {false} translucent = {false} backgroundColor = '#0C1C41' />
            <View style={styles.header}>
                <TouchableOpacity>
                <Icon name="chevron-left" size={40} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.titleServ}>MEUS SERVIÇOS</Text>
                <View style={{width:40}}></View>
            </View>
            <FlatList
                data=
                {[
                {key: '1', RealizadasHJ: '2', AtivasHJ: '4', VãoExpira: '4', JaExpiraramMes:'1'},
                ]}
                renderItem={({item}) => 
                
                <View style={styles.boxmae}>
                <Text style={styles.titlebox}>Reservas</Text>
                <View style={styles.box}>
                <Text>Realizadas Hoje : {item.RealizadasHJ}</Text>
                <Text>Ativas Hoje : {item.AtivasHJ}</Text>
                </View>
                <View style={styles.box}>
                <Text>Vão Expira: {item.VãoExpira}</Text>
                <Text>Já Expiraram este Mês : {item.JaExpiraramMes}</Text>
                </View>
                </View>
                }/>
            
            <FlatList
                data=
                {[
                {key: '1', VendasHJ: '5', VendasNesteMes: '6', TotalVendasRealizadas: '6'},
                ]}
                renderItem={({item}) => 
                
                <View style={styles.boxmae}>
                <Text style={styles.titlebox}>Vendas</Text>
                <View style={styles.box}>
                <Text >Vendas Hoje : {item.VendasHJ}</Text>
                <Text >Vendas neste Mês : {item.VendasNesteMes}</Text>
                </View>
                <View style={styles.box}>
                <Text >Total de Vendas Realizadas : {item.TotalVendasRealizadas}</Text>
                </View>
                </View>
                }/>
        
        </View>
        );
    }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: '#0C1C41',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#0C1C41',
    width: '100%',
  },  
  boxmae:{
    alignSelf:'center'
  },
  box:{
    backgroundColor:'#555500',
  },
  titlebox:{
    fontSize: 28,
    color:"#fff",
    fontWeight: 'bold'
    
  },
});