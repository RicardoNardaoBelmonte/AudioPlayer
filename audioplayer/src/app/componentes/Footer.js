"use client"
import proximoLeft from '../../../public/assets/home/header/proximoLeft.png';
import proximoRight from '../../../public/assets/home/header/proximoRight.png';
import playButton from '../../../public/assets/home/header/playButton.png';
import loop from '../../../public/assets/home/header/loop.png';
import soundVolume from '../../../public/assets/home/header/soundVolume.png';
import estrela from '../../../public/assets/home/header/estrela.png';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useEffect , useRef, useState } from 'react';
import pause from '../../../public/assets/home/header/pause.png';

export function Footer({ active, setActive, setCurrentMusic, currentMusic, play, setPlay}) {

    const {data: publicMusicas = []} = useQuery({
        queryKey: ['publicMusicas'],
        queryFn: async () => {

            const res = await fetch('/api/publicMusicas',)

            if(!res.ok) throw new Error("Erro ao buscar músicas do usuário");
            const publicMusicas = await res.json();
            return publicMusicas;
        }
    })

    const {data: MusicasDb = []} = useQuery({
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

    const musicasComAudio = MusicasDb.map(m => {
        const arquivo = publicMusicas.find(p => p.nome.includes(m.path));
        return {
          ...m,
          path: arquivo?.path || null,
        };
    });

    const progress = useRef(null);
    const song = useRef(null);
    const playControl  = useRef(null);
    const [randomMusic, setRandomMusic] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (!song.current) return;
    
        song.current.pause();
        song.current.load();
    
        if (play) song.current.play();


    }, [currentMusic, play]);

    useEffect(() => {
        if (!song.current) return;
    
        const audio = song.current;
    
        // Função para atualizar o currentTime
        const updateProgress = () => setCurrentTime(audio.currentTime);
    
        // Atualiza imediatamente ao dar play, não espera o primeiro evento
        if (!audio.paused) {
            setCurrentTime(audio.currentTime);
        }
    
        // Adiciona listener
        audio.addEventListener('timeupdate', updateProgress);
    
        return () => audio.removeEventListener('timeupdate', updateProgress);
    }, [currentMusic, play]);
    
    
    
    function handleProgressChange(e) {
        const newTime = parseFloat(e.target.value);
        if(song.current) {
             song.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
    }

    function handlePlay(){
        setPlay(prev => {
            const newState = !prev;  
            if(newState){
                song.current.play();
            }else{
                song.current.pause();
            }

            return newState;
        });
    }

    function handleNext() {
        if(randomMusic){
            setCurrentMusic(Math.floor(Math.random() * musicasComAudio.length));
        } else {
            setCurrentMusic(prev => (prev + 1) % musicasComAudio.length);
        }
    }
    

    function handlePrev() {
        setCurrentMusic(prev => prev === 0 ? musicasComAudio.length - 1 : prev - 1);
    }
    
    function handleVolumeChange(e) {
        const newVolume = parseFloat(e.target.value); 
        setVolume(newVolume);
        if (song.current) song.current.volume = newVolume;
    }

    function handleRandomMusic() {
        setRandomMusic(prev => {
            const newRandom = !prev;
            if(newRandom && musicasComAudio.length > 0){
                setCurrentMusic(Math.floor(Math.random() * musicasComAudio.length));
            }
            return newRandom;
        });
    }
    
    function onEndedRandom(){
        if(randomMusic){
            setCurrentMusic(Math.floor(Math.random() * musicasComAudio.length));
        } else {
            setCurrentMusic(prev => (prev + 1) % musicasComAudio.length);
        }
    }

    return(
        <footer className='mx-5 xl:mx-15 bg-background pt-5 rounded-lg min-w-230'>
            <div className="flex flex-col">
                <div className="flex items-center justify-between mx-5">

                    {musicasComAudio[0]?.path && (
                        <audio onEnded={() => onEndedRandom()} ref={song} id='song'>
                            <source  src={musicasComAudio[currentMusic]?.path || ""} type="audio/mpeg"  />
                        </audio>
                    )}

                    <div className="flex gap-4 items-center">
                        {musicasComAudio.length > 0 ? (
                            <>
                            <button className='cursor-pointer' onClick={() => setActive(true)}>
                                <Image
                                    className="w-15 h-15 rounded-md"
                                    src={musicasComAudio[currentMusic]?.thumb || "/assets/default-cover.png"}
                                    alt={musicasComAudio[currentMusic]?.titulo || "Capa da música"}
                                    width={70}
                                    height={70}
                                />
                            </button>

                            <div className="flex flex-col">
                                <span className="text-white text-base w-60 truncate">
                                {musicasComAudio[currentMusic]?.titulo || "Título desconhecido"}
                                </span>
                                <span className="text-base text-gray-400 w-50 truncate">
                                {musicasComAudio[currentMusic]?.artista || "Artista desconhecido"}
                                </span>
                            </div>

                            <div>
                                <button className="cursor-pointer" aria-label='is favs'>
                                <Image className="" src={estrela} alt="Favoritar" />
                                </button>
                            </div>
                            </>
                        ): (
                            <span className="text-white text-base">Adicione suas músicas para começar a ouvir!</span>
                        )}
                    </div>

                    <div className="flex gap-10 items-center">
                        <button className="cursor-pointer" onClick={() => handleRandomMusic()} aria-label='random music'>
                            <Image className="w-5 h-5" src={loop} alt="aleatório" />
                        </button>

                        <button className="cursor-pointer" onClick={() => handlePrev()} aria-label='prev music'>
                            <Image className="w-6 h-6" src={proximoLeft} alt="Anterior" />
                        </button>

                        <button className="cursor-pointer" ref={playControl} onClick={() => handlePlay()} aria-label='pause and play'>
                            <Image className="w-10 h-10" src={ play ? pause : playButton} alt="Play" />
                        </button>

                        <button className="cursor-pointer" onClick={() => handleNext()} aria-label='next music'>
                            <Image className="w-6 h-6" src={proximoRight} alt="Próxima" />
                        </button>
                    </div>

                    <div className="flex gap-10 items-center">
                        <span className="text-sm text-white">
                            {musicasComAudio[currentMusic]?.duracao || "--:--"}
                        </span>
                        
                        <div className='relative group flex items-center w-20 mr-6'>
                            <button className="cursor-pointer relative flex items-center gap-2" aria-label='sound-music'>
                                <Image className="w-6 h-6" src={soundVolume} alt="Volume" />
                            </button>
                            <input alt='sound volume bar' type="range" min={0} max={1} step={0.01} value={volume} onChange={handleVolumeChange} className="absolute opacity-0 group-hover:opacity-100 ml-8" id='volume'/>
                        </div>
                    </div>
                </div>

                <input alt='music progress' type='range' min={0} max={song.current?.duration || 0} step={0.01} value={currentTime} className='mt-3' id='progress' ref={progress} onChange={handleProgressChange}/>
            </div>
        </footer>
    )

} 