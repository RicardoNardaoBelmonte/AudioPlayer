'use client'
import home from '../../../public/assets/home/header/home.png';
import estrelaApagada from '../../../public/assets/home/header/estrelaApagada.png';
import logoMaior from '../../../public/assets/home/header/logoMaior.png';//Imports de fotos que utilizei no Home depois so chamei elas no src dos elementos img
import botaoAdicionar from '../../../public/assets/home/header/botaoAdicionar.png';
import {Header} from '../componentes/Header.js';//Estou chamando o component criado do header 
import {Footer} from '../componentes/Footer.js';//Estou chamando o componente criado do Footer para chamar abaixo
import Image from 'next/image';
import { useState } from 'react';
import {Modal} from '../hooks/Modal.js';
import {buscarMusica} from '../api/fetchMusicas.js';

export default function Home() {

    const linkNav = [
        {icon: home, name: "Home"},
        {icon: estrelaApagada, name: "Favoritos"}
    ]

    const [isOpen, setIsOpen] = useState(false);
    const [musicas, setMusicas] = useState([]);

    async function handleSubmit(e, nomeMusica){
        e.preventDefault();

        if(!nomeMusica) return ;

        try{
            const resultados = await buscarMusica(nomeMusica);
            setMusicas(resultados);
        }catch(e){
            console.log('Erro ao buscar música:', e.message);
        }
    }  

    function FormModal({handleSubmit}){
        const [data, setData] = useState("");

        return(
            <div className='flex flex-col gap-15 w-full'>
                <form className='flex flex-col gap-10 w-full' onSubmit={(e) => handleSubmit(e, data)}>
                    <h2 className='text-2xl font-bold text-center text-primary'>Adicionar Música</h2>
                    <div className='flex gap-10'>
                        <input type='text' placeholder='Digite o nome da musica...' className='p-2 text-white border border-borderGray rounded w-full' value={data} onChange={(e) => setData(e.target.value)}/>
                        <button type='submit' className='p-2 bg-primary text-white cursor-pointer rounded hover:scale-110 transition-transform duration-300 smooth'>Enviar</button>
                    </div>
                </form>

            <div className='max-h-[300px] overflow-y-auto flex flex-col gap-5'>
                {musicas.map((musicas,index) => (
                        <div className='flex items-center gap-5 p-2 rounded border border-borderGray' key={index}>
                            <Image src={musicas.thumb} alt='Thumb da Musica' width={60} height={60}/>
                            <div className='flex flex-col gap-2'>
                                <span className='text-white font-semibold text-base truncate w-60'>{musicas.nome}</span>
                                <span className='text-white font-semibold text-base truncate w-60'>{musicas.artista}</span>
                            </div>
                            <button className='ml-5 p-1 bg-green-500 text-white cursor-pointer rounded'>
                                Adiconar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return(
        <>
            <Header/> {/* Chamando component Header para aparecer primeiro no component Home onde estamos */}
            <section className='mx-15 mt-15 mb-15 h-[60vh] flex gap-20'>
                {/* Criei a section com margens e tamanho especifico para ficar bom o gap é entre a aside e a div */}
                <aside className='h-full w-50 bg-background p-1 rounded-lg'>
                    <nav className='h-full w-full'>
                        <ul className='flex flex-col gap-5 pt-10'>
                            {linkNav.map((item) => (
                                <li key={item.name} className='w-full h-10 pl-5 hover:bg-[#262626] transition-colors rounded'><a href="" className='flex gap-5 items-center w-full h-full'><Image src={item.icon} className='w-4 h-4' alt="" /><span className='text-gray-400'>{item.name}</span></a></li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                {/* Criei a aside a div lateral para por os link fiz um map onde eu meio que passo por todos os itens da lista de objetos e para cada item eu chamo o respectivo nome e afins */}
                <div className='h-full w-full bg-background p-5 rounded-lg'>
                    <div>
                            <div className='flex items-center text-center justify-center font-bold'>
                                <h1 className='text-textPrimary text-2xl'>Bem vindo(a) ao</h1>
                                <Image src={logoMaior} alt="" className='h-50 w-50'/>
                                <span className='flex gap-2 text-primary text-2xl'>
                                    <span className='text-primray text-2xl'>Audio</span>{""}Player
                                </span>
                            </div>

                            <div className='flex flex-col items-center text-center justify-center font-bold'>
                                <h2 className='text-textPrimary text-2xl w-100'>Clique no botão abaixo para adicionar suas músicas</h2>
                                <button onClick={() => setIsOpen(!isOpen)} className=''><Image className='w-48 h-48 cursor-pointer rounded-full' src={botaoAdicionar} alt="" /></button>
                            </div>
                    </div>
                </div>
                {/* Criei a div que fica no centro Escrvendo os textos e colocando as cores basicamente tudo utilizando html e css aq so q com nome de classes do tailwind para não precisar por no index.css global */}
            </section>
            <Footer/> {/* Chamando component Footer para aparecer primeiro no component Home onde estamos */}
            <Modal isOpen={isOpen} closed={() => {setIsOpen(false); setMusicas([]);}}>
                <FormModal handleSubmit={handleSubmit}/>

            </Modal>
        </>
    )
}