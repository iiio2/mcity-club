import { Helmet } from 'react-helmet-async'
import Featured from './featured/Index'
import Matches from './matches/Index'
import MeetPlayers from './meetPlayers/Index'
import Promotion from './promotion/Index'

function Home() {
  return (
    <>
      <Helmet>
        <title>MCity Club - Ultimate destination for football</title>
        <meta property="og:title" content="Home Page" />
      </Helmet>
      <Featured />
      <Matches />
      <MeetPlayers />
      <Promotion />
    </>
  )
}

export default Home
