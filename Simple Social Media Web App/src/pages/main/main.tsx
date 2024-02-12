import { getDocs, collection, } from "firebase/firestore" //to get multimple docs frrom our db, collection for defining which collection you want 
import {db} from "../../config/firebase"
import { useEffect, useState } from "react";
import { Post } from "./post";

interface Post {
    title: string;
    id: string;
    userId: string;
    username: string;
    description: string;
}

export const Main = () => {
    const [postsList, setPostLists] = useState<Post[] | null >(null);
    const postsRef = collection(db, "posts");

    // Get data from Firebase real-time database 
    const getPosts = async() => {
        const data = await getDocs(postsRef)
        setPostLists(data.docs.map((doc)=> ({...doc.data(), id: doc.id })) as Post[] // sp we used "as Post" to define what kind of data it is , so first we made the interface on the top named as "Post" and defined things in it
        ) //even idk what shit is this, map function to get only the kind of data we rewuire form the firebase
    }   
    
    useEffect(() => {
        getPosts();
    },[]);
    
    
    return (
        <div>
            {postsList?.map((post)  => (<Post post={post} />))}
        </div>
    )
}


export { Post };

