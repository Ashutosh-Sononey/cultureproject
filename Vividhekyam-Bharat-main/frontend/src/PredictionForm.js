import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  User, 
  Briefcase, 
  Heart, 
  Train, 
  Plane, 
  Car, 
  DollarSign, 
  Calendar 
} from 'lucide-react';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    Occuption: '',
    marital: '',
    Number: '',
    Average: '',
    Money: '',
    Transport: ''
  });

  const [predictedState, setPredictedState] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formBody = new FormData();
    Object.keys(formData).forEach(key => {
      formBody.append(key, formData[key]);
    });

    try {
      const response = await fetch('/hi.html', {
        method: 'POST',
        body: formBody
      });

      const data = await response.text();
      // Extract predicted state from the response
      const stateMatch = data.match(/state1=([^"]+)/);
      if (stateMatch) {
        setPredictedState(stateMatch[1]);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center">
          <MapPin className="mr-2 text-blue-600" /> State Predictor
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 flex items-center">
                <Calendar className="mr-2 text-blue-500" /> Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter age"
              />
            </div>
            
            <div>
              <label className="block mb-2 flex items-center">
                <User className="mr-2 text-blue-500" /> Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 flex items-center">
              <Briefcase className="mr-2 text-blue-500" /> Occupation
            </label>
            <select
              name="Occuption"
              value={formData.Occuption}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Occupation</option>
              <option value="Employed">Employed</option>
              <option value="Student">Student</option>
              <option value="Retired">Retired</option>
              <option value="Home Maker">Home Maker</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 flex items-center">
              <Heart className="mr-2 text-blue-500" /> Marital Status
            </label>
            <select
              name="marital"
              value={formData.marital}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Marital Status</option>
              <option value="Married">Married</option>
              <option value="Unmarried">Unmarried</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 flex items-center">
                <DollarSign className="mr-2 text-blue-500" /> Money
              </label>
              <input
                type="number"
                name="Money"
                value={formData.Money}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount"
              />
            </div>
            
            <div>
              <label className="block mb-2 flex items-center">
                <Train className="mr-2 text-blue-500" /> Transport
              </label>
              <select
                name="Transport"
                value={formData.Transport}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Mode</option>
                <option value="Railways">Railways</option>
                <option value="Airways">Airways</option>
                <option value="Roadways">Roadways</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Number</label>
              <input
                type="number"
                name="Number"
                value={formData.Number}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter number"
              />
            </div>
            
            <div>
              <label className="block mb-2">Average Days</label>
              <input
                type="number"
                name="Average"
                value={formData.Average}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter average"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          >
            <MapPin className="mr-2" /> Predict State
          </button>
        </form>

        {predictedState && (
          <div className="mt-4 text-center bg-green-100 p-3 rounded-lg">
            <h3 className="text-xl font-semibold text-green-800">
              Predicted State: {predictedState}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionForm;

// App.js to set up routing
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PredictionForm from './PredictionForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PredictionForm />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;

// Note: You'll need to install the following dependencies:
// 1. react-router-dom
// 2. lucide-react
// 3. tailwindcss (for utility classes)

// Suggested setup commands:
// npm install react-router-dom lucide-react
// npx tailwindcss init