import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Importando o módulo de autenticação
// Se você decidir usar o Firestore ou outras funcionalidades no futuro, pode importá-las aqui.

const firebaseConfig = {
  apiKey: "AIzaSyCaJqR_x0_h7JRoKuc7QB3GJcHRAljmKOc",
  authDomain: "ariana-terapias.firebaseapp.com",
  projectId: "ariana-terapias",
  storageBucket: "ariana-terapias.appspot.com",
  messagingSenderId: "645840673005",
  appId: "1:645840673005:web:61e09213158e0c3a6014e4",
  measurementId: "G-FZT0YNPL6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Inicializando a autenticação

export { auth }; // Exportando para que possa ser usado em outros lugares do projeto
