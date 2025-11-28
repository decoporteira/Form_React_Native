import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Button, Image, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Image
        source={require("../../assets/images/logo.png")}
        style={{ width: 130, height: 80, marginBottom: 40 }}
        resizeMode="contain"
      ></Image>
      <Text style={{ color: "#000000" }}>Bem vindo</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
        style={{
          width: "80%",
          color: "#000000",
          borderColor: "#000000",
          borderWidth: 1,
          borderBottomWidth: 1,
          marginTop: 20,
          borderRadius: 5,
        }}
      ></TextInput>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
        secureTextEntry
        style={{
          width: "80%",
          color: "#000000",
          borderColor: "#000000",
          borderWidth: 1,
          borderBottomWidth: 1,
          marginTop: 20,
          borderRadius: 5,
        }}
      ></TextInput>
      <View style={{ marginTop: 20, width: "80%" }}>
        <Button title="Log in" onPress={() => Alert.alert("clicou")} />
      </View>
      <Text style={{ color: "#000000", marginTop: 20 }}>
        Não tem uma conta?{" "}
        <Link href="/(tabs)/register" style={{ marginTop: 10 }}>
          <Text style={{ color: "blue" }}>Cadastre-se</Text>
        </Link>
      </Text>

      <Link href="/(tabs)/forgot" style={{ marginTop: 10 }}>
        <Text style={{ color: "blue" }}>Esqueceu a senha?</Text>
      </Link>
    </View>
  );
}
