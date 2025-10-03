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
import Corpo from '../componentes/Corpo';
import { useMutation } from '@tanstack/react-query';

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
                {musicas.map((musica,index) => {

                    const path = musica.nome.toLowerCase().replace(/\s+/g, '');
                    console.log(musica);
                    return (
                        <div className='flex items-center gap-5 p-2 rounded border border-borderGray' key={index}>
                            <Image src={musica.thumb} alt='Thumb da Musica' width={60} height={60}/>
                            <div className='flex flex-col gap-2'>
                                <span className='text-white font-semibold text-base truncate w-60'>{musica.nome}</span>
                                <span className='text-white font-semibold text-base truncate w-60'>{musica.artista}</span>
                            </div>
                            <button onClick={() => adicionarMutation.mutate({musica, path})} className='ml-5 p-1 bg-green-500 text-white cursor-pointer rounded'>
                                Adiconar
                            </button>
                        </div>
                    )
                    })}
                </div>
            </div>
        )
    }

    const adicionarMutation = useMutation({
        mutationFn: async (data) => {
          const token = localStorage.getItem("token");

          const res = await fetch("/api/musicas", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`,  "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          const json = await res.json();
          if (!res.ok) throw new Error(json.error || "Erro ao buscar músicas");
          return json;
        },
        onSuccess: () => alert("Música adicionada com sucesso"),
        onError: (e) => alert(e.message || "Erro ao buscar músicas"),
    });

    return(
        <>
            <Header/> {/* Chamando component Header para aparecer primeiro no component Home onde estamos */}
            <Corpo>
                <div className='flex items-center text-center justify-center font-bold'>
                        <h1 className='text-textPrimary md:text-base xl:text-2xl 2xl:text-4xl'>Bem vindo(a) ao</h1>
                        <Image src={logoMaior} alt="" className='h-50 w-50'/>
                        <span className='flex gap-2 text-primary md:text-base xl:text-2xl 2xl:text-4xl'>
                            <span className='text-primray md:text-base xl:text-2xl 2xl:text-4xl'>Audio</span>{""}Player
                        </span>
                    </div>

                    <div className='flex flex-col items-center text-center justify-center font-bold'>
                        <h2 className='text-textPrimary md:text-base xl:text-2xl 2xl:text-4xl w-100'>Clique no botão abaixo para adicionar suas músicas</h2>
                        <button onClick={() => setIsOpen(!isOpen)} className=''><Image className='md:w-35 md:h-35 xl:w-48 xl:h-48 2xl:w-70 2xl:h-70 cursor-pointer rounded-full' src={botaoAdicionar} alt="" /></button>
                </div>
            </Corpo>
            <Footer/> {/* Chamando component Footer para aparecer primeiro no component Home onde estamos */}
            <Modal isOpen={isOpen} closed={() => {setIsOpen(false); setMusicas([]);}}>
                <FormModal handleSubmit={handleSubmit}/>

            </Modal>
        </>
    )
}