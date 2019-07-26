/**
 * @format
 */

import React, { Component } from 'react'
import { AppRegistry, View, Text, Button, TextInput, StyleSheet } from 'react-native'
//import App from './App'
import { name as appName } from './app.json'
import firebase from 'firebase'

class App extends Component {

    state = {
        email: '',
        senha: '',
        status: '',
    }

    componentWillMount() {
        const firebaseConfig = {
            apiKey: "AIzaSyC6OfvW30Fek5E5hWRH1wfsYGX95xrCccI",
            authDomain: "messenger-bb3c1.firebaseapp.com",
            databaseURL: "https://messenger-bb3c1.firebaseio.com",
            projectId: "messenger-bb3c1",
            storageBucket: "",
            messagingSenderId: "53867046526",
            appId: "1:53867046526:web:64f69c503bca0946"
        }
        firebase.initializeApp(firebaseConfig)
        this.statusUser()
    }

    registerUser(email, senha) {
        const user = firebase.auth()

        user.createUserWithEmailAndPassword(
            email, senha
        ).catch((erro) => {
            if (erro.code == 'auth/weak-password') {
                erroMensage = 'Digite uma senha de pelo menos 6 caracteres.'
            }
            alert(erroMensage)
        })
        this.statusUser()
    }

    statusUser() {
        var user = firebase.auth()

        user.onAuthStateChanged(
            (currentUser) => {
                if (currentUser) {
                    this.setState({ status: 'Conectado' })
                } else {
                    this.setState({ status: 'Desconectado' })
                }
            }
        )
    }

    loginUser(email, senha) {
        const user = firebase.auth()
        user.signInWithEmailAndPassword(email, senha)
        this.statusUser()
    }

    logoutUser() {
        const user = firebase.auth()
        user.signOut()
        this.statusUser()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.status}</Text>
                <TextInput style={styles.inputs} placeholder='Email' onChangeText={(email) => { this.setState({ email }) }} />
                <TextInput style={styles.inputs} placeholder='Senha' onChangeText={(senha) => { this.setState({ senha }) }} />
                <View style={styles.viewButtons}>
                    <View style={styles.button}>
                        <Button color="#841584" style={styles.button} title='Register' onPress={() => this.registerUser(this.state.email, this.state.senha)} />
                    </View>
                    <View style={styles.button}>
                        <Button style={styles.button} title='Login' onPress={() => this.loginUser(this.state.email, this.state.senha)} />
                    </View>
                    <View style={styles.button}>
                        <Button style={styles.button} title='Logout' onPress={() => this.logoutUser(this.state.email, this.state.senha)} />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
    },
    inputs: {
        height: 40,
        width: "70%",
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 30,
        marginBottom: 10
    },
    viewButtons: {
        width: '70%'
    },
    button: {
        marginTop: 10
    }
});


AppRegistry.registerComponent(appName, () => App)
