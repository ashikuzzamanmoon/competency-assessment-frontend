/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSubmitAssessmentMutation } from '../../redux/features/assessment/assessmentApi';

const AssessmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { assessmentId, questions } = location.state || { questions: [] };

  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [submitAssessment, { isLoading }] = useSubmitAssessmentMutation();

  const handleOptionChange = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = async () => {
    const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswerIndex]) => ({
      questionId,
      selectedAnswerIndex,
    }));

    if (formattedAnswers.length !== questions.length) {
        alert('Please answer all questions before submitting.');
        return;
    }

    try {
        const res = await submitAssessment({ assessmentId, answers: formattedAnswers }).unwrap();
        alert(`Assessment Submitted! Your score is: ${res.data.score.toFixed(2)}%`);
        navigate('/');
    } catch (error) {
        console.error('Failed to submit assessment:', error);
        alert('Submission failed. Please try again.');
    }
  };

  if (!questions || questions.length === 0) {
    return (
        <div className="text-center p-8">
            <p>No questions found. Please start the assessment again.</p>
            <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Go to Dashboard</button>
        </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Assessment</h1>
      <div className="space-y-8">
        {questions.map((q: any, index: number) => (
          <div key={q._id} className="bg-white p-6 rounded-lg shadow">
            <p className="font-semibold mb-4">{index + 1}. {q.questionText}</p>
            <div className="space-y-2">
              {q.options.map((option: string, i: number) => (
                <label key={i} className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer">
                  <input
                    type="radio"
                    name={q._id}
                    value={i}
                    onChange={() => handleOptionChange(q._id, i)}
                    className="mr-3"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-12 py-4 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? 'Submitting...' : 'Submit Assessment'}
        </button>
      </div>
    </div>
  );
};

export default AssessmentPage;