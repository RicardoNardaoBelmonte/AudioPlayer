"use client"
import {Header} from '../componentes/Header.js';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient  } from '@tanstack/react-query';
import Corpo from '../componentes/Corpo.js';
import { Footer } from '../componentes/Footer.js';
import delet from '../../../public/assets/home/header/delet.png';
import { useState } from 'react';
import PageMusic from '../componentes/pageMusic.js';

export default function Favs(){

    const queryClient = useQueryClient();
    const [active, setActive] = useState(false);
    const [currentMusic, setCurrentMusic] = useState(0); 
    const [play, setPlay] = useState(false); 

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

    const deletarMusica = useMutation({
        mutationFn: async (data) => {
            const token = localStorage.getItem('token');

            const res = await fetch("/api/musicas", {
                method: "DELETE",
                headers: {Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
                body: JSON.stringify(data)
            });

            const json = await res.json();
            if(!res.ok) throw new Error(json.error || "Erro ao remover música dos favoritos")
            return json;
        }, 
        onSuccess: () =>  {
            alert("Música removida dos favoritos"),
            queryClient.invalidateQueries({ queryKey: ['musicas'] });
        },
        onError: () =>  alert("Erro ao remover música dos favoritos")
    }) 

    return(
        <>
            <Header musicas={MusicasDb}/>
            {!active && <Corpo>
                <div className='grid grid-cols-12 items-center px-4 py-3 text-white border-b border-white text-base 2xl:text-xl'>
                    <div className="col-span-6">Título</div>
                    <div className="col-span-4">Arista</div>
                    <div className="col-span-2 text-right">Deletar</div>
                </div>

                {isLoading ? <span className='text-white flex text-center items-center justify-center mt-30 text-xl'>Carregando Musicas</span> : ''} 
                {isError ? <span className='text-white flex text-center items-center justify-center mt-30 text-xl'>Você precisa estar logado</span> : ''}

                <ul className='max-h-80 xl:max-h-96 2xl:max-h-[500] overflow-y-auto scrollbar-hide'>
                    {MusicasDb.map((musica, index) => (
                        <li key={index} >
                            <div  className='grid grid-cols-12 items-center p-5 hover:bg-borderGray mt-2 rounded-xl w-full'>
                                <div className='col-span-5'>
                                    <div className='flex tems-center items-center'>
                                        <button className='cursor-pointer flex gap-5' onClick={() => setActive(true)}>
                                            <Image className='rounded' src={musica.thumb} width={50} height={50} alt='thumb da musica'/>
                                            <div className='flex flex-col text-textPrimary'>
                                                <span className='text-white w-60 text-start overflow-hidden truncate text-xs xl:text-base'>{musica.titulo}</span>
                                                <span className='text-start'>{musica.duracao}</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className='col-span-6 w-70 overflow-hidden truncate text-textPrimary text-start'>
                                    <span className='text-center text-xs xl:text-base'>{musica.artista}</span>
                                </div>
                                <div className='col-span-1 text-textPrimary text-end'>
                                    <button onClick={() => deletarMusica.mutate(musica.id) } className='cursor-pointer'><Image className='rounded w-5 h-5' src={delet} alt='deletar musica'/></button>
                                </div> 
                            </div>
                        </li>
                    ))}
                </ul>
                    
            </Corpo>}
            {active ? (
                <PageMusic active={active} setActive={setActive} setCurrentMusic={setCurrentMusic} currentMusic={currentMusic} play={play} setPlay={setPlay}/>
            ) : (
                <Footer active={active} setActive={setActive} setCurrentMusic={setCurrentMusic} currentMusic={currentMusic} play={play} setPlay={setPlay}/>
            )}
        </>
    )
}