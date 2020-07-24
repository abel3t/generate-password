import React, { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: any
  }
}

const Ads = ({ slotId, width, height }) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
    console.log(window.adsbygoogle)
  }, [])

  return (
    <ins
      className='adsbygoogle'
      data-ad-format="fluid"
      data-ad-layout-key="-fb+5w+4e-db+86"
      style={{ display: 'inline-block', width: `${width}px`, height: `${height}px` }}
      data-ad-client='ca-pub-6070398767421094'
      data-ad-slot={'7970819550/9447527430'} />
  )
}

export default Ads