import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { 
    collection, query, where, orderBy, addDoc, serverTimestamp, onSnapshot 
} from "firebase/firestore";

const ChatPage = () => {
    const { communityId } = useParams();  
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (!communityId) {
            console.error("Community ID is missing!");
            return;
        }
    
        const messagesRef = collection(db, "messages");
        const q = query(
            messagesRef,
            where("communityId", "==", communityId), 
            orderBy("timestamp", "asc")
        );
    
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedMessages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log("Fetched messages:", fetchedMessages); // ✅ Debugging
            setMessages(fetchedMessages);
        });
    
        return () => unsubscribe();
    }, [communityId]);
    
    const sendMessage = async () => {
        if (!newMessage.trim()) {
            alert("Message cannot be empty!");
            return;
        }
        
        try {
            await addDoc(collection(db, "messages"), {
                communityId,
                text: newMessage,
                timestamp: serverTimestamp(),
            });
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="p-4 pt-10">
            <h1 className="text-2xl text-white font-bold pb-4">Community Chat</h1>

            {/* Chat Messages Box */}
            <div className="border p-4 bg-white/10 h-96 overflow-y-auto bg-gray-100 rounded-md">
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <div key={msg.id} className="p-2 border-b bg-white/100 rounded-md my-1">
                            {msg.text}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No messages yet.</p>
                )}
            </div>

            {/* Input and Send Button */}
            <div className="mt-4 flex">
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    className="border p-2 flex-grow rounded-md"
                    placeholder="Type your message..."
                />
                <button 
                    onClick={sendMessage} 
                    className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
