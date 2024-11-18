import React, { useReducer } from 'react';
import './BmiCalculator.css';


const initialState = {
  weight: '',
  height: '',
  bmi: null,
  status: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_WEIGHT':
      return { ...state, weight: action.payload };
    case 'SET_HEIGHT':
      return { ...state, height: action.payload };
    case 'SET_BMI':
      return { ...state, bmi: action.payload };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const BmiCalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { weight, height, bmi, status } = state;

  const calculateBMI = () => 
  {
    if (!weight || !height) 
    {
      alert('Please enter both weight and height!');
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    const bmiValue = (parseFloat(weight) / (heightInMeters * heightInMeters)).toFixed(2);
    dispatch({ type: 'SET_BMI', payload: bmiValue });

    let bmiStatus = '';
    if (bmiValue < 18.5) 
    {
      bmiStatus = 'Underweight';
    } 
    else if (bmiValue < 24.9) 
    {
      bmiStatus = 'Normal weight';
    } 
    else if (bmiValue < 29.9) 
    {
      bmiStatus = 'Overweight';
    } 
    else 
    {
      bmiStatus = 'Obesity';
    }

    dispatch({ type: 'SET_STATUS', payload: bmiStatus });
  };

  return (
    <div className='container'>
      <h1>BMI Calculator</h1>
      <div className='input-group'>
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => dispatch({ type: 'SET_WEIGHT', payload: e.target.value })}
            placeholder='Enter your weight'
          />
        </label>
      </div>
      <div className='input-group'>
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(e) => dispatch({ type: 'SET_HEIGHT', payload: e.target.value })}
            placeholder='Enter your height'
          />
        </label>
      </div>
      <button onClick={calculateBMI}>Calculate</button>
      {bmi && (
        <div className='result'>
          <h3>Your BMI: {bmi}</h3>
          <h3>Status: {status}</h3>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;
