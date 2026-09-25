import type { Match, WithId } from '../../types'
import { CircularProgress } from '@mui/material'
import { getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { matchesCollection, withIds } from '../../services/firebase'
import { isPlayed } from '../../types'
import { showErrorToast } from '../../utils/toasts'
import MatchesList from './MatchesList'
import LeagueTable from './Tables'

type PlayedFilter = 'All' | 'yes' | 'no'
type ResultFilter = 'All' | 'W' | 'L' | 'D'

function TheMatches() {
  const [matches, setMatches] = useState<WithId<Match>[] | null>(null)
  const [playedFilter, setPlayedFilter] = useState<PlayedFilter>('All')
  const [resultFilter, setResultFilter] = useState<ResultFilter>('All')

  useEffect(() => {
    getDocs(matchesCollection)
      .then(snapshot => setMatches(withIds(snapshot)))
      .catch(showErrorToast)
  }, [])

  const filterMatches = matches?.filter((match) => {
    if (playedFilter !== 'All')
      return isPlayed(match) === (playedFilter === 'yes')
    if (resultFilter !== 'All')
      return match.result === resultFilter
    return true
  })

  const showPlayed = (played: PlayedFilter) => {
    setPlayedFilter(played)
    setResultFilter('All')
  }

  const showResult = (result: ResultFilter) => {
    setResultFilter(result)
    setPlayedFilter('All')
  }

  return (
    <>
      <Helmet>
        <title>MCity Club - Matches</title>
        <meta property="og:title" content="Matches" />
      </Helmet>
      {matches
        ? (
            <div className="the_matches_container">
              <div className="the_matches_wrapper">
                <div className="left">
                  <div className="match_filters">
                    <div className="match_filters_box">
                      <div className="tag">Show Matches</div>
                      <div className="cont">
                        <div
                          className={`option ${
                            playedFilter === 'All' ? 'active' : ''
                          }`}
                          onClick={() => showPlayed('All')}
                        >
                          All
                        </div>
                        <div
                          className={`option ${
                            playedFilter === 'yes' ? 'active' : ''
                          }`}
                          onClick={() => showPlayed('yes')}
                        >
                          Played
                        </div>
                        <div
                          className={`option ${
                            playedFilter === 'no' ? 'active' : ''
                          }`}
                          onClick={() => showPlayed('no')}
                        >
                          Not Played
                        </div>
                      </div>
                    </div>
                    <div className="match_filters_box">
                      <div className="tag">Result games</div>
                      <div className="cont">
                        <div
                          className={`option ${
                            resultFilter === 'All' ? 'active' : ''
                          }`}
                          onClick={() => showResult('All')}
                        >
                          All
                        </div>
                        <div
                          className={`option ${
                            resultFilter === 'W' ? 'active' : ''
                          }`}
                          onClick={() => showResult('W')}
                        >
                          W
                        </div>
                        <div
                          className={`option ${
                            resultFilter === 'L' ? 'active' : ''
                          }`}
                          onClick={() => showResult('L')}
                        >
                          L
                        </div>
                        <div
                          className={`option ${
                            resultFilter === 'D' ? 'active' : ''
                          }`}
                          onClick={() => showResult('D')}
                        >
                          D
                        </div>
                      </div>
                    </div>
                  </div>
                  <MatchesList matches={filterMatches ?? []} />
                </div>
                <div className="right">
                  <LeagueTable />
                </div>
              </div>
            </div>
          )
        : (
            <div className="progress">
              <CircularProgress />
            </div>
          )}
    </>
  )
}

export default TheMatches
