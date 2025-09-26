import proximoLeft from '../../../public/assets/home/header/proximoLeft.png';
import proximoRight from '../../../public/assets/home/header/proximoRight.png';
import playButton from '../../../public/assets/home/header/playButton.png';
import loop from '../../../public/assets/home/header/loop.png';
import capaMusica from '../../../public/assets/home/header/capaMusica.png';
import soundVolume from '../../../public/assets/home/header/soundVolume.png';
import estrela from '../../../public/assets/home/header/estrela.png';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

export function Footer() {

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

    
    return(
        <footer className='mx-15 bg-background pt-5 rounded-lg'>
            <div className="flex flex-col">
                <div className="flex items-center gap-45 mx-5">
                    <div className="flex gap-4 items-center">
                        <Image className='w-15 h-15' src={capaMusica} alt="" />
                        <div className='flex flex-col'>
                            <span className='text-white text-base'>a</span>
                            <span className='text-base text-gray-400'>Daft Punk</span>
                        </div>
                        <div>
                            <button  className='cursor-pointer'>
                                <Image className='' src={estrela} alt="" />
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-7 items-center">
                        <button  className='cursor-pointer'>
                            <Image className='w-5 h-5' src={loop} alt="" />
                        </button>

                        <button  className='cursor-pointer'>
                            <Image className='w-6 h-6' src={proximoLeft} alt="" />
                        </button>

                        <button className='cursor-pointer'>
                            <Image className='w-6 h-6' src={playButton} alt="" />
                        </button>

                        <button  className='cursor-pointer'>
                            <Image className='w-6 h-6' src={proximoRight} alt="" />
                        </button>
                    </div>

                    <div className='flex gap-20'>
                        <span className='text-sm text-white ml-20'>2:18 / 3:21</span>
                        <button  className='cursor-pointer'>
                            <Image className='w-6 h-6' src={soundVolume} alt="" />
                        </button>
                    </div>
                </div>

                <div id='barraTempo' className='h-[5px] w-full bg-white relative rounded mt-2'>
                    <div className='h-[5px] bg-primary w-230 absolute rounded z-10'></div>
                </div>
            </div>
        </footer>
    )
} 