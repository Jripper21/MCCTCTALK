import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAzgMrC3wVEP7vaVLUPJD7k4Wl1jVc4INs",
    authDomain: "mcctctalk.firebaseapp.com",
    projectId: "mcctctalk",
    storageBucket: "mcctctalk.firebasestorage.app",
    messagingSenderId: "1010059113909",
    appId: "1:1010059113909:web:5a2506e082406490c455fc",
    measurementId: "G-KDN0QDJZ4C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login/Logout Buttons
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");

// Google Login
const provider = new GoogleAuthProvider();
loginBtn?.addEventListener("click", async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Login error:", error);
    }
});

// Logout
logoutBtn?.addEventListener("click", async () => {
    await signOut(auth);
});

// Track Authentication State
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged in:", user);
        loginBtn.style.display = "none";
        logoutBtn.style.display = "block";
    } else {
        loginBtn.style.display = "block";
        logoutBtn.style.display = "none";
    }
});
