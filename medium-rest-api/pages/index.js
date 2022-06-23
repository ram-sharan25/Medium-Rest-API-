import Head from 'next/head'
import Image from 'next/image'
import { useState,useEffect } from 'react';
import styles from '../styles/Home.module.css';


export default function Home() {
const [error, setError]=useState(null);
const [isLoaded,setLoaded]=useState(false);
const [blogs,setBlogs]=useState([]);

useEffect(()=>{
  fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@still-ness")
  .then(res=>res.json())
  .then(
    data=>{
      setBlogs(data.items);
      setLoaded(true);
    },
    error=>{
      setError(error);
      setLoaded(true);
    }
  )
},[])

if (error){
  return <div>Error:{error.message}</div>
}
else if(!isLoaded){
  return <div>Loading....</div>
}
else{
  return(
    <div className={styles.page}>
      <h1 className={styles.heading}>Some Musings of Mine</h1>
      {blogs.map(item=>(
        <div key={item.pubDate}>
          <div className={styles.title}>{item.title}</div>
         { console.log(typeof(item.content))}
         <div className={styles.content} dangerouslySetInnerHTML={{ __html: item.content }}></div>
        </div>

      ))}
    </div>
  )
}
}


