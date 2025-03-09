import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

const CommunityPage = () => {
    const [communities, setCommunities] = useState([]);
    const [joinedCommunities, setJoinedCommunities] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "communities"));
                setCommunities(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error("Error fetching communities: ", error);
            }
        };

        const fetchUser = async () => {
            const userEmail = localStorage.getItem("userEmail");
            if (!userEmail) {
                console.log("No user email found. Redirecting to login...");
                navigate("/login");
                return;
            }

            try {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("email", "==", userEmail));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    const userData = { id: userDoc.id, ...userDoc.data() };
                    setUser(userData);
                    fetchJoinedCommunities(userData.id);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const fetchJoinedCommunities = async (userId) => {
            try {
                const q = query(collection(db, "community_members"), where("userId", "==", userId));
                const querySnapshot = await getDocs(q);
                setJoinedCommunities(querySnapshot.docs.map(doc => doc.data().communityId));
            } catch (error) {
                console.error("Error fetching joined communities: ", error);
            }
        };

        fetchCommunities();
        fetchUser();
    }, [navigate]);

    const handleCommunityClick = async (communityId) => {
        if (!user) {
            alert("Please log in first!");
            return;
        }

        if (joinedCommunities.includes(communityId)) {
            // If already joined, navigate to chat
            navigate(`/chat/${communityId}`);
        } else {
            // If not joined, add to Firestore and then navigate
            try {
                await addDoc(collection(db, "community_members"), {
                    userId: user.id,
                    communityId
                });

                setJoinedCommunities((prev) => [...prev, communityId]); // ✅ Update state immediately
                navigate(`/chat/${communityId}`);
            } catch (error) {
                console.error("Error joining community: ", error);
            }
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Join a Community</h1>
            <ul className="mt-4">
                {communities.map((comm) => (
                    <li key={comm.id} className="p-3 border rounded-lg mb-2">
                        <h2 className="text-lg font-semibold">{comm.name}</h2>
                        <button 
                            onClick={() => handleCommunityClick(comm.id)} 
                            className={`mt-2 px-4 py-2 rounded ${
                                joinedCommunities.includes(comm.id) ? "bg-green-500" : "bg-blue-500"
                            } text-white`}
                        >
                            {joinedCommunities.includes(comm.id) ? "Enter" : "Join"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommunityPage;
