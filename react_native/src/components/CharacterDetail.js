import React from 'react';
import {View, ActivityIndicator, Text, FlatList, StyleSheet, Image} from 'react-native';
import Http from '../libs/http';

class CharacterDetail extends React.Component{

    state={
        loading: false,
        character: null,
        episodes: [],
    }

    componentDidMount = async ()=>{
        this.setState({loading:true});
        const res = await Http.instance.get(this.props.route.params.character_url);
        this.setState({character: res});
        const {character} = this.state 
        if(character){
            let episodes_info = []
            //console.log(character.episode)
            for (let i in character.episode){
                //console.log(character.episode[i]);
                episodes_info.push(await Http.instance.get(character.episode[i]));
            }
            
            this.setState({episodes:episodes_info})
        }
        this.setState({loading:false});
    }

    render(){
        const {character, loading, episodes} = this.state;
        return(
            <View>
                {character?
                    <View style={styles.container}>
                        <Image source={{uri:character.image}}
                        style={styles.image}></Image>
                        <View style={styles.description}>
                            <Text style={styles.text}>Name: {character.name}</Text>
                            <Text style={styles.text}>Gender: {character.gender}</Text>
                            <Text style={styles.text}>Specie: {character.species}</Text>
                            <Text style={styles.text}>Origin Location: {character.origin.name}</Text>
                            <Text style={styles.text}>Current location: {character.location.name}</Text>
                        </View>
                    </View>
                :null
                }
                {loading?
                <ActivityIndicator 
                    color='#005' 
                    size='large'
                    style={styles.loader}
                    >
                </ActivityIndicator>
                :
                    <FlatList
                    style={styles.episode_list}
                    data={episodes}
                    renderItem={
                    ({item}) => <Text style={styles.text}>{item.name}</Text>
                    }>
                    </FlatList>
                }                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height: '50%',
        backgroundColor: '#67dd23',
        alignItems:'center'
    },
    description:{
        padding:20,
        marginTop:20,
        backgroundColor: '#000',
        width:'100%'
    },
    episode_list:{
        padding:20,
        backgroundColor: '#000',
        width:'100%'
    },
    loader:{
        marginTop:10,
    },
    image: {
        marginTop:20,
        width: '50%',
        height: '50%',
    },
    text:{
        fontSize: 17,
        color: '#53eae3'
    }
});
export default CharacterDetail;
