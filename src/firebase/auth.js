import { 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  updatePassword,
  GoogleAuthProvider,
  applyActionCode,
  sendEmailVerification
} from "firebase/auth";
import { auth, db } from "./firebase";
import { 
  collection, 
  where, 
  addDoc,
  updateDoc,
  setDoc,
  doc
} from "firebase/firestore";

// Function to generate a key pair
const generateKeyPair = async () => {
  try {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256"
      },
      true, // extractable
      ["encrypt", "decrypt"]
    );

    // Export the public key
    const publicKeyJwk = await window.crypto.subtle.exportKey(
      "jwk",
      keyPair.publicKey
    );

    // Export the private key
    const privateKeyJwk = await window.crypto.subtle.exportKey(
      "jwk",
      keyPair.privateKey
    );

    return {
      publicKey: JSON.stringify(publicKeyJwk),
      privateKey: JSON.stringify(privateKeyJwk)
    };
  } catch (error) {
    console.error("Error generating key pair:", error);
    throw error;
  }
};

// Modified create user function with key generation
export const doCreateUserWithEmailandPassword = async (email, password) => {
  try {
    // Create the user account
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const userId = auth.currentUser.uid;

    // Generate encryption keys
    const { publicKey, privateKey } = await generateKeyPair();

    // Create user document with keys
    await setDoc(doc(db, 'user-list', userId), {
      id: userId,
      email: email.toLowerCase(),
      publicKey,
      privateKey,
      createdAt: new Date().toISOString()
    });

    return result;
  } catch (e) {
    console.error("Error creating user:", e);
    throw e;
  }
};

// Modified Google sign-in with key generation
export const doSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const userId = auth.currentUser.uid;

    const userDoc = doc(db, 'user-list', userId);
    const userSnapshot = await userDoc.get();

    if (!userSnapshot.exists()) {
      // Generate keys for new Google users
      const { publicKey, privateKey } = await generateKeyPair();

      // Create user document with keys
      await setDoc(userDoc, {
        id: userId,
        email: auth.currentUser.email,
        publicKey,
        privateKey,
        createdAt: new Date().toISOString()
      });
    }

    return result;
  } catch (error) {
    console.error("Error with Google sign-in:", error);
    throw error;
  }
};

// Helper function to get user's public key
export const getUserPublicKey = async (userId) => {
  try {
    const userDoc = await db.collection('user-list').doc(userId).get();
    if (!userDoc.exists) {
      throw new Error('User not found');
    }
    return userDoc.data().publicKey;
  } catch (error) {
    console.error("Error getting user's public key:", error);
    throw error;
  }
};

// The rest of the auth functions remain the same
export const doSignInWithEmailandPassword = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const doSignOut = async () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

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
    return !user.emailVerified;
  } catch (error) {
    throw error;
  }
};