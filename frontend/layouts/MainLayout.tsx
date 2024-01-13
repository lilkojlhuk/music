import Header from '@/components/Header/Header'
import Player from '@/components/Player/Player'
import Head from 'next/head'
import { title } from 'process';
import React, { ReactNode } from 'react'

interface MainLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
    keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, keywords }) => {
    return (
        <div>
            <Head>
                <title>{title || 'Ну типо спотифай'}</title> {/* Тут писать title */}
                <meta name='description' content={`Описание нашего спотифая ${description}`} /> {/* Тут писать descr */}
                <meta name='robots' content='index, follow' /> {/* Разрешает поисковым роботам индексировать страницу, follow разрешает индексировать ссылки */}
                <meta name='keywords' content={keywords || 'Spotify, Спотифай, Музыка'} /> {/* Ключевые слова */}
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <Header />
            {children}
            <Player />
        </div>
    )
}

export default MainLayout