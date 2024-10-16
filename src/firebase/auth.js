import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth";
import { auth } from "./firebase";
import { GoogleAuthProvider } from "firebase/auth/web-extension";


export const doCreateUserWithEmailandPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth , email, password);
};

export const doSignInWithEmailandPassword=(email , password) => {
    return signInWithEmailAndPassword(auth , email, password);
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth , provider);
    return result;
};

export const doSignOut = () => {
    return auth.signOut();
};

export const doPasswordReset = (email) =>{
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) =>{
    return updatePassword(auth.currentUser, password);
};
