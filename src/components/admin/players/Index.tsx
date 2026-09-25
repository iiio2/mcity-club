import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import AdminLayout from '../../../hoc/AdminLayout'
import { playersCollection } from '../../../services/firebase'
import { usePaginatedCollection } from '../../../utils/usePaginatedCollection'

function AdminPlayers() {
  const { items: players, loading, hasMore, loadMore } = usePaginatedCollection(playersCollection, 2)

  return (
    <>
      <Helmet>
        <title>MCity Club - Dashboard for Players</title>
        <meta property="og:title" content="Dashboard for Players" />
      </Helmet>
      <AdminLayout title="The players">
        <div className="mb-5">
          <Button
            disableElevation
            variant="outlined"
            component={Link}
            to="/admin_players/add_player"
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
              {players?.map(player => (
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
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Button
          variant="contained"
          color="primary"
          onClick={loadMore}
          disabled={loading || !hasMore}
        >
          {hasMore ? 'Load more' : 'No more players'}
        </Button>

        <div className="admin_progress">
          {loading
            ? (
                <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
              )
            : null}
        </div>
      </AdminLayout>
    </>
  )
}

export default AdminPlayers
