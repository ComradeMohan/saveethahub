import{ useState, useEffect } from "react";

const CourseEnrollmentAlert = () => {
  const [courseCode, setCourseCode] = useState("");
  const [slotLetter, setSlotLetter] = useState("A");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({
    courseCode: false,
    phoneNumber: false,
  });

  // Reset message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const validatePhoneNumber = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const validateCourseCode = (code) => {
    return code.trim().length >= 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ courseCode: true, phoneNumber: true });
  
    if (!validateCourseCode(courseCode) || !validatePhoneNumber(phoneNumber)) {
      setMessage("Please correct the form errors.");
      setMessageType("error");
      return;
    }
  
    setIsLoading(true);
    setMessage("");
    setMessageType("");
  
    const formData = new FormData();
    formData.append("courseCode", courseCode);
    formData.append("slotLetter", slotLetter);
    formData.append("phoneNumber", phoneNumber);
  
    try {
      const response = await fetch("https://getform.io/f/bgdprlja", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
  
      if (response.ok) {
        setMessage("Alert successfully set!");
        setMessageType("success");
        setCourseCode("");
        setPhoneNumber("");
      } else {
        setMessage("Something went wrong. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      console.error(error);
      setMessage("Network error. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen  from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className=" rounded-xl shadow-2xl overflow-hidden">
          <div className=" px-6 py-5">
            <h2 className="text-2xl font-extrabold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              Course Enrollment Alert
            </h2>
            <p className="mt-1 text-blue-100">Get notified when course slots open up</p>
          </div>

          <div className="p-6">
            {message && (
              <div 
                className={`mb-4 p-3 rounded-lg flex items-start ${
                  messageType === "success" 
                    ? "bg-green-50 text-green-800 border border-green-200" 
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                <div className="flex-shrink-0">
                  {messageType === "success" ? (
                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{message}</p>
                </div>
                <button
  type="submit"
  disabled={isLoading}
  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ${
    isLoading ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  {isLoading ? "Submitting..." : "Set Alert"}
</button>

              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" method="POST" accept-charset="UTF-8" id="form">
              <div>
                <label htmlFor="courseCode" className="block text-sm font-medium text-white">
                  Course Code
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="courseCode"
                    placeholder="e.g., CS101"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    onBlur={() => setTouched({...touched, courseCode: true})}
                    className={`pl-10 block w-full pr-3 py-3 border ${
                      touched.courseCode && !validateCourseCode(courseCode)
                        ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                    } rounded-md shadow-sm bg-white/5 text-white focus:outline-none focus:ring-2 transition duration-150`}
                    required
                  />
                  {touched.courseCode && !validateCourseCode(courseCode) && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {touched.courseCode && !validateCourseCode(courseCode) && (
                  <p className="mt-1 text-xs text-red-600">Please enter a valid course code (at least 3 characters).</p>
                )}
              </div>

              <div>
                <label htmlFor="slotLetter" className="block text-sm font-medium text-white">
                  Slot Letter
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <select
                    id="slotLetter"
                    value={slotLetter}
                    onChange={(e) => setSlotLetter(e.target.value)}
                    className="pl-10 block w-full pr-3 py-3 border border-green-300 rounded-md bg-white/5  shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-indigo-500 transition duration-150 text-white "
                  >
                    {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                     <option
                     key={letter}
                     value={letter}
                     style={{ backgroundColor: '#1f2937', color: 'white' }} // Dark background for options
                   >
                     {letter}
                   </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-white">
                  Phone Number    <a 
    href="https://wa.me/14155238886?text=join%20volume-did" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="ml-2 text-green-500 font-semibold hover:underline"
  >
    DM +1 (415) 523-8886 - "volume-did"
  </a>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    id="phoneNumber"
                    placeholder="1234567890"
                    value={phoneNumber}
                    onChange={(e) => {
                      // Allow only numeric input
                      const value = e.target.value.replace(/\D/g, '');
                      setPhoneNumber(value);
                    }}
                    onBlur={() => setTouched({...touched, phoneNumber: true})}
                    maxLength={10}
                    className={`pl-10 block w-full pr-3 py-3 border ${
                      touched.phoneNumber && !validatePhoneNumber(phoneNumber)
                        ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 bg-white/5 focus:border-red-500"
                        : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                    } rounded-md bg-white/5 text-white shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-150`}
                    required
                  />
                  
                </div>
                
                <p className="mt-1 text-xs text-gray-200">We'll send SMS notifications to this number. </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#008b8b] hover:bg-[#19b06c]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Set Alert"
                  )}
                </button>
              </div>
            </form>

           <div className="mt-6 border-t border-gray-200 pt-4">
  <div className="flex items-start space-x-2 text-sm text-gray-700">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-blue-500 mt-0.5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
    <p className="text-white">
      You'll receive an SMS when a course is released.  
      
    </p>
  </div>
</div>

          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-gray-300">
          © {new Date().getFullYear()} Course Alert System • <a href="#" className="text-indigo-300 hover:text-indigo-500">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default CourseEnrollmentAlert;
