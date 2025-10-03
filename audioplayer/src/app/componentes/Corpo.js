"use client"
import estrelaApagada from '../../../public/assets/home/header/estrelaApagada.png';
import home from '../../../public/assets/home/header/home.png';
import estrela from '../../../public/assets/home/header/estrela.png'
import homeApagada from '../../../public/assets/home/header/homeApagada.png'
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';



export default function Corpo({children, activeLink, setActiveLink}){

    const pathname = usePathname(); // pega "/home" ou "/favs"
    const currentPath = pathname.replace('/', '') || 'home';

    const linkNav = [
        {icon: homeApagada, iconAtivo: home, name: "Home", path: "home"},
        {icon: estrelaApagada , iconAtivo: estrela , name: "Favoritos", path: "favs"}
    ]

    return(
        <section className='md:mx-5 xl:mx-15 mt-35 md:mt-30 mb-15 h-[60vh] flex gap-20 min-w-230'>
                {/* Criei a section com margens e tamanho especifico para ficar bom o gap é entre a aside e a div */}
                <aside className='h-full min-w-40 md:min-w-45 2xl:min-w-50 bg-background p-1 rounded-lg'>
                    <nav className='h-full w-full'>
                        <ul className='flex flex-col gap-5 pt-10'>
                            {linkNav.map((item) => (
                                <li key={item.name} className='w-full h-10 pl-5 hover:bg-[#262626] transition-colors rounded'><Link href={item.path} className='flex gap-5 items-center w-full h-full'><Image src={currentPath === item.path ? item.iconAtivo : item.icon } className='w-4 h-4' alt="" /><span className='text-gray-400 xs:text-xs text-base md:text-xl 2xl:text-2xl'>{item.name}</span></Link></li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                {/* Criei a aside a div lateral para por os link fiz um map onde eu meio que passo por todos os itens da lista de objetos e para cada item eu chamo o respectivo nome e afins */}
                <div className='h-full w-full bg-background p-5 rounded-lg '>
                    {children}
                </div>
                {/* Criei a div que fica no centro Escrvendo os textos e colocando as cores basicamente tudo utilizando html e css aq so q com nome de classes do tailwind para não precisar por no index.css global */}
            </section>
    )
}