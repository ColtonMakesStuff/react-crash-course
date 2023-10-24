import { MdPostAdd, MdMessage } from 'react-icons/md';

import classes from './MainHeader.module.css';

function MainHeader({ onCreatePost, onLogin, onLogout }) {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdMessage />
        React Poster
      </h1>
      <p>
        <button className={classes.button} onClick={onLogin}>
          <MdPostAdd size={18} />
          New Post
        </button>
      </p>
    </header>
  );
}

export default MainHeader;

// import { MdPostAdd, MdMessage } from 'react-icons/md';

// import classes from './MainHeader.module.css';

// function MainHeader({ onCreatePost }) {
//   let loggedIn = true;
//   let loginOutbutton
//   if (!loggedIn) {
//     loginOutbutton = <button className={classes.login} onClick={onLogin}> Login </button>;
//   } else {
//      loginOutbutton = <button className={classes.login} onClick={onLogout}> Logout </button>;
//   }

//   return (
//     <header className={classes.header}>
//       <h1 className={classes.logo}>
//         <MdMessage />
//         React Poster
//       </h1>
//       <p>
//         {loginOutbutton}
//       </p>
//     </header>
//   );
// }

// export default MainHeader;