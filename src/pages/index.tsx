import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import LayoutComponent from '../components/layout'
import { languagesText } from '../services/languages'

const IndexPage = (props: any) => {
  const [ titleText, setTitleText ] = useState('Generator Password')
  useEffect(() => {
    const config = JSON.parse(localStorage.getItem('config')) || {}
    const lang = config.languageId || 'en'
    setTitleText(languagesText[lang].title)
  })

  return (
    <>
      <Head>
          <title>{titleText}</title>
          <meta name="robots" content="index, follow" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content={"Secure Password Generator"}/>
          <meta property="og:title" content="Secure Password Generator" />
          <meta property="og:description" content="Generate a secure password for you." />
          <meta property="og:image" content="lock-2.png" />
          <link rel="shortcut icon" href="favicon.ico"/>
          <script data-ad-client="ca-pub-9551612008461721" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </Head>
      <LayoutComponent />
    </>
  ) 
}

export default IndexPage;