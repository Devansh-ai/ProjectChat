import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import Data from '../Utils/Data.json';
import { Icons, Images } from '../Assets/';

interface Item {
    id: number;
    name: string;
    //profileImg: string;
    profileImage: string;

}
const SCREEN_HEIGHT=Dimensions.get('window').height;
const SCREEN_WIDTH=Dimensions.get('window').width;

const Search = ({ navigation }: { navigation: any }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<any>(Data);

    useEffect(() => {
        if (searchQuery) {
            const filteredItems = Data.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(filteredItems);
        } else {
            setFilteredData(Data);
        }
    }, [searchQuery]);

    const renderItem = ({ item }: { item: Item }) => (
        <TouchableOpacity style={styles.flatlist} onPress={() => navigation.navigate('Chat', { name: item.name, initials: item.profileImage, id:item.id })}>
            <View style={styles.imageStyle}>
                <Text style={styles.profileImg} >{item.profileImage}
                </Text>
            </View>
            <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}>
                    <Image style={styles.back} source={Icons.backArrow} />
                </TouchableOpacity>
                <View style={styles.input}>
                    <Image source={Icons.search}
                    style={styles.searchImg}
                    />
                    <TextInput
                        placeholder="Search here..."
                        value={searchQuery}
                        onChangeText={(text: string) => setSearchQuery(text)} 
                        style={{ flex: 1 }} 
                    />
                </View>
            </View>
            <View style={styles.listCont}>
                {filteredData.length > 0 ? (
                    <FlatList
                        data={filteredData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <View style={styles.noResults}>
                        <Image source={Images.noResultFoundText} style={styles.noResultsimg} />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7edf3',
    },
    header: {
        flexDirection: 'row',
    },
    back: {
        height: 40,
        width: 40,
       // backgroundColor: 'white',
        //tintColor: 'grey',
        marginHorizontal: 16,
        marginVertical: 19,
    },
    searchImg:{
        height:20,
        width:20,

    },
    input: {
        flex: 1,
        marginVertical: 19,
        marginRight: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    flatlist: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        paddingVertical: 15,
        borderColor: 'lightgray',
    },
    imageStyle: {
        width: 45,
        height: 45,
        borderRadius: 50,
        marginRight: 10,
        backgroundColor: '#2A7BBB',
        justifyContent: 'center',
        alignContent: 'center',
    },
    profileImg: {
        width: '100%',
        height: '100%',
        //borderRadius: 50,
        paddingLeft: 11,
        paddingTop: 12,
        color: 'white',
        fontWeight: '700',
        //justifyContent:'center',
       // alignSelf: 'center'
    },
    text: {
        fontWeight: '600',
        color: 'gray',
    },
    listCont: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 8,
        marginHorizontal: 16,
        padding: 8,
    },
    noResults: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResultsimg: {
        width: SCREEN_WIDTH*.42,
        height: SCREEN_HEIGHT*.4,
        resizeMode: 'contain',
    },
});
