import { auth, db, collection, addDoc, query, orderBy, onSnapshot } from "./firebase.js";

const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

const serverId = localStorage.getItem("serverId");
const channelId = localStorage.getItem("channelId");

// Send message
sendBtn.addEventListener("click", async () => {
    if (messageInput.value.trim() !== "") {
        try {
            await addDoc(collection(db, "servers", serverId, "channels", channelId, "messages"), {
                sender: auth.currentUser.displayName,
                text: messageInput.value,
                timestamp: new Date()
            });
            messageInput.value = "";
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
});

// Load messages in real-time
const messagesQuery = query(collection(db, "servers", serverId, "channels", channelId, "messages"), orderBy("timestamp", "asc"));

onSnapshot(messagesQuery, (snapshot) => {
    chatBox.innerHTML = "";
    snapshot.forEach((doc) => {
        let msg = document.createElement("p");
        msg.innerHTML = `<strong>${doc.data().sender}:</strong> ${doc.data().text}`;
        chatBox.appendChild(msg);
    });
});
