import { TextInput, TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import axios from "axios";

export default function Login({ navigation }) {
    const [nombre, setNombre] = useState('')
    const [codigo, setCodigo] = useState('')

    const handleLogin = async (e) => {
        try{
            const response = await axios.post('https://florence-api.up.railway.app/v1/auth/login', { nombre, codigo})
            console.log(response.data)

            navigation.navigate('Buscar')
            setNombre('')
            setCodigo('')
        }catch(error){
            alert('Por favor, verifica que las credenciales sean correctas.')
            console.error(error)
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.text}>Por favor, ingresa tus credenciales.</Text>
                <TextInput style={styles.input} placeholder="Nombre del personal" value={nombre} onChangeText={text => setNombre(text)} />
                <TextInput style={styles.input} placeholder="Código de empleado" value={codigo} onChangeText={text => setCodigo(text)} />
                <TouchableOpacity style={styles.boton} onPress={handleLogin}>
                    <Text style={styles.textBoton}>Ingresar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      backgroundColor: "#0d8f97"
    },
    form: {
        backgroundColor: "#fff",
        maxHeight: "50%",
        height: "100%",
        maxWidth: "70%",
        width: "100%",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: "#20ccc9",
        width: "80%",
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginVertical: 10,
        borderRadius: 5
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        letterSpacing: 2
    },
    text: {
        fontSize: 16
    },
    boton: {
        backgroundColor: "#0d8f97",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 10
    },
    textBoton: {
        color: "#fff"
    }
  });