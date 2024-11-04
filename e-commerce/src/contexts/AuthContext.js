// src/contexts/AuthContext.js
import React, { useContext, useState, useEffect } from 'react';
import { auth, googleProvider, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [role, setRole] = useState('');

  async function signup(email, password, role = 'user') {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Store the user role in Firestore
    await setDoc(doc(db, 'users', user.uid), { 
      email: user.email,
      role,
    });

    return userCredential;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function googleSignIn() {
    return signInWithPopup(auth, googleProvider);
  }

  function logout() {
    return signOut(auth);
  }

  async function updateProfile(data) {
    if (!currentUser) return;
    const userDocRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userDocRef, data);
  }

  async function getProfile() {
    if (!currentUser) return;
    const userDocRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? userDoc.data() : null;
  }

  async function fetchBillingAndShippingInfo() {
    if (!currentUser) {
      console.warn("No current user logged in.");
      return null;
    }

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        console.log("Billing and Shipping Info Retrieved:", data); // Debugging log
        return data;
      } else {
        console.warn("User document does not exist.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching billing and shipping info:", error);
      return null;
    }
  }

  // Save order information in Firestore under a separate collection
  async function placeOrder(orderData) {
    if (!currentUser) return;
    const orderCollectionRef = collection(db, 'users', currentUser.uid, 'orders');
    await addDoc(orderCollectionRef, orderData);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      setCurrentUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        }
      } else {
        setRole('');
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    role,
    signup,
    login,
    googleSignIn,
    logout,
    updateProfile,
    getProfile,
    fetchBillingAndShippingInfo,  // Direct billing info fetch function
    placeOrder,        // Direct order placement function
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
