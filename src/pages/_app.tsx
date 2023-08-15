import { Roboto } from '@next/font/google';
import type { AppProps } from 'next/app';
import { globalStyles } from '../styles/global';
import logo from '../assets/logo.svg'
import Image from "next/image"
import { Container, Header } from '../styles/pages/app';
globalStyles();

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image alt='' src={logo.src} width={logo.width} height={logo.height}/>
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}