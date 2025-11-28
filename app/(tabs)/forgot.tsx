import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function ForgotScreen() {
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
      <Link href="/" style={{ marginTop: 20 }}>
        <Text style={{ color: "blue" }}>Voltar para tela de login</Text>
      </Link>
    </View>
  );
}
