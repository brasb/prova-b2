import { Button, Text, View, StyleSheet, Image } from 'react-native';
import { TextInput } from 'react-native-web';
import React, { useRef, useState } from 'react';


import { createClient } from '@supabase/supabase-js';

import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

export const clienteSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function FormBtn(props) {
  return (
    <View>
      <TextInput style={styles.autenticaoForm} placeholder={props.label} placeholderTextColor="#888888"/>
    </View>
  );
}

function LoginForms(props) {
  return (
    <View style={styles.containerBotoes}>
      <FormBtn onChangeText={props.setCima} label={props.labelCima}/>
      <FormBtn onChangeText={props.setBaixo} label={props.labelBaixo}/>
    </View>
  );
}

async function supabaseRegistrar(email, senha) {
  if (email == "") {
    alert("Email vazio.");
    return;
  }

  if (senha == "" || senha.length < 6) {
    alert("Senha pequena demais.");
    return;
  }

  const { user, error } = await clienteSupabase.auth.signUp({email: email, password: senha});
  console.log({email: email, password: senha})
  if (error) {
    alert("Erro: não foi possível registrar");
    alert(error);
  } else {
    alert("Credenciais registradas.");
  }
}

async function supabaseLogin(email, senha) {
  const { user, err } = await clienteSupabase.auth.signInWithPassword({email: email, password: senha});
  if (err) {
    alert("Erro: não foi possível fazer login. Verifique se você digitou a senha corretamente.")
  } else {
    alert("Login feito com sucesso!");
  }
}

export default function TelaLogin() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.titulo}>Sistema</Text>
      </View>
      <LoginForms labelCima="Seu login" labelBaixo="Senha" setCima={setLogin} setBaixo={setSenha}/>
      <View style={styles.containerControles}>
        <Button style={styles.botaoControle} title="Não tem uma conta? Registrar." 
          onPress={() => supabaseRegistrar(login, senha)}/>
        <Button style={styles.botaoControle} title="Login" onPress={() => supabaseLogin(login, senha)}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    marginVertical: '33%',
    height: '66%',
    backgroundColor: '#eeeeee'
  },
  containerTop: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  titulo: {
    fontSize: 72,
    fontStyle: 'bold',
  },
  containerBotoes: {
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
    display: 'flex',
    alignItems: 'center',
    height: '40vh',
  },
  autenticaoForm: {
    borderColor: '#000000',
    borderWidth: '2px',
    height: '70px',
    width: '100%',
    textAlign: 'center',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  botaoRegistrar: {
    fontStyle: 'normal'
  },
  botaoLogin: {

  },
  containerControles: {
    backgroundColor: 'red',
    height: '20%',
    justifyContent: 'center',
  },
  botaoControle: {
    marginBottom: '20px',
    borderRadius: '4px',
  },
});
