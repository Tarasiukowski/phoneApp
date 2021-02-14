import type { AppProps } from 'next/app'
import '../style/globalStyle.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp