import {useState,useRef,useEffect} from "react";
import {db} from "../firebaseinit";
import { collection, doc ,setDoc,onSnapshot,deleteDoc} from "firebase/firestore"; 

export default function Blog(){

// const [title, setTitle] = useState("");
// const [content, setContent] = useState("");
const[formData,setFormData]=useState({title:"",content:""})
const [blogs,setBlogs] = useState([]);    
// const [blogs,dispatch]=useReducer(blogsReducer,[]);  this is also work but we import useReducer and write there function of the blogs and update the dispatch ....
const titleRef= useRef(null);

useEffect(()=>{
    titleRef.current.focus();
},[]);

useEffect(()=>{
    if(blogs.length && blogs[0].title){
        document.title=blogs[0].title;
    }
    else{
        document.title="No blogs!!"
    }
},[blogs]);

useEffect(()=>{
//     async function fetchData(){
//       const snapShot=await getDocs(collection(db,"blogs"));
//       console.log(snapShot);

//       const blogs=snapShot.docs.map((doc)=>{
//         return{
//             id: devicePixelRatio.id,
//             ...doc.data()
//         }
//       })
//       console.log (blogs);
//       setBlogs(blogs);
//     }
//     fetchData();

const unsub = onSnapshot(collection(db,"blogs"),(snapshot)=>{
    const blogs=onSnapshot.docs.map((doc)=>{
               return{
                    id: doc.id,
                     ...doc.data()
                 }
               })
               console.log (blogs);
            setBlogs(blogs);
})

},[]);

    async function handleSubmit(e){
        e.preventDefault();

        setBlogs([{title: formData.title,content: formData.content},...blogs]);  

// Add a new document with a generated id.
  const docRef = doc(collection(db, "blogs"))
  await setDoc(docRef, {
   title: formData.title,
   content: formData.content,
   createdOn:new Date()
  });
  
//   console.log("Document written with ID: ", docRef.id);

       setFormData({title:"", content:""});
       titleRef.current.focus();
        console.log(blogs);
    }

    async function removeBlog(id){


        // setBlogs(blogs.filter((blog,index)=>i!==index));
        const docRef =doc(db,"blogs",id);
       await deleteDoc(docRef);
    }

    return (
        <>
            <h1>Write a Blogs!</h1>
            <div className="main">
            <div className="section">
            <form onSubmit={handleSubmit}>
            <Row label="Title :">
                <input className="input"
                 placeholder= "Enter the title here..." 
                  value = {formData.title} 
                  ref={titleRef}
                   onChange ={(e)=>setFormData({title: e.target.value,content:formData.content})}/>
            </Row>
            <Row label="Content :">
                <input className="input"
                 placeholder= "content gose here..."               
                required 
                   value = {formData.content}
                    onChange={(e)=>setFormData({title:formData.title,content: e.target.value})}/>
            </Row>

               <button className ="btn">ADD</button>

            </form>
            </div>
            </div>
            <hr/>

            <h2>Blogs</h2>
            {blogs.map((blog,i) =>(
                <div className ="blog" key={i}>
                <h3>{blog.title}</h3>
                <hr/>
                <p>{blog.content}</p>

                <diV className="blog-btn"><button onClick= {()=> removeBlog(blog.id)} className="btn remove">Delete</button></diV>

                </div>
            ))}
            
       
           
        </>
    )
}

function Row(props){
    const{label}=props;
    return(
        <>
            <label>{label}<br/></label>
            {props.children}
            <hr/>
        </>
    )
}