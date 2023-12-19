import { Typography } from '@mui/material'
import React from 'react'

const BlankSlateComment = () => {
  return (
    <>
        <Typography variant='h5' sx={{ mt: '40px' }}>Dieses Rezept wurde noch nicht bewertet</Typography>
        <Typography variant='body1'>Hast du es bereits ausprobiert? Dann freuen wir uns über deine Meinung!</Typography>
    </>
    )
}

export default BlankSlateComment