"use client"
import React from 'react';
import hamburguerButton from '../../../public/assets/home/header/hamburguerButton.png';
import logo from '../../../public/assets/home/header/logo.png';
import Image from 'next/image';

export function Header() {

    const [active, setActive] = React.useState(false);
    //Aqui criei o Header que pode ser chamado em outros componentes oq é bom já q vamos reutilizar ele
    //Então so importa e chama o componente que nem eu fiz na Home.jsx que ele ja aparece mesma coisa com o footer
    return(
        <header className='' >
            <nav className='h-18 flex items-center w-full'>
                <div className='mx-10 w-7 h-7'>
                    <button className='relative cursor-pointer' onClick={() => setActive(!active)}><Image className='h-5 w-5' src={hamburguerButton} alt="" /></button>
                        <ul className={`absolute left-0 mt-1 ml-5 w-40 rounded-2xl bg-background p-1 border-black border rounded z-50 transform transition-all duration-300 ease-in-out origin-top
                        ${active ? "opacity-100 scale-100 visible" : "opacity-0 scale-y-0 invisible"}`}>
                            <li className='hover:bg-[#262626] text-white px-3 rounded'><a href="">Arquivo</a></li>
                            <li className='hover:bg-[#262626] text-white px-3 rounded'><a href="">Editar</a></li>
                            <li className='hover:bg-[#262626] text-white px-3 rounded'><a href="">Exibir</a></li>
                            <li className='hover:bg-[#262626] text-white px-3 rounded'><a href="">Configurações</a></li>
                            <li className='hover:bg-[#262626] text-white px-3 rounded'><a href="">Ajuda</a></li>
                        </ul>
                </div>

                <div className='flex items-center gap-2 ml-140'>
                    <Image src={logo} alt="" />
                    <span className='flex gap-2 text-primary text-base'>
                        <span className='text-primray'>Audio</span>{""}Player
                    </span>
                </div>
            </nav>
        </header>
    )
}