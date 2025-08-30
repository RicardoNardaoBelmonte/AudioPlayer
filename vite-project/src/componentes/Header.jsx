import hamburguerButton from '../assets/home/header/hamburguerButton.png';
import logo from '../assets/home/header/logo.png';

export function Header() {
    
    return(
        <header className='' >
            <nav className='h-20 flex items-center w-full'>
                <div className='mx-10 w-7 h-7'>
                    <button className=''><img src={hamburguerButton} alt="" /></button>
                </div>

                <div className='flex items-center gap-2 ml-140'>
                    <img src={logo} alt="" />
                    <span className='flex gap-2 text-primary text-base'>
                        <span className='text-primray'>Audio</span>{""}Player
                    </span>
                </div>
            </nav>
        </header>
    )
}