import { Redirect } from "expo-router";
import { useContext } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../../lib/auth";

export default function ProfileScreen() {
  const { token, loading: authLoading } = useContext(AuthContext);
  if (!token && !authLoading) {
    console.log("No token found, redirecting to login");
    return <Redirect href="/login" />;
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
      }}
    >
      <Text style={{ fontSize: 20 }}>Tela de Recuperação de Senha</Text>
      <Text>Email: {}</Text>
    </View>
  );
}
