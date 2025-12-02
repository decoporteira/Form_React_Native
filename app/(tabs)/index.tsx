import { Redirect } from "expo-router";
import { useContext } from "react";
import { Image, Text, View } from "react-native";
import { AuthContext } from "../../lib/auth";
export default function HomeScreen() {
  const { token, loading, logout } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando...</Text>
      </View>
    );
  }
  if (!token) {
    console.log("No token found, redirecting to login");
    return <Redirect href="/login" />;
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
    </View>
  );
}
