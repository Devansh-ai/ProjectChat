import { StyleSheet, Text, View, Dimensions, Modal, Pressable, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Icons, Images } from '../Assets';
import { stringsMenu } from '../Utils/Strings';
import SearchBar from '../Components/SearchBar';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Menu = ({ navigation }: { navigation: any }) => {
  const [isModalVisible, setisModalVisible] = useState(false);

  const toggleModal = () => {
    setisModalVisible(prevState => !prevState);
  };

  const newChat = () => {
    navigation.navigate('Search');
    setisModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.backButton}>
            <Image
              source={Icons.backArrow}
              style={styles.backIcon}
            />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>
              {stringsMenu.header}
            </Text>
            <Text style={styles.contactsNumber}>
              {stringsMenu.contactsNumber}
            </Text>
          </View>
          <TouchableOpacity onPress={toggleModal}>
            <Image
              source={Icons.add}
              style={styles.addIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <SearchBar />
        <Image
          source={Images.middleImage}
          resizeMode='cover'
          style={styles.middleImage}
        />
        <TouchableOpacity onPress={toggleModal} style={styles.startButton}>
          <Text style={styles.startButtonText}>
            {stringsMenu.startbutton}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
      >
        <Pressable onPress={toggleModal} style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={newChat} style={styles.modalButton}>
                <Image
                  source={Icons.newChat}
                />
                <Text style={styles.modalButtonText}>
                  {stringsMenu.modalButton1}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton}>
                <Image
                  source={Icons.grpChat}
                />
                <Text style={styles.modalButtonText}>
                  {stringsMenu.modalButton2}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton}>
                <Image
                  source={Icons.announce}
                />
                <Text style={styles.modalButtonText}>
                  {stringsMenu.modalButton3}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2a7bbb',
    height: SCREEN_HEIGHT * 0.144,
  },
  headerContent: {
    flexDirection: 'row',
    marginTop: SCREEN_HEIGHT * 0.08,
    marginLeft: SCREEN_WIDTH * 0.04,
  },
  backButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#3e88c2',
  },
  backIcon: {
    height: 20,
    width: 20,
    tintColor: 'white',
  },
  headerTextContainer: {
    marginLeft: 12,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  contactsNumber: {
    color: 'white',
    fontSize: 13,
  },
  addIcon: {
    tintColor: 'white',
    height: 30,
    width: 30,
    top: 5,
    left: SCREEN_WIDTH * 0.5,
  },
  body: {
    backgroundColor: '#e7edf3',
    height: SCREEN_HEIGHT,
  },
  middleImage: {
    height: 150,
    width: 100,
    top: SCREEN_HEIGHT * 0.25,
    left: SCREEN_WIDTH * 0.4,
  },
  startButton: {
    backgroundColor: '#2a7bbb',
    alignItems: 'center',
    marginHorizontal: '30%',
    borderRadius: 8,
    marginTop: SCREEN_HEIGHT * 0.3,
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
    padding: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
  },
  modalContent: {
    marginTop: 10,
    marginBottom: 20,
  },
  modalButton: {
    flexDirection: 'row',
    marginVertical: 5,
    padding: 30,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#fafafa',
  },
  modalButtonText: {
    fontSize: 17,
    fontWeight: '600',
    paddingLeft: 8,
    color: '#6a7a86',
  },
});

export default Menu;
