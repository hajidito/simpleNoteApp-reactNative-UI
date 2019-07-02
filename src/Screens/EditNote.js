import React, {Component} from 'react';
import { StyleSheet, TextInput} from 'react-native';
import { Button, Container, Picker, Content, Form, Item, Icon, Label, Textarea} from 'native-base';
import DataCategories from '../Data/CategoryData'

export default class App extends Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Edit Note',
      headerTitleStyle: {
        width: '100%',
        textAlign: 'center',
      },
      headerRight: (
        <Button style={{elevation:0, marginTop: 5, backgroundColor: 'white'}}>
          <Icon name='checkmark-circle-outline' style={{fontSize:30, marginRight: 20, color: 'green'}}/>
        </Button>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined
    };
  }

  onValueChange2(value: String) {
    this.setState({
      selected2: value
    });
  }

  render() {
    const { navigation } = this.props;
  
    let title = navigation.getParam('title', 'edit title');
    let category = navigation.getParam('category', 'category');
    let note = navigation.getParam('note', 'edit note');
    
    return (
    <Container>
      <Content>
        <Form>
          <TextInput style={styles.inputStyle} value = {(title)}/>
          <Textarea style={styles.inputStyle} multiline={true} value = {(note)} />
          <Label style={styles.categoryInput} >
            CATEGORY
          </Label>
          <Item style={{width: '50%'}}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="md-arrow-dropdown"/>}
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)}
              >
              <Picker.Item label={(category)} value="keys" />
              {Object.keys(DataCategories).map((key) => {
                    return (<Picker.Item label={DataCategories[key]} value={key} key={key}/>)
                })}
            </Picker>
          </Item>
        </Form>
      </Content>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    textAlignVertical: 'top',
    fontSize :20, 
    height: 200,
  },
  categoryInput: {
    marginLeft: 10, 
    marginTop: 10, 
    color: 'black', 
    fontWeight: 'bold'
  },
});
