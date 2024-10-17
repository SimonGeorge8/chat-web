import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword ,GoogleAuthProvider} from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";


export const doCreateUserWithEmailandPassword = async (email, password) => {
    try{
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const idToken = await auth.currentUser.uid
        await addDoc(collection(db, 'user-list'), { id: idToken, email: email });
        return result;
    } catch (e) {
        throw e;
    }

};

export const doSignInWithEmailandPassword = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result;
    } catch (error) {
        throw error;
    }
};


export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth , provider);
    const idToken = await auth.currentUser.uid
    await addDoc(collection(db, 'user-list'), { id: idToken, email: auth.currentUser.email });
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
