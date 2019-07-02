import React, {Component} from 'react';
import {Modal, Image, StyleSheet, TouchableHighlight} from 'react-native';
import { Container, ListItem, Text, Item, Input, View} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class AddCategoryModal extends Component {
    
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <Container>
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
                        <ListItem>
                            <Image 
                                source={require('../Images/add.png')}
                                style={styles.icon}
                            />
                            <Text style={styles.textIcon}>Add Category</Text>
                        </ListItem>
                    </TouchableOpacity>
                    <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                    >
                        <View style={styles.modalView}>
                            <View style={{ elevation: 20, backgroundColor:'white', borderRadius:10}}>
                                <View style={{ padding:'10%'}}>
                                    <Item style={{borderColor: 'green'}}>
                                        <Input  placeholder="Category Name ..." />
                                    </Item>
                                    <Item style={{borderColor: 'green'}}>
                                        <Input  placeholder="Image Url ..." />
                                    </Item>
                                </View>
                                <View style={{alignSelf:'flex-end'}}>
                                    <ListItem >
                                        <TouchableHighlight onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
                                            <Text style={{fontSize:15, fontWeight:'bold', right:'30%'}}>Add</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
                                            <Text style={{fontSize:15, left:'5%'}}>Cancel</Text>
                                        </TouchableHighlight>
                                    </ListItem>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        padding: 10,
        margin: 1,
        height: 10,
        width: 10,
        resizeMode: 'stretch',
    },
    textIcon: {
        fontWeight:'bold', 
        color:'black', 
        marginLeft: 32, 
        fontSize:15
    },
    modalView: {
        flex:1,
        justifyContent : 'center',
        alignSelf : 'center',
        width :'70%',
        position:'relative',
    }
  })