/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, selectCurrentUser } from "../redux/features/auth/authSlice";
import { useStartAssessmentMutation } from "../redux/features/assessment/assessmentApi";
import Swal from "sweetalert2";

const HomePage = () => {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [startAssessment, { isLoading }] = useStartAssessmentMutation();

  const handleStartAssessment = async () => {
    try {
      const res = await startAssessment(undefined).unwrap();
      navigate("/assessment", { state: { ...res.data } });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error?.data?.message ||
          "Could not start the assessment. Please try again.",
      });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center bg-white p-8 rounded-lg shadow-md relative">
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2 mt-8">
          Welcome, {user?.name}!
        </h1>
        <p className="text-gray-600 mb-6">
          Your current highest level is:{" "}
          <span className="font-semibold text-blue-600">
            {user?.highestLevelAchieved || "Not yet assessed"}
          </span>
        </p>
        <button
          onClick={handleStartAssessment}
          disabled={
            isLoading || user?.currentStep === 0 || user?.currentStep === 4
          }
          className="px-8 py-3 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400"
        >
          {isLoading
            ? "Starting..."
            : user?.currentStep === 0
            ? "Assessment Failed"
            : user?.currentStep === 4
            ? "All Steps Completed"
            : `Start Assessment (Step ${user?.currentStep})`}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
