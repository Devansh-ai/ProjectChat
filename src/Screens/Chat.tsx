import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { GiftedChat, IMessage, Bubble } from 'react-native-gifted-chat'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ChatModal from '../Components/ChatModal';
import { useRoute } from '@react-navigation/native';
import { Icons } from '../Assets';
import { stringsMenu } from '../Utils/Strings';
import { launchImageLibrary } from 'react-native-image-picker';
import ChatModalLongPress from '../Components/chatModalLongPress';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Item {
    image?: string;
    _id: number,
    text?: string,
    createdAt: any,
    user: {
        avatar?:string,
        _id: number,
        name: string,
    }
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

interface ItemInError {
    error: any
    didCancel: any
    assets: any
}

const Chat = ({ navigation }: { navigation: any }) => {
    const route = useRoute();
    const { name, initials, id } = route.params as { name: string, initials: string, id: number };
    const STORAGE_KEY = `@chat_messages_${id}`;

    const [msgs, setMsgs] = useState<IMessage[]>([]);
    const [chatModal, setChatModal] = useState(false);

    const [chatModalLongPress, setChatModalLongPress] = useState(false);
    const [inputText, setInputText] = useState('');
    const messageIdCounter = useRef(2);

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const storedMessages = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedMessages !== null) {
                setMsgs(JSON.parse(storedMessages));
                messageIdCounter.current = JSON.parse(storedMessages).length + 1;
            } else {
                setMsgs([
                    {
                        _id: 1,
                        text: "Hello developer",
                        createdAt: new Date(),
                        user: {
                            _id: 2,
                            name: "React Native",
                        }
                    }
                ]);
            }
        } catch (e) {
            console.error('Failed to load messages:', e);
        }
    };

    const saveMessages = async (messages: Item[]) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch (e) {
            console.error('Failed to save messages:', e);
        }
    };

    const uploadImageFromGallery = () => {
        launchImageLibrary({ mediaType: 'photo' }, (res) => {
            const { didCancel, error } = res as ItemInError
            if (didCancel) {
                console.log("User cancelled image picker");
            } else if (error) {
                console.log('ImagePicker Error: ', error);
            } else if (res.assets && res.assets[0].uri) {
                console.log("Gallery Allowed");
                const imageUri = res.assets[0].uri;
                const newImageMsg: IMessage = {
                    text:'',
                    _id: messageIdCounter.current,
                    createdAt: new Date(),
                    image: imageUri,
                    user: {
                        _id: 1,
                        name: "User",
                    }
                };
                const updatedMsgs:any = GiftedChat.append(msgs, [newImageMsg]);
                setMsgs(updatedMsgs);
                saveMessages(updatedMsgs);
                messageIdCounter.current += 1;
            }
        });
    };

    const toggleModal = () => {
        setChatModal(!chatModal)
    }
    const toggleModalLongPress = () => {
        setChatModalLongPress(!chatModalLongPress)
    }

    const handleSend = () => {
        if (inputText.trim().length > 0) {
            const newMsg: IMessage = {
                _id: messageIdCounter.current,
                text: inputText.trim(),
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: "User",
                    avatar: "https://placeimg.com/140/140/any"
                }
            };
            const updatedMsgs:any= GiftedChat.append(msgs, [newMsg]);
            setMsgs(updatedMsgs);
            saveMessages(updatedMsgs);
            setInputText('');
            messageIdCounter.current += 1;
        }
    };

    const renderBubble = (props:any) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: 'white',
                        padding: 5,
                        borderBottomRightRadius: 15,
                        borderBottomLeftRadius: 15,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 0,
                    },
                    right: {
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 15,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                        padding: 5,
                        backgroundColor: "#297dbc",
                    },
                }}
            />
        );
    };

    const textInput = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity
                   // onPress={uploadImageFromGallery}
                >
                    <Image
                        source={Icons.upload}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <TextInput
                    style={styles.textInputStyle}
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={handleSend}
                />
                <TouchableOpacity onPress={handleSend}>
                    <Image
                        source={Icons.send}
                        style={styles.sendButton}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaProvider>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Image
                        source={Icons.backArrow}
                        style={styles.backImage}
                    />
                </TouchableOpacity>
                <View style={styles.imageStyle}>
                    <Text style={styles.profileImg}>{initials}</Text>
                </View>
                <View style={{ marginLeft: 5 }}>
                    <Text style={styles.nameHeader}>{name}</Text>
                    <Text style={styles.chatSubheading}>{stringsMenu.chatSubheading}</Text>
                </View>
                <TouchableOpacity onPress={() => { setChatModal(true) }} >
                    <Image
                        source={Icons.options}
                        style={styles.optionsButton}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.giftedChatHeader}>
                <GiftedChat
                    messages={msgs}
                    loadEarlier={true}
                    renderBubble={renderBubble}
                    renderUsernameOnMessage={true}
                    alignTop={true}
                    onLongPress={() => { setChatModalLongPress(true) }}
                    onSend={(messages: IMessage[]) => {
                        const updatedMsgs:any = GiftedChat.append(msgs, messages as IMessage[]);
                        setMsgs(updatedMsgs);
                        saveMessages(updatedMsgs);
                    }}
                    user={{
                        _id: 1
                    }}
                    renderInputToolbar={textInput}
                    messagesContainerStyle={{ backgroundColor: '#e7edf3' }}
                />
            </View>
            <ChatModal
                visible={chatModal}
                ondismiss={toggleModal}
            />
            <ChatModalLongPress
                visible={chatModalLongPress}
                ondismiss={toggleModalLongPress}
            />
        </SafeAreaProvider>
    )
}

export default Chat


const styles = StyleSheet.create({
    giftedChatHeader: {
        paddingBottom: 40,
        flex: 1,
    },
    optionsButton: {
        height: 20,
        width: 20,
        marginTop: 5,
    },
    nameHeader: {
        marginLeft: '2.5%',
        marginTop: 5,
        fontSize: 17,
        fontWeight: '500',
        width: SCREEN_WIDTH * .61,
    },
    backImage: {
        height: 30,
        width: 30,
        marginLeft: 12,
        marginTop: 5,
    },
    headerContainer: {
        backgroundColor: 'white',
        paddingTop: '15%',
        height: SCREEN_HEIGHT * 0.13,
        borderRadius: 12,
        flexDirection: 'row',
    },
    sendButton: {
        height: 25,
        width: 25,
        transform: [{ rotate: '-35deg' }],
        alignSelf: 'center',
    },

    textInputStyle: {
        backgroundColor: 'white',
        height: 40,
        width: '75%',
        marginRight: 10,
        marginLeft: 20,
        alignSelf: 'flex-end',
        borderRadius: 8,
    },
    backIcon: {
        height: 25,
        width: 25,
        alignSelf: 'center',
        marginTop: 5,
    },
    header: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 10,
    },
    chatSubheading: {
        fontSize: 11,
        color: 'grey',
        marginLeft: 5,
        marginTop: 3,
    },
    imageStyle: {
        width: 45,
        height: 45,
        borderRadius: 50,
        //marginRight: 10,
        backgroundColor: '#2A7BBB',
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 17,
        paddingBottom: 10,
    },
    profileImg: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        paddingLeft: 12,
        paddingTop: 11,
        color: 'white',
        fontWeight: '500',
        justifyContent: 'center',
        alignSelf: 'center'
    },
})