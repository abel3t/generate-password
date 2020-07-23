import { AppProps } from 'next/app'
import '../../public/css/style.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}