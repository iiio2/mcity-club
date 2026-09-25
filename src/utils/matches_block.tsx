import type { Match } from '../types'
import { isPlayed } from '../types'

function MatchesBlock({ match }: { match: Match }) {
  const played = isPlayed(match)

  return (
    <div className="match_block">
      <div className="match_date">{match.date}</div>
      <div className="match_wrapper">
        <div className="match_top">
          <div className="left">
            <div
              className="icon"
              style={{
                background: `url(/images/team_icons/${match.localThmb}.png)`,
              }}
            >
            </div>
            <div className="team_name">{match.local}</div>
          </div>
          <div className="right">{played ? match.resultLocal : '-'}</div>
        </div>
        <div className="match_bottom">
          <div className="left">
            <div
              className="icon"
              style={{
                background: `url(/images/team_icons/${match.awayThmb}.png)`,
              }}
            >
            </div>
            <div className="team_name">{match.away}</div>
          </div>
          <div className="right">{played ? match.resultAway : '-'}</div>
        </div>
      </div>
    </div>
  )
}

export default MatchesBlock
