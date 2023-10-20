import PostList from './PostList'
import classes from './NewPost.module.css';
import { useState } from 'react';


function NewPost({onAddPost, onCancel}) {
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');
 

const changeBodyHandler = (event) => {
  setEnteredBody(event.target.value)
}
const changeAuthorHandler = (event) => {
  setEnteredAuthor(event.target.value)
}

const submitHandler = (event) => {
  event.preventDefault();
  const postData = {
    body: enteredBody,
    author: enteredAuthor
  };
  console.log(postData);
  onAddPost(postData);
  onCancel();
}

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={changeBodyHandler}/>
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={changeAuthorHandler}/>
      </p>
      <p className={classes.actions}>
        <button type='button' onClick={onCancel}>Cancel</button>
        <button>Submit</button>
        
      </p>
    </form>
  );
}

export default NewPost;