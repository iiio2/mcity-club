import { Helmet } from 'react-helmet-async'
import Featured from './featured/Index'
import Matches from './matches/Index'
import MeetPlayers from './meetPlayers/Index'
import Promotion from './promotion/Index'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>MCity Club - Ultimate destination for football</title>
      </Helmet>
      <Featured />
      <Matches />
      <MeetPlayers />
      <Promotion />
    </>
  )
}

export default Home
