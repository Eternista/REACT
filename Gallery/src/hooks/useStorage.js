import { useRef } from 'react';
import React, {useContext,useState, useEffect} from 'react';
import {projectStorage, projectFirestore, timestamp,auth} from '../firebase/config';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
  
    function signup(email, password) {
      return auth.createUserWithEmailAndPassword(email, password)
    }
  
    function login(email, password) {
      return auth.signInWithEmailAndPassword(email, password)
    }
  
    function logout() {
      return auth.signOut()
    }
  
    function resetPassword(email) {
      return auth.sendPasswordResetEmail(email)
    }
  
    function updateEmail(email) {
      return currentUser.updateEmail(email)
    }
  
    function updatePassword(password) {
      return currentUser.updatePassword(password)
    }
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
      })
  
      return unsubscribe
    }, [])
  
    const value = {
      currentUser,
      login,
      signup,
      logout,
      resetPassword,
      updateEmail,
      updatePassword
    }
  
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    )
  }

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        //REFRENCES
        const storageRef = projectStorage.ref(file.name);
        const collectionRef = projectFirestore.collection('images');

        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({url, createdAt});
        })

    }, [file])

        return {progress, url, error}

}

export default useStorage;