import Head from 'next/head';
import { Inter } from 'next/font/google';
import FirstBanner from '@/components/FirstBanner';
import TerapiasHome from '@/components/terapy/TerapiasHomePage';
import PostsBlogHome from '@/components/ blog/PostsBlogHomePage';
import Testimonials from '@/components/comments/comments';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Ariana Terapias</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon3.ico" />
      </Head>
      <main className={inter.subsets}>
        <FirstBanner />:
        <TerapiasHome />
        <Testimonials />
        <PostsBlogHome />
      </main>
    </>
  );
}
