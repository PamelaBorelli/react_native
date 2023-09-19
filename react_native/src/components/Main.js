import React from 'react';
import {View, ActivityIndicator, Pressable, Text, StyleSheet, FlatList, Input, Form, SubmitButton, ActivityIndicator} from 'react-native';
import Http from '../libs/http';
import CharacterItem from './CharacterItem';

class Main extends React.Component{
    state ={
        characters:[],
        newCharacter: '',
        loading: false,

    }

    componentDidMount = async ()=>{
        this.setState({loading:true});
        const res = await Http.instance.get('https://rickandmortyapi.com/api/character/id');
        this.setState({characters: res.id, loading:false});
        if(res.id){
            this.setState({characters:res.id.toString()});
        }
        if(res.id){
            this.setState({characters:res.id.toString() });    
        }
    }

    
    handleCharacterSearch = async () =>{
        const {characters} = this.state;
        this.setState({loading:true});
        const res = await Http.instance.get(characters);
        console.log('Get Character ');
        this.setState({characters: res.item.id, loading:false});
        if(res.id){
            this.setState({characters: res.item.id });
        }
        else{
            this.setState({character:null})
        }
       

    }

    render(){

        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Procurar Personagem"
            value={characters}
            onChangeText={text => this.setState({characters: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleCharacterSearch}
          />
        <SubmitButton loading={loading} onPress={this.handleCharacterSearch}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Icon name="add" size={20} color="#fff" />
        )}
      </SubmitButton>
        </Form>

        
        const {characters, loading} = this.state;
        return(
            
            <View style={styles.container}>
                {loading?
                <ActivityIndicator 
                    color='#000' 
                    size='large'
                    style={styles.loader}
                    >
                </ActivityIndicator>
                :null
                }

                <FlatList 
                    data={characters} 
                    renderItem={
                        ({item}) => {
                            return(
                                <View>
                                    <Pressable onPress={()=>this.handleCharacterSearch('https://rickandmortyapi.com/api/character/'+item.id)}>
                                    <CharacterItem item={item}></CharacterItem>
                                    </Pressable>
                                </View>
                            );
                        }
                    }>

                </FlatList>
                {loading ?
                <Pressable style={styles.btn}
                onPress={this.handleCharacterSearch}>
        
                    <Text style={styles.btnText}>Previous</Text>
                </Pressable>
                :null
                }

            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#67dd23',

    },
    btn:{
        padding: 0,
        backgroundColor: '#034246',
        height:30,
        margin:1,   
    },

    btnText:{
        color: '#53eae3',
        textAlign: 'center',
        fontSize: 22,
    },
    loader:{
        marginTop:10,
    },
});

export default Main;



