import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../common/Card';
import { Button } from '../../common/Button';
import { Timer, AlertCircle } from 'lucide-react';

export function TestRunner() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  const questions = [
    {
      id: 1,
      text: "Explain the difference between React Context and Redux. When would you use one over the other?",
      type: "short_answer"
    },
    {
      id: 2,
      text: "What is the time complexity of QuickSort in the worst case? How can it be avoided?",
      type: "mcq",
      options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"]
    },
    {
      id: 3,
      text: "Describe the concept of 'Hoisting' in JavaScript with an example.",
      type: "short_answer"
    },
    {
      id: 4,
      text: "Which HTTP method is idempotent?",
      type: "mcq",
      options: ["POST", "PUT", "PATCH", "CONNECT"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswerChange = (value) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted answers:", answers);
    navigate('/results', { state: { score: 85, answers } }); // Mock score
  };

  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Technical Assessment</h2>
        <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-slate-700'}`}>
          <Timer className="h-6 w-6" />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        {questions.map((_, idx) => (
          <div 
            key={idx}
            className={`h-2 flex-1 rounded-full ${
              idx < currentQuestion ? 'bg-blue-600' : 
              idx === currentQuestion ? 'bg-blue-400' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm font-normal text-slate-500 uppercase tracking-wider">{questions[currentQuestion].type.replace('_', ' ')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg font-medium text-slate-900">{questions[currentQuestion].text}</p>
          
          {questions[currentQuestion].type === 'short_answer' ? (
            <textarea
              className="w-full min-h-[150px] p-4 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Type your answer here..."
              value={answers[questions[currentQuestion].id] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
            />
          ) : (
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, idx) => (
                <label key={idx} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                  <input
                    type="radio"
                    name={`q-${questions[currentQuestion].id}`}
                    value={option}
                    checked={answers[questions[currentQuestion].id] === option}
                    onChange={() => handleAnswerChange(option)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-slate-700">{option}</span>
                </label>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          {isLastQuestion ? (
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
              Submit Test
            </Button>
          ) : (
            <Button onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}>
              Next Question
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p>Please do not switch tabs or minimize the browser window. Doing so may result in automatic disqualification.</p>
      </div>
    </div>
  );
}
