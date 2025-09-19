import proximoLeft from '../../../public/assets/home/header/proximoLeft.png';
import proximoRight from '../../../public/assets/home/header/proximoRight.png';
import playButton from '../../../public/assets/home/header/playButton.png';
import loop from '../../../public/assets/home/header/loop.png';
import capaMusica from '../../../public/assets/home/header/capaMusica.png';
import soundVolume from '../../../public/assets/home/header/soundVolume.png';
import estrela from '../../../public/assets/home/header/estrela.png';
import Image from 'next/image';

export function Footer() {

    return(
        <footer className='mx-15 bg-background pt-5 rounded-lg'>
            <div className="flex flex-col">
                <div className="flex items-center gap-45 mx-5">
                    <div className="flex gap-4 items-center">
                        <Image className='w-15 h-15' src={capaMusica} alt="" />
                        <div className='flex flex-col'>
                            <span className='text-white text-base'>Get Lucky feat. Pharrell Williams and Nile Rodgers</span>
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