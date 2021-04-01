import React, {Component} from 'react';
import {Text, View} from 'react-native';
import firebase from 'firebase';
import firestore from '../config';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';

export default class HomeScreen extends Component{

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
        subtitle = {'created by :- ' + item.creatorFirst_name + ',  ' + 'address : ' + item.creatorAddress}

        rightElement = {
            <TouchableOpacity onPress = {() => {
                this.props.navigation.navigate('ItemDetails', {'item_details' : item});
            }}>
                <Text> View </Text>
            </TouchableOpacity>
        }
        bottomDivider/>
    )

    render(){
        return(
            <View style = {{ height : '100%'}}>
                <ScrollView>
                <FlatList
               data = {this.state.allItems}
               renderItem = {this.renderItem}/>
                </ScrollView>
            </View>
        )
    }
}