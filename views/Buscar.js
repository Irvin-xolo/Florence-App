import { TextInput, TouchableOpacity, StyleSheet, View, Text, ScrollView } from "react-native";
import { useState } from "react";

export default function Buscar() {
    const [buscar, setBuscar] = useState('')
    const [paciente, setPaciente] = useState(null)
    const [diagnosticos, setDiagnosticos] = useState([])

    const handleSubmit = async () => {
        try {
            const response = await fetch(`https://florence-api.up.railway.app/v1/pacientes/nombre/${buscar}`)
            const data = await response.json()
            console.log(data)
            console.log(buscar)

            if (data.rows && data.rows.length > 0) {
                const pacienteData = data.rows[0][0]
                const diagnosticosData = data.rows[1].slice(0)
                setPaciente(pacienteData)
                setDiagnosticos(diagnosticosData)
            } else {
                setPaciente(null)
                setDiagnosticos([])
            }
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.top}>
                <TextInput style={styles.inputTop} placeholder="Nombre del paciente" value={buscar} onChangeText={text => setBuscar(text)} />
                <TouchableOpacity style={styles.inputBtn} onPress={handleSubmit}>
                    <Text style={styles.text}>Buscar</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.containerResult}>
                    {paciente && diagnosticos && diagnosticos.length > 0 ? (
                        diagnosticos.map((diagnostico, index) => (
                            <View style={styles.content} key={index}>
                                <Text>Temperatura: {diagnostico.Temperatura}</Text>
                                <Text>Altura: {diagnostico.Altura}</Text>
                                <Text>Peso: {diagnostico.Peso}</Text>
                                <Text>Presión arterial: {diagnostico.PresionArterial}</Text>
                                <Text>Oxigenación: {diagnostico.Oxigenacion}</Text>
                                <Text>Latidos por minuto: {diagnostico.LatidosPorMinuto}</Text>
                                <Text>Respiración por minuto: {diagnostico.RespiracionPorMinuto}</Text>
                                <Text>Fecha: {diagnostico.FechaHora.slice(0, 10)}</Text>
                                <Text>Observaciones: {diagnostico.Observaciones}</Text>
                                <Text>Alergias: {paciente.Alergias}</Text>
                                <Text>Discapacidades: {paciente.Discapacidad}</Text>
                                <Text>Diabetes: {paciente.Diabetes}</Text>
                            </View>
                        ))
                    ) : (
                        <Text>No hay registros disponibles.</Text>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%",
      backgroundColor: "#0d8f97"
    },
    top: {
        display: "flex",
        flexDirection: "row",
        height: "20%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    inputTop: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#000",
        width: "60%",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    inputBtn: {
        backgroundColor: "#000",
        paddingVertical: 12,
        color: "#fff",
        width: "20%",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    text: {
        color: "#fff",
        textAlign: "center"
    },
    containerResult: {
        height: "80%",
        width: "100%",
        display: "flex",
        alignItems: "center"
    },
    content: {
        backgroundColor: "#fff",
        width: "80%",
        borderRadius: 10,
        padding: 20,
        marginBottom: 20
    }
  });