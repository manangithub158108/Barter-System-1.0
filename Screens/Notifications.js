import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';
import firestore from '../config';

export default class Notifications extends Component{

    state = {
        allItems : []
    }

    componentDidMount = () => {
        firestore.collection('Items').onSnapshot((snapshot) => {
            var allItems = snapshot.docs.map((doc) => doc.data());
            this.setState({
                allItems : allItems
            })
        })
    }

    renderItem = ({item}) => (
        <ListItem
        title = {item.item_name}
        
        rightElement = {
            <Text> Status : </Text>
        }
        bottomDivider/>
    )

    
    render(){
        return(
            <View>
                <FlatList
                data = {this.state.allItems}
                renderItem = {this.renderItem}/>
            </View>
        )
    }
}