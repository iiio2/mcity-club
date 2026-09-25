import type { Match, WithId } from '../../../types'
import { getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Slide } from 'react-awesome-reveal'
import { matchesCollection, withIds } from '../../../services/firebase'
import MatchesBlock from '../../../utils/matches_block'

function Blocks() {
  const [matches, setMatches] = useState<WithId<Match>[]>([])

  useEffect(() => {
    getDocs(matchesCollection)
      .then(snapshot => setMatches(withIds(snapshot)))
      .catch(() => {})
  }, [])

  return (
    <div className="home_matches">
      {matches.map(match => (
        <Slide direction="up" key={match.id} className="item" triggerOnce>
          <div>
            <div className="wrapper">
              <MatchesBlock match={match} />
            </div>
          </div>
        </Slide>
      ))}
    </div>
  )
}

export default Blocks
