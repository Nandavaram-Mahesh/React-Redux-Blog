import { createSlice, nanoid } from "@reduxjs/toolkit"
import { sub } from 'date-fns'

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!', date: sub(new Date(), { minutes: 10 }).toISOString(),reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0},image:'' },
    { id: '2', title: 'Second Post', content: 'More text', date: sub(new Date(), { minutes: 15 }).toISOString(),reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0},image:'' }
]
const postsSlice = createSlice(
    {
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action) => {
                state.push(action.payload)
            },
            prepare: (title, content, userId,imageUrl) => {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                        reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0},
                        image:imageUrl
                    }
                }
            }
        },
        postUpdated: (state, action) => {
            const { id, title, content } = action.payload
            const existingPost = state.find((post) => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
        

        // postDeleted:(state,action)=>{
        //     const {id} = action.payload
        //     console.log(id)
        //     // const existingPost = state.find((post)=>post.id===id)
        //     // const index = state.indexOf(id)
        //     // console.log(existingPost)
        //     // state.splice(,1)
        // },

    }
}
)


export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export default postsSlice.reducer

export const selectAllPosts = state => state.posts

export const selectPostById = (state, postId) =>
  state.posts.find(post => post.id === postId)