import type { Position, WithId } from '../../types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { positionsCollection, withIds } from '../../services/firebase'
import { showErrorToast } from '../../utils/toasts'

function LeagueTable() {
  const [positions, setPositions] = useState<WithId<Position>[]>([])

  useEffect(() => {
    getDocs(positionsCollection)
      .then(snapshot =>
        setPositions(withIds(snapshot).sort((a, b) => (b.pts ?? 0) - (a.pts ?? 0))),
      )
      .catch(showErrorToast)
  }, [])

  return (
    <div className="league_table_wrapper">
      <div className="title">League Table</div>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pos</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>W</TableCell>
              <TableCell>D</TableCell>
              <TableCell>L</TableCell>
              <TableCell>Pts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {positions.map((pos, i) => (
              <TableRow key={pos.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{pos.team}</TableCell>
                <TableCell>{pos.w}</TableCell>
                <TableCell>{pos.d}</TableCell>
                <TableCell>{pos.l}</TableCell>
                <TableCell>{pos.pts}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default LeagueTable
