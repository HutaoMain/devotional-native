import React, { useLayoutEffect, useState, useCallback } from "react";
import { GiftedChat, User } from "react-native-gifted-chat";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from "@firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";

export interface IMessage {
  _id: string | number;
  text: string;
  user: User;
  createdAt: Date | number;
}

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const currentUser = FIREBASE_AUTH.currentUser;

  const chatCollectionRef = collection(FIRESTORE_DB, "chats");

  useLayoutEffect(() => {
    const userQuery = query(chatCollectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
      const userMessages: IMessage[] = querySnapshot.docs.map(
        (doc) =>
          ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          } as IMessage)
      );
      setMessages(userMessages);
    });

    return unsubscribe;
  }, []);

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    await addDoc(chatCollectionRef, { _id, createdAt, text, user });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      placeholder="Type your message here..."
      user={{
        _id: currentUser?.email || "",
        name: currentUser?.displayName || "",
        avatar: currentUser?.photoURL || "",
      }}
    />
  );
};

export default Chat;
