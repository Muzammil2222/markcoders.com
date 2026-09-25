import { useEffect } from 'react'
import { useLocation, matchPath } from 'react-router-dom'
import { caseStudiesData } from '../data/caseStudiesData'

const BRAND = 'MarkCoders'

const STATIC_TITLES = {
  '/': BRAND,
  '/about': `About Us - ${BRAND}`,
  '/services': `Services - ${BRAND}`,
  '/services/ui-ux': `UI/UX Design - ${BRAND}`,
  '/services/web-development': `Web Development - ${BRAND}`,
  '/services/api-integration': `API Integration - ${BRAND}`,
  '/services/app-development': `App Development - ${BRAND}`,
  '/services/cms-development': `CMS Development - ${BRAND}`,
  '/services/graphic-design': `Graphic Design - ${BRAND}`,
  '/case-studies': `Case Studies - ${BRAND}`,
  '/portfolio': `Portfolio - ${BRAND}`,
}

function resolveTitle(pathname) {
  if (STATIC_TITLES[pathname]) return STATIC_TITLES[pathname]

  const caseMatch = matchPath('/case-studies/:slug', pathname)
  if (caseMatch?.params?.slug) {
    const study = caseStudiesData[caseMatch.params.slug]
    const name = study?.title || study?.name || caseMatch.params.slug
    return `${name} - ${BRAND}`
  }

  return BRAND
}

/** Sets document.title from the current route. */
const DocumentTitle = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = resolveTitle(pathname)
  }, [pathname])

  return null
}

export default DocumentTitle
