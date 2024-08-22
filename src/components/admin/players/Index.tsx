import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@material-ui/core'
import { playersCollection } from '../../../services/firebase'
import AdminLayout from '../../../hoc/AdminLayout'
import { showErrorToast } from '../../../utils/tools'

const AdminPlayers = () => {
  const [lastVisible, setLastVisible] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [players, setPlayers] = useState<any[] | null>(null)

  useEffect(() => {
    if (!players) {
      setLoading(true)
      playersCollection
        .limit(2)
        .get()
        .then((snapshot) => {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1]
          const players = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setLastVisible(lastVisible)
          setPlayers(players)
        })
        .catch((error) => {
          showErrorToast(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [players])

  const loadMorePlayers = () => {
    if (lastVisible) {
      setLoading(true)
      playersCollection
        .startAfter(lastVisible)
        .limit(2)
        .get()
        .then((snapshot) => {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1]
          const newPlayers = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))

          setLastVisible(lastVisible)
          if (players) {
            setPlayers([...players, ...newPlayers])
          }
        })
        .catch((error) => {
          showErrorToast(error)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      showErrorToast('nothing to load')
    }
  }

  return (
    <>
      <Helmet>
        <title>MCity Club - Dashboard for Players</title>
      </Helmet>
      <AdminLayout title="The players">
        <div className="mb-5">
          <Button
            disableElevation
            variant="outlined"
            component={Link}
            to={'/admin_players/add_player'}
          >
            Add player
          </Button>
        </div>

        <Paper className="mb-5">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First name</TableCell>
                <TableCell>Last name</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players
                ? players.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell>
                        <Link to={`/admin_players/edit_player/${player.id}`}>
                          {player.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/admin_players/edit_player/${player.id}`}>
                          {player.lastname}
                        </Link>
                      </TableCell>
                      <TableCell>{player.number}</TableCell>
                      <TableCell>{player.position}</TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </Paper>

        <Button
          variant="contained"
          color="primary"
          onClick={() => loadMorePlayers()}
          disabled={loading}
        >
          Load more
        </Button>

        <div className="admin_progress">
          {loading ? (
            <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
          ) : null}
        </div>
      </AdminLayout>
    </>
  )
}

export default AdminPlayers
