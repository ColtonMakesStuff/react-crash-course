import { useState } from 'react';
import PostList from './components/PostList'
import MainHeader from './components/MainHeader'

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const showModalHandler = (event) => {
    setModalIsVisible(true)
  }

  const hideModalHandler = (event) => {
    setModalIsVisible(false)
}


  return( <>
  <MainHeader onCreatePost={showModalHandler}/>
  <main>
<PostList isPosting={modalIsVisible} onStopPosting={hideModalHandler}/>
  </main>
  </>
  );
}
export default App;
