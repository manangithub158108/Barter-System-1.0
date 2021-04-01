import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import firestore from '../config';
import firebase from 'firebase';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';

export default class MyItems extends Component{

  state = {
    allItemsList : []
  }

  getItems = () => {

    const currentUserEmail = firebase.auth().currentUser.email;
    
    firestore.collection('Items').where('email', '==', currentUserEmail).onSnapshot((snapshot) => {
      var allItemsList = snapshot.docs.map((doc) => doc.data());
      this.setState({
        allItemsList : allItemsList
      })
    })

  }

  componentDidMount = () => {
    this.getItems();
  }

  renderItem = ({item}) => (
    <ListItem
    title = {item.item_name}
    subtitle = {item.item_description}
    
    rightElement = {
      <TouchableOpacity>
        <Text style = {style.button}> View </Text>
      </TouchableOpacity>
    }
    bottomDivider/>
  )


  render(){
    return(
      <ScrollView>
      <View style = {{backgroundColor : '222831'}}>
        <FlatList
        data = {this.state.allItemsList}
        renderItem = {this.renderItem}></FlatList>
      </View>
      </ScrollView>
    )
  }
}

const style = StyleSheet.create({

  button : {
      display : 'flex',
      justifyContent : 'center',
      textAlign : 'center',
      color : '#222831',
      backgroundColor : '#00adb5',
      width : '120%',
      height : 30,
      marginTop : 10,
      marginBottom : 10,
      alignSelf : 'center',
      borderRadius : 0,
      fontSize : 20
  },

})


