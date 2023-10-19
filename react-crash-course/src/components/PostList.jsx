import NewPost from './NewPost';
import Post from './Post';
import { useState } from 'react';
import classses from './PostList.module.css';
import Modal from './Modal';


const PostList = () => {
    const [enteredBody, setEnteredBody] = useState('');
    const [enteredAuthor, setEnteredAuthor] = useState('');
    const [modalIsVisible, setModalIsVisible] = useState(true);
   
const modalIsVisibleHandler = (event) => {
    setModalIsVisible(false)
}
 const changeBodyHandler = (event) => {
    setEnteredBody(event.target.value)
 }
 const changeAuthorHandler = (event) => {
    setEnteredAuthor(event.target.value)
 }
let modalContent
    return (
        <>  
        {modalIsVisible ? <Modal onClose={modalIsVisibleHandler} >
        <NewPost 
            onBodyChange={changeBodyHandler} 
            onAuthorChange={changeAuthorHandler}
            />
        </Modal>: null }
        <ul className={classses.posts}>
            <Post author={enteredAuthor} body={enteredBody}/>
            <Post author="Roma" body="is also dumb"/>
        </ul>
        </> 
    );
    }
     
    export default PostList;