import React from 'react';
import useBlogs from '../hooks/useBlogs';

interface CookingProps {
  category: string;
}



const Cooking = () => {
  const {queryBlogs} = useBlogs();

  // useEffect(() => {
  //   queryBlogs({category: 'cooking'});
  // }, []);

  return (
    <div>Cooking</div>
  )
}




// const Cooking: React.FC<CookingProps> = ({ category }) => {
//   const {user} = useAuth();
//   const [ setLoading] = useState(true);
//   const [blogs, setBlogs] = useState<DocumentData[]>([]);
//   const filteredBlogs = blogs.filter((item) => item.category === category);

//   const handleDelete = async (id: any) => {
//     if (window.confirm("Are you sure wanted to delete that blog ?")) {
//       try {
//         setLoading(true);
//         await deleteDoc(doc(db, "blogs", id));
//         setLoading(false);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   return (
//     <div>
//       <Grid item xs={8}>
//       <Typography>Coming soon...</Typography>
//       {filteredBlogs.map((item) => (
//         <BlogSection blogs={blogs} user={user} handleDelete={handleDelete} category="Kochen" />
//         ))}
//       </Grid>
//     </div>
//   )
// }

export default Cooking
