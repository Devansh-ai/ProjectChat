import { StyleSheet, Text, View, Modal, Pressable, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Icons } from '../Assets'
import { stringsMenu } from '../Utils/Strings'


const ChatModalLongPress = ({ visible, ondismiss }: { visible: any, ondismiss: any }) => {
    const [isModalVisible, setisModalVisible] = useState<boolean>(visible)
    const toggleModal = () => {
        ondismiss()
    };
    return (
        <View>
            <Modal
                transparent={true}
                animationType="slide"
                visible={visible}
            // onRequestClose={this.toggleModal}

            >
                <Pressable onPress={toggleModal} style={styles.container} >


                    <View style={styles.modalContent}>
                        <View style={styles.modalContainer}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10,marginTop:10,}}>
                                <TouchableOpacity>

                                    <Image style={{height:30,width:30}} source={Icons.emoji1}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                    <Image style={{height:30,width:30}}source={Icons.emoji2}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                    <Image style={{height:30,width:30}}source={Icons.emoji3}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                    <Image style={{height:30,width:30}}source={Icons.emoji4}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                    <Image style={{height:30,width:30}}source={Icons.emoji5}/>
                                </TouchableOpacity>

                            </View>
                            <TouchableOpacity style={styles.modalButton}>
                                <Image
                                    source={Icons.reply}
                                    style={styles.buttonIcon}

                                />
                                <Text style={styles.modalButtonText}>
                                    {stringsMenu.chatOp1}
                                </Text>
                            </TouchableOpacity>



                            <TouchableOpacity style={styles.modalButton}>
                                <Image
                                    source={Icons.forward}
                                    style={styles.buttonIcon}

                                />
                                <Text style={styles.modalButtonText}>
                                    {stringsMenu.chatOp2}
                                </Text>
                            </TouchableOpacity>




                            <TouchableOpacity style={styles.modalButton}>
                                <Image
                                    source={Icons.copy}
                                    style={styles.buttonIcon}
                                />
                                <Text style={styles.modalButtonText}>
                                    {stringsMenu.chatOp3}
                                </Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={styles.modalButton}>
                                <Image
                                    source={Icons.star}
                                    style={styles.buttonIcon}
                                />
                                <Text style={styles.modalButtonText}>
                                    {stringsMenu.chatOp4}
                                </Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={styles.modalButton}>
                                <Image
                                    source={Icons.edit}
                                    style={styles.buttonIcon}
                                />
                                <Text style={styles.modalButtonText}>
                                    {stringsMenu.chatOp5}
                                </Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={styles.modalButton}>
                                <Image
                                    source={Icons.delete}
                                    style={styles.buttonIcon}

                                />
                                <Text style={styles.modalButtonTextDelete}>
                                    {stringsMenu.chatModalButton4}
                                </Text>
                            </TouchableOpacity>


                        </View>


                    </View>
                </Pressable>
            </Modal>
        </View>
    )
}

export default ChatModalLongPress

const styles = StyleSheet.create({
    modalContainer: {
        marginTop: 10,
        marginBottom: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    buttonIcon: {
        height: 20,
        width: 20,
    },
    modalButtonText: {
        fontSize: 17,
        fontWeight: '600',
        paddingLeft: 8,
        color: '#6a7a86',
    },
    modalButton: {
        flexDirection: 'row',
        marginVertical: 5,
        padding: 30,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#fafafa',
    },
    modalButtonTextDelete:
    {
        fontSize: 17,
        fontWeight: '600',
        paddingLeft: 8,
        color: 'red',
    },

})
