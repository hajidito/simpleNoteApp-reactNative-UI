import React, { Component } from 'react';
import {View,StyleSheet,Text,Image,ScrollView,SafeAreaView} from 'react-native';
import { DrawerItems, createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import Home from '../Screens/Home';
import AddNote from '../Screens/AddNote';
import EditNote from '../Screens/EditNote';
import Personal from '../Screens/Personal';
import Work from '../Screens/Work';
import Wishlist from '../Screens/Wishlist';
import AddCategory from '../Screens/AddCategory';
import AddCategoryModal from '../Screens/AddCategoryModal';

const styles = StyleSheet.create({
  icon: {
      padding: 10,
      margin: 5,
      height: 10,
      width: 10,
      resizeMode: 'stretch',
  },
  profilTemplate : {
    height:150,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'10%'
  },
  profilImage: {
    height:120,
    width:121,
    borderRadius:54,
    marginTop:'10%'
  },
  profilName:{
    fontWeight:'bold',
    color:'#000',
    paddingTop:'5%',
    fontSize:20 
  }
})

const AppStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  AddNote: {
    screen: AddNote,
  },
  EditNote: {
    screen: EditNote,
  },
});

const CustomDrawer = props =>(
  <SafeAreaView >
    <View style={styles.profilTemplate}>
      <Image source={require('../Images/profil3.jpg')} style={styles.profilImage}/>
      <Text style={styles.profilName}> Raon Lee </Text>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
      <AddCategoryModal/>
    </ScrollView>
  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
  Home :{
    screen : AppStackNavigator,
    navigationOptions : {
      drawerLabel: () => null
    }
  },
  Personal: {
    screen: Personal,
    navigationOptions : {
      drawerLabel: 'Personal',
      drawerIcon: () => (
        <Image 
          source={require('../Images/personal.png')}
          style={styles.icon}
        />
      ),
    }
  },
  Work: {
    screen: Work,
    navigationOptions : {
      drawerLabel: 'Work',
      drawerIcon: () => (
        <Image 
          source={require('../Images/work.png')}
          style={styles.icon}
        />
      ),
    }
  }, 
  Wishlist: {
    screen: Wishlist,
    navigationOptions : {
      drawerLabel: 'Wishlist',
      drawerIcon: () => (
        <Image 
          source={require('../Images/wishlist.png')}
          style={styles.icon}
        />
      ),
    }
  }, 
  AddCategory: {
    screen: AddCategory,
    navigationOptions : {
      drawerLabel: () => null
    }
  }
},
  {contentComponent: CustomDrawer}
)

const AppContainerDrawer = createAppContainer(AppDrawerNavigator);

export default AppContainerDrawer