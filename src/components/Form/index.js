import React, { useState } from "react";
import { View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Keyboard, 
    TouchableWithoutFeedback, 
    Vibration,
    Pressable,


} from "react-native";

import ResultImc from "./ResultImc/";
import styles from "./style";


export default function Form() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
  const [imc, setImc] = useState(null);
  const [buttonText, setButtonText] = useState("Calcular IMC");
  const [errorMessage, setErrorMessage] = useState(null);
 
 
 

 function imcCalculator() {
    const heightNumber = parseFloat(height);
    const weightNumber = parseFloat(weight);
    setImc((weightNumber / (heightNumber * heightNumber)).toFixed(2));
  }

  function verificationImc() {
    if (imc == null) {
        Vibration.vibrate();
        setErrorMessage("Campo obrigatório*");
        
    }
  }










  function validationImc() {
    
    Keyboard.dismiss(); // Fecha o teclado ao pressionar o botão
    
    if (weight != null && height != null) {
      imcCalculator();
      setHeight(null);
      setWeight(null);
      setMessageImc("Seu IMC é igual a:");
      setButtonText("Calcular Novamente");
      setErrorMessage(null);
      return;
    }
    verificationImc()
    setImc(null);
    setButtonText("Calcular IMC");
    setMessageImc("Preencha o peso e altura");
    
}
return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
      <Pressable onPress={Keyboard.dismiss} style={styles.form}>
        <Text style={styles.formLabel}>Altura</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setHeight(text.replace(",", "."))}
          value={height}
          placeholder="Ex. 1.75"
          keyboardType="numeric"
        />

        <Text style={styles.formLabel}>Peso</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setWeight(text.replace(",", "."))}
          value={weight}
          placeholder="Ex. 75.365"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.buttonCalculator} onPress={validationImc}>
          <Text style={styles.textButtonCalculator}>{buttonText}</Text>
        </TouchableOpacity>
      </Pressable>

      <ResultImc messageResultImc={messageImc} ResultImc={imc} />
    </Pressable>
  </TouchableWithoutFeedback>
);
};


