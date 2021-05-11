import './App.css';
import logo from "../src/Images/logo3.png"
import Post from './Components/Post';
import post from "./Images/post.jpg"
import man from "./Images/man1.jpg"
import { useState, useEffect } from 'react';
import {db} from './Firebase'

function App() {

  const [posts, setPosts] = useState([])

  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc =>({
        id:doc.id,
        post:doc.data()
      })))
    })
  }, []);


  return (
    <div className="app">
     

      <div className="app__header">
        <img className="app__headerImage" src={logo}/>

      </div>

      {
        posts.map(({id,post }) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
      
    </div>
  );
}

export default App;
