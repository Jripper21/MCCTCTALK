import { auth, db, collection, addDoc, getDocs, onSnapshot } from "./firebase.js";

const serverList = document.getElementById("server-list");
const createServerBtn = document.getElementById("create-server-btn");

// Create a new server
createServerBtn.addEventListener("click", async () => {
    const serverName = prompt("Enter server name:");
    if (serverName) {
        try {
            await addDoc(collection(db, "servers"), {
                name: serverName,
                owner: auth.currentUser.uid,
                createdAt: new Date()
            });
            console.log("Server Created:", serverName);
        } catch (error) {
            console.error("Error creating server:", error);
        }
    }
});

// Load servers in real-time
onSnapshot(collection(db, "servers"), (snapshot) => {
    serverList.innerHTML = "";
    snapshot.forEach((doc) => {
        let server = document.createElement("li");
        server.textContent = doc.data().name;
        server.addEventListener("click", () => {
            localStorage.setItem("serverId", doc.id);
            window.location.href = "channels.html";
        });
        serverList.appendChild(server);
    });
});
