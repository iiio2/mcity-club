import { CircularProgress } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Slide } from 'react-awesome-reveal'
import { Helmet } from 'react-helmet-async'
import { firebase, playersCollection } from '../../services/firebase'
import PlayerCard from '../../utils/playCard'
import { showErrorToast } from '../../utils/tools'

interface Player {
  id: string
  name: string
  lastname: string
  image: string
  number: number
  position: string
  url: string
}

function TheTeam() {
  const [loading, setLoading] = useState(true)
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    if (players.length === 0) {
      playersCollection
        .get()
        .then((snapshot) => {
          const playersData: any[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))

          const fetchPlayerUrls = playersData.map(player =>
            firebase
              .storage()
              .ref('players')
              .child(player.image)
              .getDownloadURL()
              .then(url => ({ ...player, url }))
              .catch(() => null),
          )

          Promise.all(fetchPlayerUrls)
            .then((playersWithUrls) => {
              setPlayers(playersWithUrls.filter(Boolean) as Player[])
            })
            .catch(() => {
              showErrorToast('Sorry, try again later')
            })
            .finally(() => {
              setLoading(false)
            })
        })
        .catch(() => {
          showErrorToast('Sorry, try again later')
        })
    }
  }, [players.length])

  const showPlayerByCategory = (category: string) => {
    if (players.length === 0)
      return null

    return players.map(player =>
      player.position === category
        ? (
            <Slide left key={player.id} triggerOnce>
              <div className="item">
                <PlayerCard
                  number={player.number}
                  name={player.name}
                  lastname={player.lastname}
                  bck={player.url}
                />
              </div>
            </Slide>
          )
        : null,
    )
  }

  return (
    <>
      <Helmet>
        <title>MCity Club - Team</title>
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
