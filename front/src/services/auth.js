import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

// Login com Google
const googleProvider = new GoogleAuthProvider();


export function sendResetEmail(email) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("E-mail de redefinição enviado!");
      // Aqui, você pode mostrar uma mensagem para o usuário ou realizar outras ações após o sucesso do envio
    })
    .catch((error) => {
      console.error("Erro ao enviar o e-mail de redefinição:", error);
      // Você pode querer mostrar uma mensagem de erro para o usuário aqui
    });
}


export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider)
    .then(result => {

      
      console.log("Usuário logado via Google:", result.user);
      return result;
    })
    .catch(error => {
      console.error("Erro ao logar com o Google:", error);
      throw error; // Rejeitar a promise para que você possa lidar com o erro no componente também, se necessário
    });
}

// Cadastro com e-mail/senha
export function signUpWithEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(result => {
      console.log("Usuário cadastrado:", result.user);
      return result;
    })
    .catch(error => {
      console.error("Erro ao cadastrar usuário:", error);
      throw error;
    });
}

// Login com e-mail/senha
export function signInWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then(result => {
      console.log("Usuário logado:", result.user);
      return result;
    })
    .catch(error => {
      console.error("Erro ao logar com e-mail/senha:", error);
      throw error;
    });
}

// Logout
export function signOut() {
  localStorage.clear();

  return auth.signOut()
    .then(() => {
      console.log("Usuário deslogado com sucesso");
    })
    .catch(error => {
      console.error("Erro ao deslogar:", error);
      throw error;
    });
}
