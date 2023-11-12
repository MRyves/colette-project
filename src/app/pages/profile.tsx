import { Avatar, Button } from '@mui/material';
import { User } from 'firebase/auth';
import React, { useState } from 'react'
import Blog from '../models/Blog';




interface ProfileProps {
    user: User | null;
  }

  
const Profile: React.FC<ProfileProps> = ({ user }) => {

    const [blog, setBlog] = useState<Blog | null>(null);
    
    return (
        <div>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
            <p>Hallo {blog?.author}</p>
            <p>Hier sind alle meine Einträge.</p>
        </div>
    )
}

export default Profile;