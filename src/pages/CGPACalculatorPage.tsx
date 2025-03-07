import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const CGPACalculatorPage = () => {
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("S");
  const [subjects, setSubjects] = useState([]);
  const [cgpa, setCGPA] = useState(0.0); // Default to 0
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const gradePoints = {
    S: 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    E: 5,
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Fetch user data and grades from Firestore
  const fetchUserData = async () => {
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
        const data = userDoc.data();
        setUserData({ id: userDoc.id, ...data });

        // Load existing subjects & CGPA if present
        if (data.grades) {
          setSubjects(data.grades);
          calculateCGPA(data.grades);
        }
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  // Add new subject (Triggers CGPA recalculation)
  const handleAddSubject = async () => {
    if (subject.trim() === "") return;

    const newSubject = { name: subject, grade };
    const updatedSubjects = [...subjects, newSubject];

    setSubjects(updatedSubjects);
    setSubject("");
    setGrade("S");

    calculateCGPA(updatedSubjects);

    // Update Firestore with the new subject
    if (userData) {
      try {
        const userRef = doc(db, "users", userData.id);
        await updateDoc(userRef, {
          grades: arrayUnion(newSubject),
        });
      } catch (err) {
        console.error("Error updating user data:", err);
      }
    }
  };

  // Calculate CGPA and update Firestore
  const calculateCGPA = async (updatedSubjects) => {
    if (updatedSubjects.length === 0) {
      setCGPA(0.0); // If no subjects, CGPA is 0
      return;
    }

    const totalPoints = updatedSubjects.reduce((acc, subj) => acc + gradePoints[subj.grade], 0);
    const calculatedCGPA = totalPoints / updatedSubjects.length;
    setCGPA(calculatedCGPA);

    // Update Firestore with CGPA
    if (userData) {
      try {
        const userRef = doc(db, "users", userData.id);
        await updateDoc(userRef, { cgpa: calculatedCGPA });
      } catch (err) {
        console.error("Error updating CGPA in Firestore:", err);
      }
    }
  };

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">CGPA Calculator</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Enter your subjects and select the corresponding grades to calculate your CGPA.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full md:w-2/3 p-3 border border-gray-300 rounded-lg"
              placeholder="Subject Name"
              required
            />
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg"
            >
              {Object.keys(gradePoints).map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddSubject}
            className="mt-4 w-full md:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Add Subject
          </button>

          <div className="mt-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Your CGPA: {cgpa.toFixed(2)}
          </h2>
        </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Subjects</h2>
          <ul className="space-y-2">
            {subjects.map((subj, index) => (
              <li key={index} className="flex justify-between p-3 bg-gray-100 rounded-lg">
                <span>{subj.name}</span>
                <span>{subj.grade}</span>
              </li>
            ))}
          </ul>
        </div>

       
      </div>
    </div>
  );
};

export default CGPACalculatorPage;
