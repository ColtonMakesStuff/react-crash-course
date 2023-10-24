import NewPost from './NewPost';
import Post from './Post';
import { useState } from 'react';
import classses from './PostList.module.css';
import Modal from './Modal';


const PostList = ({isPosting, onStopPosting}) => {
const [posts, setPosts] = useState([]);

const addPostHandler = (postData) => {
    setPosts((existingPosts) => [postData, ...existingPosts]);
}
    return (
        <>  
        {isPosting ? <Modal onClose={onStopPosting} >
        <NewPost 
           onAddPost={addPostHandler}
            onCancel={onStopPosting}
            />
        </Modal>: null }
        {posts.length > 0 && (
        <ul className={classses.posts}>
           {posts.map((post) => (
               <Post key={post.body} author={post.author} body={post.body}/>
           ))}
        </ul>
        )}
        {posts.length === 0 && <h3 className={classses.noPosts}>No posts yet. Start posting!</h3>}
        </> 
    );
    }
     
    export default PostList;