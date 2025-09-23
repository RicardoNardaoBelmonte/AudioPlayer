export const Modal = ({isOpen, closed, children}) => {
    if (!isOpen) return null;

    return(
        <div className='fixed bg-black/90 inset-0 flex flex-col items-center justify-center z-50'>
            <div className='flex justify-center bg-background p-10 rounded-lg relative min-h-96 min-w-96'>
                <button className='absolute top-2 right-2 p-3 cursor-pointer text-white text-lg hover:scale-110 transition-transform duration-400 smooth' onClick={closed}>X</button>
                {children}
            </div>
        </div>
    )
}