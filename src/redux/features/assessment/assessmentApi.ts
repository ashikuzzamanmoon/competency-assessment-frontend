import { baseApi } from '../../api/baseApi';

const assessmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    startAssessment: builder.mutation({
      query: () => ({
        url: '/assessments/start',
        method: 'POST',
      }),
    }),
    submitAssessment: builder.mutation({
      query: ({ assessmentId, answers }) => ({
        url: `/assessments/submit/${assessmentId}`,
        method: 'POST',
        body: { answers },
      }),
    }),
  }),
});

export const { useStartAssessmentMutation, useSubmitAssessmentMutation } =
  assessmentApi;