import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SigninScreen({ navigation }: any) {
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { token } = await response.json();
        await AsyncStorage.setItem("token", token);
        Alert.alert("Success", "You are now signed in!");
        navigation.navigate("Home");
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Signin failed");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signin</Text>

      <Controller
        control={control}
        name='email'
        rules={{ required: "Email is required" }}
        render={({ field }) => (
          <TextInput
            style={styles.input}
            placeholder='Email'
            autoCapitalize='none'
            onChangeText={field.onChange}
            value={field.value}
          />
        )}
      />

      <Controller
        control={control}
        name='password'
        rules={{ required: "Password is required" }}
        render={({ field }) => (
          <TextInput
            style={styles.input}
            placeholder='Password'
            autoCapitalize='none'
            onChangeText={field.onChange}
            value={field.value}
          />
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Signin</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don't have an account? Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  button: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 10 },
  buttonText: { fontSize: 18, color: "#FFF", fontWeight: "bold" },
  link: { marginTop: 10, color: "#FFD700", fontSize: 16 },
});
