import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import mcitylogo from '../resources/images/logos/manchester_city_logo.png'

interface CityLogoProps {
  width: string
  height: string
  link?: boolean
  linkTo?: string
}

export function CityLogo({ width, height, link, linkTo = '/' }: CityLogoProps) {
  const template = (
    <div
      className="img_cover"
      style={{
        width,
        height,
        background: `url(${mcitylogo}) no-repeat`,
      }}
    >
    </div>
  )

  if (link) {
    return (
      <Link className="link_logo" to={linkTo} aria-label="Home">
        {template}
      </Link>
    )
  }
  return template
}

interface TagProps {
  children: ReactNode
  bck?: string
  size?: string
  color?: string
  add?: CSSProperties
  link?: boolean
  linkTo?: string
}

export function Tag({ children, bck = '#ffffff', size = '15px', color = '#000000', add, link, linkTo = '/' }: TagProps) {
  const template = (
    <div
      style={{
        background: bck,
        fontSize: size,
        color,
        padding: '5px 10px',
        display: 'inline-block',
        fontFamily: 'Righteous',
        ...add,
      }}
    >
      {children}
    </div>
  )

  if (link) {
    return <Link to={linkTo}>{template}</Link>
  }
  return template
}
