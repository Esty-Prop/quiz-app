import apiSlice from '../../app/apiSlice'

const userQuizApiSlice = apiSlice.injectEndpoints({
    endpoints:(build)=>({
        gatAllUserquizzes:build.query({
            query:()=>({
                url:'/api/userQuizzes'
            }),
            providesTags:['userQuiz']
        }),
        gatAdminOverview:build.query({
            query:()=>({
                url:'/api/userQuizzes/overview'
            }),
            providesTags:['userQuiz']

        }),
        gatUserquizById:build.query({
            query:(id)=>({
                url:`/api/userQuizzes/${id}`
            }),
            providesTags:['userQuiz']
        }),
        addUserQuiz:build.mutation({
            query:(quiz)=>({
                url: "/api/userQuizzes",
                method:"POST",
                body:quiz
            }),
            invalidatesTags:['userQuiz']
        }),
        getAllUserQuizByUser:build.mutation({
            query:(quiz)=>({
                url: "/api/userQuizzes/user",
                method:"POST",
                body:quiz
            }),
        }),
        getAllUserQuizByQuiz:build.mutation({
            query:(quiz)=>({
                url: "/api/userQuizzes/quiz",
                method:"POST",
                body:quiz
            }),
        }),
        addAnswers:build.mutation({
            query:(ans)=>({
                url: "/api/userQuizzes/answers",
                method:"POST",
                body:ans
            }),
            invalidatesTags:['userQuiz']
        }),
        updateUserQuiz:build.mutation({
            query:(quiz) =>({
                url: "/api/userQuizzes",
                method: "PUT",
                body: quiz
            }),
            invalidatesTags: ["userQuiz"]
        }),
        deleteUserQuiz:build.mutation({
            query:({_id}) =>({
                url: "/api/userQuizzes",
                method: "Delete",
                body: {_id}
            }),
            invalidatesTags: ["userQuiz"]
        }),
        // addQuestion:build.mutation({
        //     query:(quiz)=>({
        //         url:'/api/quizzes/questions',
        //         method:'POST',
        //         body:quiz
        //     }),
        //     invalidatesTags:['quizzes']
        // }),
        // updateQuestion:build.mutation({
        //     query:(quiz) =>({
        //         url: "/api/quizzes/questions",
        //         method: "PUT",
        //         body: quiz
        //     }),
        //     invalidatesTags: ["quizzes"]
        // }),
        // deleteQuestion:build.mutation({
        //     query:({ quizId,_id }) =>({
        //         url: "/api/quizzes/questions",
        //         method: "DELETE",
        //         body: { quizId,_id}
        //     }),
        //     invalidatesTags: ["quizzes"]
        // }),
    })
})

export const {useGatAdminOverviewQuery,useGetAllUserQuizByQuizMutation,useGetAllUserQuizByUserMutation,useGatAllUserquizzesQuery,useAddUserQuizMutation,useDeleteUserQuizMutation,useUpdateUserQuizMutation,useAddAnswersMutation,useGatUserquizByIdQuery} = userQuizApiSlice