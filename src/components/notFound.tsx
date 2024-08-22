import { Helmet } from 'react-helmet-async'

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>MCity Club - Not Found</title>
      </Helmet>
      <div className="not_found_container">
        <div>Sorry :(</div>
        <div>Page not found</div>
      </div>
    </>
  )
}

export default NotFound
