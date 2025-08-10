/* eslint-disable @typescript-eslint/no-unused-vars */
import { baseApi } from "../../api/baseApi";
import { updateUserAssessmentStatus } from "../auth/authSlice";

const assessmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    startAssessment: builder.mutation({
      query: () => ({
        url: "/assessments/start",
        method: "POST",
      }),
    }),
    submitAssessment: builder.mutation({
      query: ({ assessmentId, answers }) => ({
        url: `/assessments/submit/${assessmentId}`,
        method: "POST",
        body: { answers },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(
              updateUserAssessmentStatus({
                highestLevelAchieved: data.data.newLevel,
                currentStep: data.data.newStep,
              })
            );
          }
        } catch (error) {
          // Do nothing on error
        }
      },
    }),
  }),
});

export const { useStartAssessmentMutation, useSubmitAssessmentMutation } =
  assessmentApi;
