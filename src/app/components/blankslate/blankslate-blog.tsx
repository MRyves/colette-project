import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { ReadmoreButton } from '../../theme/my-theme'

const BlankSlate = () => {
  return (
    <>
        <Typography variant="h2">Es wurden noch keine Rezepte erfasst</Typography>
        <Typography variant="body1" sx={{mb: '30px'}}>Willst du das ändern? Dann los!</Typography>
        <Link to={`/create`}>
        <ReadmoreButton variant='outlined' disableElevation>Erfasse dein erstes Rezept</ReadmoreButton>
        </Link>
    </>
    )
}

export default BlankSlate