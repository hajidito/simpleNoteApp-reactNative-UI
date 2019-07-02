import React, { Component } from 'react';
import { StyleSheet, Modal, TouchableHighlight, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { Container, Text, View, Fab, Icon} from 'native-base';
import NotesData from '../Data/NotesData';

function createRows(data, columns) {
    const rows = Math.floor(data.length / columns);
    let lastRowElements = data.length - rows * columns;
    while (lastRowElements !== columns) {
      data.push({
        id: `empty-${lastRowElements}`,
        title: `empty-${lastRowElements}`,
        note: `empty-${lastRowElements}`,
        category: `empty-${lastRowElements}`,
        time: `empty-${lastRowElements}`,
        empty: true
      });
      lastRowElements += 1;
    }
    return data;
}

_listEmptyComponent = () => {
    return (
        <View style={{backgroundColor: "transparent"}}>
        </View>
    )
}

export default class App extends Component {
    state = {
        modalVisible: false,
    };
    
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    _setModalVisible = () => {
        this.setState({modalVisible: true});
    }

    handleNavigateDrawer = () => {
        this.props.navigation.openDrawer()
    }

    componentDidMount() {
        this.props.navigation.setParams({ setModalVisible: this._setModalVisible });
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Note App',
        headerTitleStyle: { 
            width: '100%',
            textAlign: 'center',
            
        },
        headerLeft:(
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Image
                source={require('../Images/profil3.jpg')}
                style={styles.iconProfil}
                />
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity onPress={navigation.getParam('setModalVisible')} style={{marginRight: 20}}>
              <Image 
                    source={require('../Images/sort.png')}
                    style={styles.iconSort}
                />
            </TouchableOpacity>
        ),
    })

    handleNavigateAddNote = () => {
        const { navigation } = this.props;
        navigation.navigate('AddNote')
    }

    handleNavigateEditNote = () => {
        const { navigation } = this.props;
        navigation.navigate('EditNote')
    }
    
    render() {
        const columns = 2;
        return (
        
        <Container style={{padding:1}} >
            <View style={{ flex: 1 }}>
                <TextInput style={styles.search} transparent={true} searchBar placeholder="Search.." />
                    <FlatList
                        data={createRows(NotesData, columns)}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        renderItem={({ item }) => {
                        if (item.empty) {
                            return (
                                <View style={styles.itemEmpty}/>
                            )
                        }
                        return (
                            <View style={{
                                borderRadius:7, 
                                flexGrow: 1,
                                flexBasis: 0,
                                padding : 20,
                                marginLeft: '3%',
                                marginRight: '3%',
                                marginTop: '5%',
                                marginBottom: '3%',
                                height : 174,
                                backgroundColor : item.category == "Learn" ? "#2FC2DF" : 
                                (item.category == "Work") ? "#C0EB6A" :
                                (item.category == "Wishlist") ? "#FAD06C" : "#FF92A9" }}>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('EditNote', {
                                    title: item.title,
                                    category: item.category,
                                    note: item.note,
                                    });
                                }}>
                                    <Text style={styles.textTime}>{item.time}</Text>
                                    <Text style={styles.textTitle}>{item.title}</Text>
                                    <Text style={styles.textCategory}>{item.category}</Text>
                                    <Text numberOfLines={5} style={styles.textNote}>{item.note}</Text>
                                </TouchableOpacity>
                            </View>
                            );
                        }}
                    />
                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                    >
                    <View style={{flex:1, position:'absolute', alignSelf : "flex-end"}}>
                        <View style={styles.sortBarStyle}>
                            <TouchableHighlight
                                onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={{fontSize:15, padding: 10}}>ASCENDING</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={{fontSize:15, padding: 10}}>DESCENDING</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <Fab position="bottomRight" style={{ backgroundColor: 'white' }} onPress={this.handleNavigateAddNote}>
                    <Icon name='ios-add' style={{fontSize:50, color: 'black'}}/>
                </Fab>
            </View>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
    itemEmpty: {
        borderRadius: 7, 
        flexGrow: 1,
        flexBasis: 0,
        padding : 20,
        marginLeft: '3%',
        marginRight: '3%',
        marginTop: '5%',
        marginBottom: '5%',
        backgroundColor: "transparent"
    },
    ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },
    textTime: {
        fontWeight: 'bold',
        fontSize: 10,
        alignSelf : "flex-end",
        marginBottom : '5%',
        color: "white"
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign : 'left',
        color: "white"
    },
    textCategory: {
        fontSize: 10,
        textAlign : 'left',
        color: "white"
    },
    textNote: {
        fontWeight: 'bold',
        fontSize: 10,
        textAlign : 'left',
        color: "white"
    },
    iconProfil :{
        borderRadius: 50,
        marginLeft : 20,
        height: 50,
        width: 50,
        resizeMode: 'stretch'
    },
    iconSort: {
        padding: 10,
        margin: 5,
        height: 10,
        width: 10,
        resizeMode: 'stretch',
    },
    search: {
        backgroundColor: "transparent", 
        borderRadius: 25, 
        elevation: 3, 
        paddingLeft: 20, 
        paddingRight: 20, 
        margin: 20
    },
    sortBarStyle :{
        padding: 10, 
        elevation: 20, 
        backgroundColor:'white', 
        marginTop:'30%', 
        marginRight: '2%'
    }
});
