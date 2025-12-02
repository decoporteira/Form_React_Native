import { Redirect } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { AuthContext } from "../../lib/auth";

const formatDateBR = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR").format(date);
};

export default function ReportScreen() {
  const { token, loading: authLoading } = useContext(AuthContext);

  const [student, setStudent] = useState([]);
  const [activities, setActivities] = useState([]);
  const [resume, setResume] = useState(null);
  const [numberOfAbsence, setNumberOfAbsence] = useState(0);
  const [loadingPage, setLoadingPage] = useState(true);

  async function fetchReport() {
    if (!token) {
      Alert.alert("Erro", "Token de autenticação não encontrado");
      return;
    }
    try {
      const response = await fetch(
        "http://192.168.100.39:3000/api/v1/reports/462",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.message || "Falha ao buscar relatório");
        return;
      }
      setStudent(data.student);
      setActivities(data.activities);
      setResume(data.resume);
      setNumberOfAbsence(data.number_of_absence);
    } catch (error) {
      Alert.alert("Erro", "Falha na conexão com o servidor");
      console.error(error);
    } finally {
      setLoadingPage(false);
    }
  }

  useEffect(() => {
    if (!authLoading) {
      fetchReport(); // token já está carregado no contexto
    }
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

        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 15,
      }}
    >
      <Image
        source={require("../../assets/images/logo.png")}
        style={{ width: 130, height: 80, marginBottom: 40, marginTop: 34 }}
        resizeMode="contain"
      ></Image>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 15,
          textAlign: "center",
        }}
      >
        Relatório do Aluno
      </Text>

      <Text style={{ fontWeight: "bold", fontSize: 16 }}>Aluno:</Text>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>{student.name}</Text>

      {/* Resumo e Faltas no topo */}
      <Text style={{ fontSize: 16, marginBottom: 5 }}>
        <Text style={{ fontWeight: "bold" }}>Resumo: </Text>
        {resume ?? "Nenhum"}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Faltas: </Text>
        {numberOfAbsence}
      </Text>

      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
        Atividades:
      </Text>

      <ScrollView style={{ maxHeight: 450, width: "100%" }}>
        {activities.length === 0 ? (
          <Text style={{ fontStyle: "italic", color: "#555" }}>
            Nenhuma atividade encontrada
          </Text>
        ) : (
          activities.map((activity) => {
            const isDone = activity.late.toLowerCase() === "feito";
            return (
              <View
                key={activity.id}
                style={{
                  backgroundColor: "#fff",
                  padding: 15,
                  marginBottom: 12,
                  borderRadius: 10,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2,
                }}
              >
                <Text style={{ fontSize: 16, marginBottom: 5 }}>
                  {activity.report}
                </Text>
                <Text style={{ color: "#666", marginBottom: 5 }}>
                  Data: {formatDateBR(activity.date)}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: isDone
                      ? "#1E90FF" /* azul */
                      : "#FF4500" /* vermelho */,
                  }}
                >
                  Status: {activity.late}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
