import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Icon } from "@rneui/base";

const MyAccount = () => {
  const LeftContent = (props) => (
    <Icon
      color="#0032AF"
      name="quick-contacts-mail"
      onLongPress={() => console.log("onLongPress()")}
      onPress={() => console.log("onPress()")}
      type="MaterialIcons"
      size={40}
    />
  );
  return (
    // <View style={styles.container}>
    //   </View>
    <Card>
      <Card.Title
        title="Card Title"
        left={LeftContent}
        // subtitle="Card Subtitle"
      />

      <Card.Content>
        <Title>Card title</Title>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyAccount;
