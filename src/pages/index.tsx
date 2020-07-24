import * as React from 'react'
import Head from 'next/head'

import LayoutComponent from '../components/layout'

const IndexPage = (props: any) => {
  return (
    <>
      <Head>
          <title>Generator Password</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content={"Secure Password Generator"}/>
          <link rel="shortcut icon" href="favicon.ico"/>
          <script async type='text/javascript' src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js' />
      </Head>
      <LayoutComponent />
    </>
  ) 
}

export default IndexPage;