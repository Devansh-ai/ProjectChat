
import React from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Icons } from '../Assets';

const SearchBar = () => {
  return (
    <View style={styles.searchpanel}>
      <TextInput
        placeholder='Search messages..'
        style={styles.searchbox}
      />
      <TouchableOpacity style={styles.touchablesearchimage}>
        <Image
          source={Icons.search}
          style={styles.searchimage}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchpanel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchablesearchimage: {
    position: 'absolute',
    left: '3%'
  },
  searchimage: {
    marginTop: 9,
    height: 20,
    width: 20
  },
  searchbox: {
    padding: 15,
    paddingLeft: '7%',
    backgroundColor: 'white',
    marginHorizontal: '2%',
    borderRadius: 8,
    marginTop: 10,
    flex: 1
  },
});