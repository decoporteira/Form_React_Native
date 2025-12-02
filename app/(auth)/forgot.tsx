import { Redirect } from "expo-router";
import { useContext } from "react";
import { Text, TextInput, View } from "react-native";
import { AuthContext } from "../../lib/auth";

export default function ForgotScreen() {
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
      <Text style={{ fontSize: 20 }}>Esqueceu a senha?</Text>
      <Text>Recupere sua senha aqui.</Text>
      <TextInput></TextInput>
    </View>
  );
}
