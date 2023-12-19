import React from 'react';
import { Typography } from '@mui/material';
import { MainContainer } from '../theme/my-theme';


const Imprint = () => {

  return (
    <MainContainer maxWidth='lg'>
        <Typography variant='h1'>Impressum</Typography>
        <Typography variant='h2'>Für den Inhalt dieser Website verantwortlich:</Typography>
        <Typography variant='body1'>Chuchiblog</Typography>
        <Typography variant='h2'>Disclaimer</Typography>
        <Typography variant='body1'>Personen, welche auf dieser Website Informationen abrufen, erklären sich mit den nachstehenden Bedingungen einverstanden.</Typography>
        <Typography variant='h2'>Benutzung der Website</Typography>
        <Typography variant='body1'>Chuchiblog unternimmt alle Anstrengungen, um einen sicheren Betrieb der Website sicherzustellen. Dennoch können Mängel wie z.B. Datenverlust oder -verfälschung, Virenbefall, Betriebsunterbruch etc. nicht gänzlich ausgeschlossen werden. Der Zugriff auf die Website erfolgt deshalb auf eigene Gefahr und in eigener Verantwortung.</Typography>
        <Typography variant='h2'>Haftungsausschluss</Typography>
        <Typography variant='body1'>Chuchiblog lehnt jegliche Haftung für Schäden oder Folgeschäden ab, die sich aus dem Zugriff auf die Website beziehungsweise auf einzelne Teile davon (wie z.B. heruntergeladene Dokumente), deren Benutzung (bzw. aus  der Unmöglichkeit des Zugriffs oder der Benutzung) oder Links auf andere Websites ergeben.</Typography>
        <Typography variant='h2'>Gewährleistungsausschluss</Typography>
        <Typography variant='body1'>Chuchiblog verwendet all ihre Sorgfalt darauf, dass die Informationen auf der Website zum Zeitpunkt der Veröffentlichung korrekt und aktuell sind und keine Rechte Dritter (insbesondere Rechte des Persönlichkeitsschutzes) verletzen. Dennoch kann Chuchiblog keine Gewährleistung hinsichtlich der Genauigkeit, Zuverlässigkeit oder Vollständigkeit der Informationen sicherstellen.</Typography>
        <Typography variant='h2'>Urheberrecht</Typography>
        <Typography variant='body1'>Der gesamte Inhalt (Texte, Grafiken, Bilder etc.) dieser Website ist urheberrechtlich geschützt und gehört, soweit nicht anders bestimmt, ausschliesslich und umfassend dem Chuchiblog. Es ist nicht erlaubt, ohne vorgängige schriftliche Erlaubnis, diese Website ganz oder teilweise zu reproduzieren, zu übertragen (sei dies auf elektronischem oder irgendeinem anderen Weg), zu verändern oder sie für öffentliche oder kommerzielle Zwecke zu nutzen. Teile des Inhalts wurden mithilfe von ChatGPT, einem KI-Modell entwickelt von OpenAI, erstellt.</Typography>
        <Typography variant='h2'>Anwendbares Recht und Gerichtsstand</Typography>
        <Typography variant='body1'>Für allfällige Streitigkeiten zwischen Besucher und Nutzer dieser Website und Chuchiblog, welche aus dem Betrieb bzw. Besuch dieser Website herrühren, sind die Gerichte am Sitz des Chuchiblog zuständig. Anwendbar ist ausschliesslich Schweizer Recht.</Typography>
    </MainContainer>
  );
};

export default Imprint;
