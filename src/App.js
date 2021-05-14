import "./App.css";
import logo from "../src/Images/logo3.png";
import Post from "./Components/Post";
import post from "./Images/post.jpg";
import man from "./Images/man1.jpg";
import { useState, useEffect } from "react";
import { db, auth } from "./Firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { Input } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn]=useState(false);

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //  user has logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        // user has logged out
        setUser(null);
      }
    });

    return () => {
      //perform some cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

      setOpen(false);
  };

  const signIn = (event) =>{
    
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error.message))

    setOpenSignIn(false);
   
  }

  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img className="app__headerImage" src={logo} />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" color="primary" onClick={signUp}>
              Log-in
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img className="app__headerImage" src={logo} />
            </center>
           
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" color="primary" onClick={signIn}>
              Sign-In
            </Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img className="app__headerImage" src={logo} />
      </div>

      {user ? (
        <Button color="primary" onClick={() => auth.signOut()}>
          Log-Out
        </Button>
      ) : (
        <div className="app__loginContainer">
          <Button color="primary" onClick={() => setOpenSignIn(true)}>
            Sign-In
          </Button>
          <Button color="primary" onClick={() => setOpen(true)}>
            Sign-Up
          </Button>
        </div>
      )}

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
