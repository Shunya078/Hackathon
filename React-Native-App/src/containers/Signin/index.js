import { createStackNavigator } from "@react-navigation/stack";
import {
  Button,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { useLazyGetDoc } from "react-fireclient";
import React, { useContext, useState } from "react";
import { useSetDoc } from "react-fireclient";
import { View } from "react-native";
import { showMessage } from "react-native-flash-message";
import KeyboardAvoidingView from "src/components/KeyboardAvoidingView";
import { AuthContext } from "src/utils/auth";
import { EmailIcon, EyeIcon, EyeOffIcon, PersonIcon } from "./icons";

const SignupView = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { signup } = useContext(AuthContext);

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = () => {
    signup(
      email,
      password,
      () => {
        console.log("asdfasdf");
      },
      (error) =>
        showMessage({
          message: "エラー",
          description: `[${error.code}]: ${error.message}`,
          type: "danger",
        })
    );
  };

  const onSignInButtonPress = () => {
    navigation && navigation.navigate("LoginView");
  };

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text category="h1" status="control">
          サインアップ
        </Text>
        <Text style={styles.signInLabel} category="s1" status="control">
          新しくアカウントを登録します
        </Text>
      </View>
      <Layout style={styles.formContainer} level="1">
        <Input
          style={styles.emailInput}
          autoCapitalize="none"
          placeholder="Eメール"
          icon={EmailIcon}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={styles.passwordInput}
          autoCapitalize="none"
          secureTextEntry={!passwordVisible}
          placeholder="パスワード"
          icon={passwordVisible ? EyeIcon : EyeOffIcon}
          value={password}
          onChangeText={setPassword}
          onIconPress={onPasswordIconPress}
        />
      </Layout>
      <Button
        disabled={!(email && password)}
        style={styles.signUpButton}
        size="giant"
        onPress={onSignUpButtonPress}
      >
        サインアップ
      </Button>
      <Button
        style={styles.signInButton}
        appearance="ghost"
        status="basic"
        onPress={onSignInButtonPress}
      >
        すでに作成したアカウントでログインする
      </Button>
    </KeyboardAvoidingView>
  );
};

const LoginView = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { signin } = useContext(AuthContext);
  const styles = useStyleSheet(themedStyles);

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSignUpButtonPress = () => {
    navigation && navigation.navigate("LoginView");
  };

  const onPressSignin = () => {
    signin(
      email,
      password,
      () => {
        console.log("asdfasdf");
      },
      (error) =>
        showMessage({
          message: "エラー",
          description: `[${error.code}]: ${error.message}`,
          type: "danger",
        })
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text category="h1" status="control">
          ログイン
        </Text>
        <Text style={styles.signInLabel} category="s1" status="control">
          登録済みのアカウントでログインします
        </Text>
      </View>
      <Layout style={styles.formContainer} level="1">
        <Input
          placeholder="Eメール"
          icon={PersonIcon}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={styles.passwordInput}
          placeholder="パスワード"
          icon={passwordVisible ? EyeIcon : EyeOffIcon}
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
          onIconPress={onPasswordIconPress}
        />
      </Layout>
      <Button style={styles.signInButton} size="giant" onPress={onPressSignin}>
        サインイン
      </Button>
      <Button
        style={styles.signUpButton}
        appearance="ghost"
        status="basic"
        onPress={onSignUpButtonPress}
      >
        もしくはアカウントを作成する
      </Button>
    </KeyboardAvoidingView>
  );
};

const RegisterAccountFql = ({ nickname, location }) => ({
  fields: {
    name: nickname,
    followCount: 100,
    location: location,
    imgUrl: "asdfasdf",
  },
});

export const RegisterView = ({ uid, registerCallback }) => {
  const [nickname, setNickname] = useState("");
  const [location, setLocation] = useState("");
  const styles = useStyleSheet(themedStyles);
  const [setFn] = useSetDoc(`users/${uid}`, RegisterAccountFql, {
    callback: () => registerCallback(),
  });

  const onPressRegister = () => {
    setFn({ nickname, location });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text category="h1" status="control">
          ユーザー情報
        </Text>
        <Text style={styles.signInLabel} category="s1" status="control">
          ユーザーに関する情報を入力します。
        </Text>
      </View>
      <Layout style={styles.formContainer} level="1">
        <Input
          placeholder="表示名"
          icon={PersonIcon}
          value={nickname}
          onChangeText={setNickname}
        />
      </Layout>
      <Layout style={styles.formContainer} level="1">
        <Input
          placeholder="地域"
          icon={PersonIcon}
          value={location}
          onChangeText={setLocation}
        />
      </Layout>
      <Button
        disabled={nickname === ""}
        style={styles.signInButton}
        size="giant"
        onPress={onPressRegister}
      >
        次へ
      </Button>
    </KeyboardAvoidingView>
  );
};

const Stack = createStackNavigator();
const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-1",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 216,
    backgroundColor: "color-primary-default",
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },

  profileAvatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    alignSelf: "center",
    backgroundColor: "background-basic-color-1",
    tintColor: "color-primary-default",
  },
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  emailInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  termsCheckBoxText: {
    color: "text-hint-color",
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="SignupView" component={SignupView} />
    <Stack.Screen name="LoginView" component={LoginView} />
  </Stack.Navigator>
);
