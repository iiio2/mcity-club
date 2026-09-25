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
import { matchesCollection } from '../../../services/firebase'
import { isPlayed } from '../../../types'
import { usePaginatedCollection } from '../../../utils/usePaginatedCollection'

function AdminMatches() {
  const { items: matches, loading, hasMore, loadMore } = usePaginatedCollection(matchesCollection, 2)

  return (
    <>
      <Helmet>
        <title>MCity Club - Dashboard for Matches</title>
        <meta property="og:title" content="Dashboard for Matches" />
      </Helmet>
      <AdminLayout title="The matches">
        <div className="mb-5">
          <Button
            disableElevation
            variant="outlined"
            component={Link}
            to="/admin_matches/add_match"
          >
            Add match
          </Button>
        </div>

        <Paper className="mb-5">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Match</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Final</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {matches?.map(match => (
                <TableRow key={match.id}>
                  <TableCell>{match.date}</TableCell>
                  <TableCell>
                    <Link to={`/admin_matches/edit_match/${match.id}`}>
                      {match.local}
                      {' '}
                      <strong>-</strong>
                      {' '}
                      {match.away}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {match.resultLocal}
                    {' '}
                    <strong>-</strong>
                    {' '}
                    {match.resultAway}
                  </TableCell>
                  <TableCell>
                    {isPlayed(match)
                      ? (
                          <span className="matches_tag_red">Final</span>
                        )
                      : (
                          <span className="matches_tag_green">
                            Not played yet
                          </span>
                        )}
                  </TableCell>
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
          {hasMore ? 'Load more' : 'No more matches'}
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

export default AdminMatches
