import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import {Text, View, StyleSheet} from 'react-native';
import firebase from 'firebase';
import firestore from '../config';

export default class ItemDetails extends Component{

    state = {
        item_name : this.props.navigation.getParam('item_details')['item_name'],
        item_description : this.props.navigation.getParam('item_details')['item_description'],
    }

    exchangeItem = () => {
        firestore.collection('Items').where('item_name', '==', this.state.item_name).onSnapshot((snapshot) => {
            var allItems = snapshot.docs.map((doc) => doc.data());
            
        })
    }

    render(){
        return(
            <View style = {{backgroundColor : '#222831', height : '100%'}}>
               <Text style = {style.textInput}> {this.state.item_name} </Text> 
               <Text style = {style.address}> {this.state.item_description} </Text> 
               <TouchableOpacity onPress = {() => {
                   this.props.navigation.navigate('MyBarters')
               }}>
                   <Text style = {style.button}> Exchange </Text>
               </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    textInput : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        color : '#eeeeee',
        backgroundColor : '#393e46',
        width : '80%',
        height : 40,
        marginTop : 10,
        marginBottom : 10,
        alignSelf : 'center',
        borderRadius : 30,
        fontSize : 25
    },

    loginEmail : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        color : '#eeeeee',
        backgroundColor : '#393e46',
        width : '80%',
        height : 40,
        marginTop : 30,
        marginBottom : 10,
        alignSelf : 'center',
        borderRadius : 30,
        fontSize : 25
    },

    button : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        color : '#222831',
        backgroundColor : '#00adb5',
        width : '80%',
        height : 40,
        marginTop : 10,
        marginBottom : 10,
        alignSelf : 'center',
        borderRadius : 30,
        fontSize : 25
    },

    loginButton : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        color : '#222831',
        backgroundColor : '#00adb5',
        width : '80%',
        height : 40,
        marginTop : 30,
        marginBottom : 10,
        alignSelf : 'center',
        borderRadius : 30,
        fontSize : 25
    },

    address : {
        display : 'flex',
        justifyContent : 'center',
        textAlign : 'center',
        color : '#eeeeee',
        backgroundColor : '#393e46',
        width : '80%',
        height : 150,
        marginTop : 10,
        marginBottom : 10,
        alignSelf : 'center',
        borderRadius : 30,
        fontSize : 25
    }
    
})