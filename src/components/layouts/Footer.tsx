import { CityLogo } from '../../utils/tools'

const year = new Date().getFullYear()

function Footer() {
  return (
    <footer className="bck_blue">
      <div className="footer_logo">
        <CityLogo link={true} linkTo="/" width="70px" height="70px" />
      </div>
      <div className="footer_descl">
        Manchester City
        {' '}
        {year}
        . All Rights Reserved
      </div>
    </footer>
  )
}

export default Footer
