import BlogForm, { BlogFormState } from '../components/blog-form';
import { useEffect, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase-config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


const Create = () => {
  const user = useSelector((state: RootState) => state.auth.currentUser)


  const [file, setFile] = useState<File | null>(null);
  const [uploadProcess, setUploadProcess] = useState<number>(0);
  const [imgUrl, setImageUrl] = useState<string>("");
  const navigate = useNavigate();

  const createBlogPost = async (form:BlogFormState) => {
    try {
      await addDoc(collection(db, "blogs"), {
          ...form,
          imgUrl,
          timestamp: serverTimestamp(),
          author: user?.displayName,
          userId: user?.uid
      });
      navigate("/");

    } catch (err) {
        console.log(err);
    }
  }



  useEffect(() => {
    const uploadFile = () => {
        if (file) {
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed", (snapshot) => {
                const process = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + process + "% done");
                setUploadProcess(process);
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            }, (error) => {
                console.log(error);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                  setImageUrl(downloadUrl);
                });
            });
        }
    };
    uploadFile();
}, [file]);


  return (
    <BlogForm user={user} setFile={setFile} submitForm={createBlogPost} uploadProcess={uploadProcess} />
  );
};

export default Create;
