import React from 'react'
import {  useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllPosts } from './postsSlice'
import { PostAuthor } from './postAuthor'
import { TimeAgo } from '../../components/timeAgo'
import { ReactionButtons } from '../../components/postReactionButtons'
import { PostImage } from '../../components/postImage'


export const PostsLists = () => {

  const posts = useSelector(selectAllPosts)


  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))



  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {orderedPosts.map(post => (
        <>
          <article className="post-excerpt" key={post.id}>
            {post.image!=='' && <PostImage imageUrl={post.image}/>}
            <PostAuthor userId={post.user} />
            <h3>{post.title}</h3>

            <p className="post-content">{post.content}</p>
            <Link to={`/posts/${post.id}`} className="button muted-button">
              View Post
            </Link>
            <Link to={`/editPost/${post.id}`} className=" button">
              Edit Post
            </Link>
            <div>

              <TimeAgo timestamp={post.date} />
              <ReactionButtons post={post} />

            </div>
            {/* <buttton className=" ml-4 button muted-button"  onClick={()=>dispatch(postDeleted(post.id))}>Delete</buttton> */}
          </article>

        </>
      ))}
    </section>
  )
}