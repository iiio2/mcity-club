import type { Player, PlayerPosition, WithId } from '../../types'
import { CircularProgress } from '@mui/material'
import { getDocs } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { Slide } from 'react-awesome-reveal'
import { Helmet } from 'react-helmet-async'
import { playersCollection, storage, withIds } from '../../services/firebase'
import PlayerCard from '../../utils/playCard'
import { showErrorToast } from '../../utils/toasts'

type PlayerWithUrl = WithId<Player> & { url: string }

function TheTeam() {
  const [loading, setLoading] = useState(true)
  const [players, setPlayers] = useState<PlayerWithUrl[]>([])

  useEffect(() => {
    getDocs(playersCollection)
      .then(snapshot =>
        Promise.all(
          withIds(snapshot).map(player =>
            getDownloadURL(ref(storage, `players/${player.image}`))
              .then(url => ({ ...player, url }))
              .catch(() => null),
          ),
        ),
      )
      .then(playersWithUrls =>
        setPlayers(playersWithUrls.filter(player => player !== null)),
      )
      .catch(() => showErrorToast('Sorry, try again later'))
      .finally(() => setLoading(false))
  }, [])

  const showPlayerByCategory = (category: PlayerPosition) =>
    players
      .filter(player => player.position === category)
      .map(player => (
        <Slide direction="left" key={player.id} triggerOnce>
          <div className="item">
            <PlayerCard
              number={player.number}
              name={player.name}
              lastname={player.lastname}
              bck={player.url}
            />
          </div>
        </Slide>
      ))

  return (
    <>
      <Helmet>
        <title>MCity Club - Team</title>
        <meta property="og:title" content="Team" />
      </Helmet>
      <div className="the_team_container">
        {loading
          ? (
              <div className="progress">
                <CircularProgress />
              </div>
            )
          : (
              <div>
                <div className="team_category_wrapper">
                  <div className="title">Keepers</div>
                  <div className="team_cards">{showPlayerByCategory('Keeper')}</div>
                </div>

                <div className="team_category_wrapper">
                  <div className="title">Defence</div>
                  <div className="team_cards">
                    {showPlayerByCategory('Defence')}
                  </div>
                </div>

                <div className="team_category_wrapper">
                  <div className="title">Midfield</div>
                  <div className="team_cards">
                    {showPlayerByCategory('Midfield')}
                  </div>
                </div>

                <div className="team_category_wrapper">
                  <div className="title">Strikers</div>
                  <div className="team_cards">
                    {showPlayerByCategory('Striker')}
                  </div>
                </div>
              </div>
            )}
      </div>
    </>
  )
}

export default TheTeam
