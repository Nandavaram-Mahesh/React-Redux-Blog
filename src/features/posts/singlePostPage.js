import React from 'react'
import { useSelector } from 'react-redux'
import { TimeAgo } from '../../components/timeAgo'
import { PostAuthor } from './postAuthor'
import { selectPostById } from './postsSlice'

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params
  
  const post = useSelector(state => selectPostById(state,postId) )

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor userId={post.user}/>
        <p className="post-content">{post.content}</p>
        <TimeAgo timestamp={post.date}/>
      </article>
    </section>
  )
}