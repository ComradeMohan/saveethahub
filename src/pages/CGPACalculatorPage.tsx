import React, { useState } from 'react';

const CGPACalculatorPage = () => {
  const [grades, setGrades] = useState({
    S: 0,
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
  });
  const [cgpa, setCGPA] = useState<number | null>(null);

  const gradePoints: { [key: string]: number } = {
    S: 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    E: 5,
  };

  const calculateCGPA = () => {
    const totalPoints = (grades.S * gradePoints.S) +
                        (grades.A * gradePoints.A) +
                        (grades.B * gradePoints.B) +
                        (grades.C * gradePoints.C) +
                        (grades.D * gradePoints.D) +
                        (grades.E * gradePoints.E);
    
    const totalGrades = grades.S + grades.A + grades.B + grades.C + grades.D + grades.E;

    setCGPA(totalGrades > 0 ? totalPoints / totalGrades : 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGrades({ ...grades, [name]: Number(value) });
  };

  return (
    <div className="py-12">
      <div className="text-center mb-16 cgpa-title">
        <h1 className="text-4xl font-bold text-white mb-4">CGPA Calculator</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Calculate your CGPA by entering the number of grades.
        </p>
      </div>

      <div className="max-w-4xl mx-auto glass-card rounded-xl p-8 cgpa_container">
        <form onSubmit={(e) => { e.preventDefault(); calculateCGPA(); }}>
          <div className="flex flex-col gap-4 mb-4  " >
            {Object.keys(grades).map((grade) => (
              <div key={grade} className="flex items-center gap-4 grade_input">
                <label className="text-white" htmlFor={grade}>
                  Number of {grade} Grades:
                </label>
                <input
                  type="number"
                  id={grade}
                  name={grade}
                  value={grades[grade as keyof typeof grades]}
                  onChange={handleChange}
                  min={0}
                  className="w-24 bg-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Calculate CGPA
          </button>
        </form>

        {cgpa !== null && (
          <div className="mt-8 text-center">
            <h2 className="text-3xl font-bold text-white">
              Your CGPA: {cgpa.toFixed(2)}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CGPACalculatorPage;