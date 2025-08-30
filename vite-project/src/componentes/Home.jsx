
import { Header } from './Header';
import home from '../assets/home/header/home.png';
import estrela from '../assets/home/header/estrela.png';

export function Home() {

    const linkNav = [
        {icon: home, name: "Home"},
        {icon: estrela, name: "Favoritos"}
    ]

    return(
        <>
            <Header/>
            <section className='mx-20 mt-15 h-[70vh]'>
                <aside className='h-full w-50 bg-background p-5 rounded-lg'>
                    <nav className='h-full w-full'>
                        <ul className='flex flex-col gap-5 pt-10 pl-5'>
                            {linkNav.map((item) => (
                                <li key={item.name} className='w-full h-10'><a href="" className='flex gap-5 items-center'><img src={item.icon} className='w-4 h-4' alt="" /><span className='text-gray-400'>{item.name}</span></a></li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <div>
                    
                </div>
            </section>
        </>
    )
}