import { DocumentData, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import BlogSection from '../components/blogsection';
import useAuth from "../context/auth-context";
import { Card, CardContent, Grid, TextField, Typography } from '@mui/material';

const Home = () => {
  const {user} = useAuth();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<DocumentData[]>([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "blogs"), 
      (snapshot) => {
        const list: DocumentData[] = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setBlogs(list);
        setLoading(false);
      }, 
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure wanted to delete that blog ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };



  console.log("blogs", blogs);

  return (
    <div>
      <Typography variant="h1">Welcome, foodlover!</Typography>
      <Typography>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.</Typography>
      <Typography variant="h2">Recently added</Typography>
      <Grid container spacing={5}>
        <Grid item xs={8}>
          <BlogSection blogs={blogs} user={user} handleDelete={handleDelete} />
        </Grid>
        <Grid item xs={4}>
          <TextField id="outlined-basic" label="Search" variant="outlined" />
          <Card>
            <CardContent component="div">
            <Typography>Coming soon...</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>


    </div>
  );
}

export default Home;
