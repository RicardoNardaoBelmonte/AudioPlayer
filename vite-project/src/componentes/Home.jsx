
import home from '../assets/home/header/home.png';
import estrelaApagada from '../assets/home/header/estrelaApagada.png';
import logoMaior from '../assets/home/header/logoMaior.png';//Imports de fotos que utilizei no Home depois so chamei elas no src dos elementos img
import botaoAdicionar from '../assets/home/header/botaoAdicionar.png';
import {Header} from '../componentes//Header.jsx';//Estou chamando o component criado do header 
import {Footer} from '../componentes//Footer.jsx';//Estou chamando o componente criado do Footer para chamar abaixo

export function Home() {

    const linkNav = [
        {icon: home, name: "Home"},
        {icon: estrelaApagada, name: "Favoritos"}
    ]

    return(
        <>
            <Header/> {/* Chamando component Header para aparecer primeiro no component Home onde estamos */}
            <section className='mx-15 mt-15 mb-15 h-[60vh] flex gap-20'>
                {/* Criei a section com margens e tamanho especifico para ficar bom o gap é entre a aside e a div */}
                <aside className='h-full w-50 bg-background p-1 rounded-lg'>
                    <nav className='h-full w-full'>
                        <ul className='flex flex-col gap-5 pt-10'>
                            {linkNav.map((item) => (
                                <li key={item.name} className='w-full h-10 pl-5 hover:bg-[#262626] transition-colors rounded'><a href="" className='flex gap-5 items-center w-full h-full'><img src={item.icon} className='w-4 h-4' alt="" /><span className='text-gray-400'>{item.name}</span></a></li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                {/* Criei a aside a div lateral para por os link fiz um map onde eu meio que passo por todos os itens da lista de objetos e para cada item eu chamo o respectivo nome e afins */}
                <div className='h-full w-full bg-background p-5 rounded-lg'>
                    <div>
                            <div className='flex items-center text-center justify-center font-bold'>
                                <h1 className='text-textPrimary text-2xl'>Bem vindo(a) ao</h1>
                                <img src={logoMaior} alt="" className='h-50 w-50'/>
                                <span className='flex gap-2 text-primary text-2xl'>
                                    <span className='text-primray text-2xl'>Audio</span>{""}Player
                                </span>
                            </div>

                            <div className='flex flex-col items-center text-center justify-center font-bold'>
                                <h2 className='text-textPrimary text-2xl w-100'>Clique no botão abaixo para adicionar suas músicas</h2>
                                <button className=''><img className='w-48 h-48 cursor-pointer rounded-full' src={botaoAdicionar} alt="" /></button>
                            </div>
                    </div>
                </div>
                {/* Criei a div que fica no centro Escrvendo os textos e colocando as cores basicamente tudo utilizando html e css aq so q com nome de classes do tailwind para não precisar por no index.css global */}
            </section>
            <Footer/> {/* Chamando component Footer para aparecer primeiro no component Home onde estamos */}
        </>
    )
}