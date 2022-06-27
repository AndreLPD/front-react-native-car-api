import React, { Component } from 'react';
import { FlatList, Platform, StyleSheet, Text, View, Button } from 'react-native';
import api from '../../services/api';



export default class Home extends Component {

  static navigationOptions = {
    title: 'Car Api',
    headerStyle:{
      backgroundColor: '#2c5699',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  state = {
    page: 1,
    cars: [],
    pageInfo:{},
  }

  componentDidMount(){
    this.loadCars();
  }
  

  loadCars = async (page = 1) => {
    let response = await api.get(`/cars/${page}`);
    const {docs, ...pageInfo} = response.data.car;
    this.setState({page, cars:[...this.state.cars,...docs], pageInfo});
  }

  loadMore = async () => {
    const {page, pageInfo} = this.state;
    if(page === pageInfo.pages) return;
    const pageNumber = page + 1;
    this.loadCars(pageNumber);
  }


  renderItem = ({item}) =>(
    <View style={styles.carContainer}>
      <Text>{item.model}</Text>
      <Text>{item.year}</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.buttonForm}>
        <Button 
        title="New Car" 
        onPress={() => this.props.navigation.navigate("Form")}
        saveCar={this.saveCar}></Button>
      </View>
        <FlatList
        contentContainerStyle={styles.list} 
        data={this.state.cars} 
        keyExtractor={item => item._id}
        renderItem={this.renderItem}
        onEndReached={this.loadMore}
        onEndReachedThreshold={0.1}  />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fafafa'
  },
  list:{
    padding: 20,
  },
  carContainer:{
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 20,
    marginBottom: 20,
  },
  buttonForm:{
    marginTop:20,
    padding:20,
  }
});
