import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { TextInput } from 'react-native-elements'
import api from '../../../services/api'

export class Form extends Component {

    state = {
        model: "",
        description: "",
        color: "",
        year:0
    }

    static navigationOptions = {
        title: "New Car",
        headerStyle:{
            backgroundColor: '#2c5699',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }

    saveCar =  async () => {
        console.log(this.state);
        let {model, description, color, year} = this.state;
        let response = await api.post(`/car`, { model, color, description, year });
        this.setState(response.data);
    }
    
    handleChange = (event) => {
        console.log(event);
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]:value,
        })
    }

    handleSubmit = () => {
        this.saveCar();
    }

    render() {
        return (
            <View style={styles.container}>

                <Text>Name of Car:</Text>
                <Input 
                placeholder="Car"
                onChangeText={this.handleChange}
                />
                
                <Text>Description:</Text>
                <Input 
                placeholder="Description" 
                onChangeText={this.handleChange} 
                />

                <Text>Color:</Text>
                <Input 
                placeholder="Color" 
                onChangeText={this.handleChange}
                />

                <Text>Year of Car:</Text>
                <Input 
                placeholder="Year" 
                onChangeText={this.handleChange}
                />

                <View style={styles.buttonSave}>
                <Button 
                title="Save Car" 
                onPress={this.handleSubmit}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop:20,
    },
    buttonSave:{
        marginTop: 20,
        padding: 20,
    }
})

export default Form
