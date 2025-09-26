"use client"
import {Header} from '../componentes/Header.js';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import Corpo from '../componentes/Corpo.js';
import { Footer } from '../componentes/Footer.js';

export default function Favs(){

        const {data: MusicasDb = [], isLoading, isError} = useQuery({
            queryKey: ['musicas'],
            queryFn: async () => {

                const token = localStorage.getItem('token');

                if (!token) throw new Error("Você precisa estar Logado");

                const res = await fetch('/api/musicas', {
                    headers: { Authorization: `Bearer ${token}`}
                });

                if(!res.ok) throw new Error("Erro ao buscar músicas do usuário");

                const musicas = await res.json();
                return musicas.musicas;
            }
        })

    return(
        <>
            <Header/>
            <Corpo>
                <div className='grid grid-cols-12 items-center px-4 py-3 text-white border-b border-white text-base'>
                    <div className="col-span-6">Título</div>
                    <div className="col-span-4">Artista</div>
                    <div className="col-span-2 text-right">⏱</div>
                </div>

                {isLoading ? <span className='text-white flex text-center items-center justify-center mt-30 text-xl'>Carregando Musicas</span> : ''} 
                {isError ? <span className='text-white flex text-center items-center justify-center mt-30 text-xl'>Você precisa estar logado</span> : ''}

                <ul className='max-h-96 overflow-y-auto scrollbar-hide'>
                    {MusicasDb.map((musica, index) => (
                        <li key={index} className='grid grid-cols-12 items-center p-5 cursor-pointer hover:bg-borderGray mt-2 rounded-xl'>
                            <div className='col-span-5'>
                                <div className='flex tems-center gap-5 items-center'>
                                    <Image className='rounded' src={musica.thumb} width={50} height={50} alt='thumb da musica'/>
                                    <span className='text-white w-60 overflow-hidden truncate'>{musica.titulo}</span>
                                </div>
                            </div>
                            <div className='col-span-6 w-70 overflow-hidden truncate text-textPrimary'>
                                <span className='text-center'>{musica.artista}</span>
                                <audio></audio>
                            </div>
                            <div className='col-span-1 text-textPrimary text-end'>
                                <span>{musica.duracao}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                    
            </Corpo>
            <Footer/>
        </>
    )
}