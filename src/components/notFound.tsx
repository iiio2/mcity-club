import { Helmet } from 'react-helmet-async'

function NotFound() {
  return (
    <>
      <Helmet>
        <title>MCity Club - Not Found</title>
        <meta property='og:title' content='Not Found' />
      </Helmet>
      <div className="not_found_container">
        <div>Sorry :(</div>
        <div>Page not found</div>
      </div>
    </>
  )
}

export default NotFound
