import React from 'react';
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Grid } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { IconStyle } from '../theme/my-theme';

interface SharingProps {
  blogId: string,
  title: string;
}

const Sharing:React.FC<SharingProps> = ({blogId, title}) => {



  const emailSubject = `Neues Rezept ${title}`;
  const emailBody = `Ich habe dieses Rezept entdeckt und dachte, es könnte dich interessieren: ${window.location.href}`;
  const emailLink = `mailto:?subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBody)}`;

  const message = 'Ich habe dieses Rezept entdeckt und dachte, es könnte dich interessieren: ' + window.location.href;
  const phoneNumber = '';
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Grid container sx={{ m: '30px 0px 0px 0px' }}>
      <Grid item marginRight={'10px'}>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            window.location.href
          )}`}
          target="_blank" rel="noreferrer"
        >
          <FacebookSharpIcon style={IconStyle} sx={{ fontSize: 30 }} />
        </a>
      </Grid>
      <Grid item marginRight={'10px'}>
        <Link to={whatsappLink}>
          <WhatsAppIcon style={IconStyle} sx={{ fontSize: 30 }} />
        </Link>
      </Grid>
      <Grid item>
        <Link to={emailLink}>
        <AlternateEmailIcon style={IconStyle} sx={{ fontSize: 30 }} />
        </Link>
      </Grid>
    </Grid>
  );
};

export default Sharing;
