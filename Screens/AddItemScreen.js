import firestore from '../config';
import firebase from 'firebase'
import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default class AddItemScreen extends Component{

    state = {
        currentUserLocation : '',
        currentUserFirst_name : '',
        currentUserLast_name : '',
        item_name : '',
        item_description : ''
    }

    addItem = () => {
        firestore.collection('Items').add({
            'item_name' : this.state.item_name,
            'item_description' : this.state.item_description,
            'Status' : 'Unread',
            'creatorFirst_name' : this.state.currentUserFirst_name,
            'creatorLast_name' : this.state.currentUserLast_name,
            'creatorAddress' : this.state.currentUserLocation
        })
        alert('Item added successfully');
    }

    componentDidMount = () => {

        const email = firebase.auth().currentUser.email;

        firestore.collection('users').where('email', '==', email).onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                const user_details = doc.data();
                this.setState({
                    currentUserLocation : user_details.address,
                    currentUserFirst_name : user_details.first_name,
                    currentUserLast_name : user_details.last_name
                })
            })
        })

    }

    render(){
        return(
            <View style = {{backgroundColor : '#222831', height : '100%'}}>
                <TextInput onChangeText = {(text) => {
                    this.setState({
                        item_name : text
                    })
                }} placeholder = {'Enter item name'} style = {style.textInput}></TextInput>
                <TextInput onChangeText = {(text) => {
                    this.setState({
                        item_description : text
                    })
                }} placeholder = {'Enter item description'} style = {style.address} multiline = {true}></TextInput>
                <TouchableOpacity onPress = {() => {
                    this.addItem();
                }}>
                    <Text style = {style.button}> Add item </Text>
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