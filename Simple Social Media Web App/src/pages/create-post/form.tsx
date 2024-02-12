import {useForm} from 'react-hook-form'
import * as yup from "yup"
import  {yupResolver} from "@hookform/resolvers/yup";
import {addDoc, collection} from "firebase/firestore"
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

interface CreateFormData  {
    title: string;
    description: string;
}


export const CreateForm = () => {

    const [user] = useAuthState(auth)
    const  navigate = useNavigate() //we will use this just after we done creating post

    const schema  = yup.object().shape({ 
        title: yup.string().required("Title is required"),
        description: yup.string().required("Add somethig to it")
    })
    

    const {register, handleSubmit, formState:{errors}} = useForm<CreateFormData>({
        resolver :yupResolver(schema)
    })

    const postsRef = collection(db,"posts");

    const onCreatePost = async (data:CreateFormData) => {
    await addDoc(postsRef,{
            title: data.title,
            description : data.description,
    // // another way to write this  function
    //         ...data,
            username : user?.displayName,
            userId : user?.uid, //it's the id that is used by the gooogle
        })
        navigate("/")
    }

    return(
        <form onSubmit={handleSubmit(onCreatePost)} className="create-form" >
            <input placeholder='Title' {...register("title")}   />
            <p> {errors.title?.message} </p>
            <input placeholder='Description'{...register("description")} />
            <p> {errors.description?.message} </p>
            <input type="submit" />
        </form>
    )
}
