import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword ,GoogleAuthProvider,  applyActionCode, sendEmailVerification} from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";


export const doCreateUserWithEmailandPassword = async (email, password) => {
    try{
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const idToken = await auth.currentUser.uid
        await addDoc(collection(db, 'user-list'), {id: idToken, email: email.toLowerCase()  });
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
    const snapshot = await db.collection('user-list').where('id', '==', idToken).get();
    if (snapshot.empty) {
        await addDoc(collection(db, 'user-list'), { id: idToken, email: auth.currentUser.email });
    }  

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
// New functions for email verification
export const doApplyActionCode = async (actionCode) => {
    try {
      await applyActionCode(auth, actionCode);
      return true;
    } catch (error) {
      throw error;
    }
  };
  
  export const doSendEmailVerification = async (user) => {
    try {
      if (!user) {
        throw new Error('No user found');
      }
      await sendEmailVerification(user);
      if (user.emailVerified) {
        console.log("Email is verified.");
      } else {
        return true;
      }
     
    } catch (error) {
      throw error;
    }
  };
