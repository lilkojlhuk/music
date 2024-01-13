import React from 'react'
import Link from 'next/link'
import st from './Header.module.scss'

const Header: React.FC = () => {
    return (
        <header>
            <nav className={st.navbar}>
                <div className='container'>
                    <div className={st.navbar__wrap}>
                        <Link href="/" className={st.menu__logo}>Spofity</Link>
                        <ul className={st.menu__list}>
                            <li className={st.menu__item}><Link href={'/tracks/create'} className={st.menu__item__link}>Загрузить</Link></li>
                            <li className={st.menu__item}><Link href={'/tracks'} className={st.menu__item__link}>Список треков</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header