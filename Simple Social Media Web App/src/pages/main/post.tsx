import { addDoc, getDocs ,collection, query, where, deleteDoc, doc, getDoc } from "firebase/firestore";
import {Post as IPost} from "./main"
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";


interface Props {
    post : IPost;
}

interface Like {
    likeId:string;
    userId : string;

}

//it will represent the indivdual posts
export const  Post = (props: Props) => {
    const { post} = props;
    const [user] = useAuthState (auth); //we imported this so that we can get the current user ID which will be used for "getLike"

    const [likes, setLikes] = useState <Like[] | null> (null);

    const likesRef = collection(db,"likes");

    const likesDoc = query(likesRef, where("postId","==",post.id)); // we use query to get the exactly required fields from the "likes" collection from the firebase

    const getLikes = async () => {
     const data=  await getDocs(likesDoc)
     setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id,})))};


    const addLike = async () => {
            try {
        const newDoc = await addDoc(likesRef,{userId: user?.uid , postId: post.id }) 
         //we will get post id from the prop that we 
         if (user) {
        setLikes((prev) => prev ? [...prev, {userId:user?.uid, likeId:newDoc.id }]
                                : [{ userId: user?.uid, likeId:newDoc.id}])    
    }   // from if(user), it is called optimistic rendering, it will change the data live without even reloading
}
        catch(err){
        console.log(err)
}
}
const removelike = async () => {
    try {
        const likeToDeleteQuery = query(likesRef, where("postId","==",post.id),
                                             where("userId", "==", user?.uid)); // we use query to get the exactly required fields from the "likes" collection from the firebase
        
    const likeToDeleteData = await getDocs(likeToDeleteQuery)                                         
    const likeId = likeToDeleteData.docs[0].id;
    const likeToDelete = doc(db,'likes',likeId );
    await deleteDoc(likeToDelete) 
 //we will get post id from the prop that we 
    if (user) {
    setLikes((prev) => prev &&prev.filter((like) => like.likeId !== likeId ))   
        }   // from if(user), it is called optimistic rendering, it will change the data live without even reloading
    }   catch(err){
console.log(err)
    }
}

    const hasUserLiked = likes?.find((like)=> like.userId === user?.uid )

    useEffect(()=>{
        getLikes();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
                <div className="title">
                    <h1>{post.title}</h1>
                </div>

                <div className="body">
                    <p> {post.description}</p>
                </div>
                
                <div className="footer">
                
                    <p> @{post.username}</p>
                    <button onClick={hasUserLiked ? removelike: addLike}>
                                    {hasUserLiked ? <> &#128078; </> : <>&#128077; </> } 
                    </button>
                    {likes && <p> Likes: {likes?.length}</p>}
                </div> 
        </div>
    )
}