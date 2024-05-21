import apiSlice from '../../app/apiSlice'

const quizzesApiSlice = apiSlice.injectEndpoints({
    endpoints:(build)=>({
        gatAllquizzes:build.query({
            query:()=>({
                url:'/api/quizzes'
            }),
            providesTags:['quizzes']
        }),
        gatAllActivequizzes:build.query({
            query:()=>({
                url:'/api/quizzes/active'
            }),
            providesTags:['quizzes']
        }),
        addQuiz:build.mutation({
            query:(quiz)=>({
                url: "/api/quizzes",
                method:"POST",
                body:quiz
            }),
            invalidatesTags:['quizzes']
        }),
        getAns:build.mutation({
            query:(quiz)=>({
                url: "/api/ans",
                method:"POST",
                body:quiz
            }),
            invalidatesTags:['quizzes']
        }),
        updateQuiz:build.mutation({
            query:(quiz) =>({
                url: "/api/quizzes",
                method: "PUT",
                body: quiz
            }),
            invalidatesTags: ["quizzes"]
        }),
        deleteQuiz:build.mutation({
            query:({_id}) =>({
                url: "/api/quizzes",
                method: "Delete",
                body: {_id}
            }),
            invalidatesTags: ["quizzes"]
        }),
        addQuestion:build.mutation({
            query:(quiz)=>({
                url:'/api/quizzes/questions',
                method:'POST',
                body:quiz
            }),
            invalidatesTags:['quizzes']
        }),
        updateQuestion:build.mutation({
            query:(quiz) =>({
                url: "/api/quizzes/questions",
                method: "PUT",
                body: quiz
            }),
            invalidatesTags: ["quizzes"]
        }),
        deleteQuestion:build.mutation({
            query:({ quizId,_id }) =>({
                url: "/api/quizzes/questions",
                method: "DELETE",
                body: { quizId,_id}
            }),
            invalidatesTags: ["quizzes"]
        }),
    })
})

export const {useGetAnsMutation,useGatAllquizzesQuery,useAddQuizMutation,useDeleteQuizMutation,useUpdateQuizMutation,useAddQuestionMutation,useDeleteQuestionMutation,useUpdateQuestionMutation,useGatAllActivequizzesQuery} = quizzesApiSlice