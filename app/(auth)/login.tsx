import { Link, Redirect, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Button, Image, Text, TextInput, View } from "react-native";
import { AuthContext } from "../../lib/auth";

export const screenOptions = {
  headerShown: false,
};

export default function LoginScreen() {
  const { token, loading, setToken } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  async function handleLogin() {
    try {
      const response = await fetch(
        "http://192.168.100.39:3000/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.message || "Falha no login");
        return;
      }

      setToken(data.token);

      router.push("/");
    } catch (error) {
      Alert.alert("Erro", "Falha na conexão com o servidor");
      console.error(error);
    }
  }
  if (token && !loading) {
    return <Redirect href="/" />;
  }

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
        <Button title="Entrar" onPress={handleLogin} />
      </View>
      <Text style={{ color: "#000000", marginTop: 20 }}>
        Não tem uma conta?{" "}
        <Link href="/(auth)/register" style={{ marginTop: 10 }}>
          <Text style={{ color: "blue" }}>Cadastre-se</Text>
        </Link>
      </Text>
      <Link href="/(auth)/forgot" style={{ marginTop: 10 }}>
        <Text style={{ color: "blue" }}>Esqueceu a senha?</Text>
      </Link>
    </View>
  );
}
