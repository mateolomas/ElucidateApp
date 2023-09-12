import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import HeadingWithNavigation from 'src/components/HeadingWithNavigation';

const ChatWithBot = ({
  navigation,
}: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const userId = '12313';
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <HeadingWithNavigation navigation={navigation}>
        Chatea con el bot
      </HeadingWithNavigation>
      <Text
        style={{
          padding: 10,
          textAlign: 'center',
        }}>
        This is the chat with the bot, here you can talk to the bot, get
        inspired, and chat with the bot, ask it any question.
      </Text>
      <Chat />
    </SafeAreaView>
  );
};

interface Message {
  isUser?: boolean;
  text: string;
}

const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [animatedText, setAnimatedText] = useState<string | null>(null);

  console.log('animatedText', animatedText);
  console.log('messages', messages);

  const mockupResponse = async (userInput: string) => {
    setIsLoading(true);

    await axios
      .get(`https://6d47-186-219-49-81.ngrok-free.app/chatbot/1/${userInput}`)
      .then(response => {
        console.log('response', response);
        const {data} = response;

        setAnimatedText(data);

        addMessage(data, false); // Move the addMessage here
        setIsLoading(false);
      });

    setTimeout(() => {
      setAnimatedText(null); // Clear animated text after a delay
    }, 1000);
  };

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage = {text, isUser};
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setAnimatedText(null); // Clear animated text when adding a new message
  };

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    addMessage(inputText, true);
    setInputText('');

    // Simulate bot response
    mockupResponse(inputText);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messageContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              {
                alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                backgroundColor: message.isUser ? '#4caf50' : '#2196f3',
              },
            ]}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
        {animatedText !== null && (
          <View
            style={[
              styles.message,
              {alignSelf: 'flex-start', backgroundColor: '#2196f3'},
            ]}>
            <Text style={styles.messageText}>{animatedText}</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={text => setInputText(text)}
          placeholder="Type your message here"
          style={styles.input}
        />
        <Button title="Send" onPress={sendMessage} disabled={isLoading} />
      </View>
    </View>
  );
};

export default ChatWithBot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  messageContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  message: {
    maxWidth: '70%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  messageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
