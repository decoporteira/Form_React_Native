import { Redirect } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { AuthContext } from "../../lib/auth";

export default function ProfileScreen() {
  const { token, loading: authLoading, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({ id: "", email: "" });
  const [loadingPage, setLoadingPage] = useState(true);

  async function fetchProfile() {
    if (!token) {
      Alert.alert("Erro", "Token de autenticação não encontrado");
      return;
    }
    try {
      const response = await fetch(
        "http://192.168.100.39:3000/api/v1/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.message || "Falha ao buscar perfil");
        return;
      }
      setProfile(data);
    } catch (error) {
      Alert.alert("Erro", "Falha na conexão com o servidor");
      console.error(error);
    } finally {
      setLoadingPage(false);
    }
  }
  useEffect(() => {
    if (!authLoading) fetchProfile(); // token já está carregado no contexto
  }, [authLoading]);

  if (!token && !authLoading) {
    console.log("No token found, redirecting to login");
    return <Redirect href="/login" />;
  }
  if (authLoading || loadingPage) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF",
        }}
      >
        <Text>Carregando...</Text>
      </View>
    );
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
      <Text style={{ fontSize: 20 }}>Seus dados</Text>
      <Text>ID: {profile?.id}</Text>
      <Text style={{ marginBottom: 20 }}>Email: {profile?.email}</Text>
      <Button title="Sair" onPress={logout} />
    </View>
  );
}
