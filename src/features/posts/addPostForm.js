import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from '../posts/postsSlice'
import { UploadImage } from '../../components/uploadImage'



export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  
  function handleImageChange(e) {
      const file = e.target.files[0]
      console.log(file)
      if (file) {
          const imageUrl = URL.createObjectURL(file);
          console.log(imageUrl)
          setImageUrl(imageUrl)
      }
  }


  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  function onSavePost() {
    if (title && content && imageUrl) {
      dispatch(postAdded(title, content,userId,imageUrl))
    }

    setTitle('')
    setContent('')
    setUserId('')
  }
  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={(e) => e.preventdefault()}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={(e)=>setUserId(e.target.value)}>
          <option value=""></option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <UploadImage handleImageChange={handleImageChange}/>
        <button type="button" onClick={onSavePost} disabled={!canSave}>Save Post</button>
      </form>
    </section>
  )
}