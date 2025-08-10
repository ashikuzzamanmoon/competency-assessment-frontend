import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { selectCurrentUser } from '../redux/features/auth/authSlice';
import { useStartAssessmentMutation } from '../redux/features/assessment/assessmentApi';

const HomePage = () => {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [startAssessment, { isLoading }] = useStartAssessmentMutation();

  const handleStartAssessment = async () => {
    try {
      const res = await startAssessment(undefined).unwrap();
      // প্রশ্ন এবং assessmentId সহ assessment পৃষ্ঠায় পাঠানো হচ্ছে
      navigate('/assessment', { state: { ...res.data } });
    } catch (error) {
      console.error('Failed to start assessment:', error);
      alert('Could not start the assessment. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {user?.name}!</h1>
        <p className="text-gray-600 mb-6">Your current highest level is: <span className="font-semibold text-blue-600">{user?.highestLevelAchieved || 'Not yet assessed'}</span></p>
        <button
          onClick={handleStartAssessment}
          disabled={isLoading}
          className="px-8 py-3 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400"
        >
          {isLoading ? 'Starting...' : `Start Assessment (Step ${user?.currentStep})`}
        </button>
      </div>
    </div>
  );
};

export default HomePage;