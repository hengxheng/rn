import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, ActivityIndicator } from "react-native";
import { TextInput, Button, FAB } from "react-native-paper";
import { CombinedDefaultTheme, MainStyle, Colors } from "../../theme";
import { GiftedChat } from "react-native-gifted-chat";
import { createOrUpdateMessage, getMessages } from "../../services/message";
import { useAuth } from "../../providers/auth";
import { RECIPE_IMAGE_URL, USER_PROFILE_IMAGE_URL } from "../../constants";
import { set } from "react-native-reanimated";

export default function AddDescription({ navigation, route }) {
  const [content, setContent] = useState("");
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useAuth();

  useEffect(() => {
    if (route.params?.receiver) {
      setReceiver(route.params.receiver);
      setIsLoading(true);
      getMessages(route.params.receiver.id, state.user.id).then((response) => {
        setIsLoading(false);
        if (response.error) {
          console.log(response.message);
          // setSnackbar({
          //   visible: true,
          //   type: "error",
          //   message: response.message,
          // });
        } else {
          let _messages = response.data.messages ? response.data.messages : [];
          _messages = _messages.map((m, i) => {
            return convertMessage(m);
          });
          setMessages(_messages);
        }
      });
    }
  }, [route.params]);

  function convertMessage(m) {
    return {
      _id: m.id,
      text: m.content,
      createdAt: new Date(m.createdAt),
      user: {
        _id: m.User.id,
        name: m.User.nickname,
        avatar: m.User.image ? `${USER_PROFILE_IMAGE_URL}/${m.User.image}` : "",
      },
    };
  }

  async function sendMessage(message) {
    const data = {
      content: message[0].text,
      receiverId: receiver.id,
    };

    setIsLoading(true);
    const response = await createOrUpdateMessage(data);
    setIsLoading(false);
    if (response.error) {
      console.log(newMessage);
    } else {
      const newMessage = convertMessage(response.data.message);
      setMessages([newMessage, ...messages]);
      console.log("111");
      console.log(newMessage);
    }
  }

  return (
    <>
      <View style={{ ...MainStyle.sceneContainer, paddingBottom: 0 }}>
        {receiver && (
          <GiftedChat
            messages={messages} //messages can be passed as prop
            onSend={(message) => sendMessage(message)} //Options for overriding
            user={{
              _id: state.user.id,
              name: state.user.nickname,
              avatar: `${USER_PROFILE_IMAGE_URL}/${state.user.image}`,
            }}
            renderLoading={() =>
              isLoading ? (
                // <View style={styles.listFooter}>
                <ActivityIndicator animating size="large" />
              ) : (
                // </View>
                isLoading
              )
            }
            // text={content}
            placeholder="Type message here"
            //             messageIdGenerator={this.props.messageIdGenerator}
            alwaysShowSend
            //             locale={this.props.locale}
            //             timeFormat={this.props.timeFormat}
            //             dateFormat={this.props.dateFormat}
            isAnimated
            //             loadEarlier={this.props.loadEarlier}
            //             isLoadingEarlier={this.props.isLoadingEarlier}
            //             renderLoadEarlier={this.props.renderLoadEarlier}
            //  renderAvatar
            showUserAvatar
            showAvatarForEveryMessage
            //             onPressAvatar={this.props.onPressAvatar}
            //             onLongPressAvatar={this.props.onLongPressAvatar}
            //             renderAvatarOnTop={this.props.renderAvatarOnTop}
            //             renderBubble={this.props.renderBubble}
            //             renderSystemMessage={this.props.renderSystemMessage}
            //             onLongPress={this.props.onLongPress}
            //             inverted={this.props.inverted}
            //             renderUsernameOnMessage={this.props.renderUsernameOnMessage}
            //             renderMessage={this.props.renderMessage}
            //             renderMessageText={this.props.renderMessageText}
            //             /* renderMessageImage={this.props.renderMessageImage}
            // renderMessageVideo={this.props.renderMessageVideo} */
            //             videoProps={this.props.videoProps}
            //             lightboxProps={this.props.lightboxProps}
            //             isCustomViewBottom={this.props.isCustomViewBottom}
            //             renderCustomView={this.props.renderCustomView}
            //             renderDay={this.props.renderDay}
            //             renderTime={this.props.renderTime}
            //             renderFooter={this.props.renderFooter}
            //             renderChatFooter={this.props.renderChatFooter}
            //             renderInputToolbar={this.props.renderInputToolbar}
            //             renderComposer={this.props.renderComposer}
            //             renderActions={this.props.renderActions}
            //             renderSend={this.props.renderSend}
            //             renderAccessory={this.props.renderAccessory}
            //             onPressActionButton={this.props.onPressActionButton}
            //             bottomOffset={this.props.bottomOffset}
            //             minInputToolbarHeight={this.props.minInputToolbarHeight}
            //             listViewProps={this.props.listViewProps}
            //             textInputProps={this.props.textInputProps}
            //             keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps}
            //             onInputTextChanged={this.props.onInputTextChanged}
            //             maxInputLength={this.props.maxInputLength}
            //             parsePatterns={this.props.parsePatterns}
            //             extraData={this.props.extraData}
            //             minComposerHeight={this.props.minComposerHeight}
            //             maxComposerHeight={this.props.maxComposerHeight}
            //             scrollToBottom={this.props.scrollToBottom}
            //             scrollToBottomComponent={this.props.scrollToBottomComponent}
            //             scrollToBottomOffset={this.props.scrollToBottomOffset}
            //             scrollToBottomStyle={this.props.scrollToBottomStyle}
            //             alignTop={this.props.alignTop}
            //             /* onQuickReply={this.props.onQuickReply}
            // renderQuickReplies={this.props.renderQuickReplies}
            // quickReplyStyle={this.props.quickReplyStyle}
            // renderQuickReplySend={this.props.renderQuickReplySend} */
            //             shouldUpdateMessage={this.props.shouldUpdateMessage}
          />
        )}
      </View>
    </>
  );
}
