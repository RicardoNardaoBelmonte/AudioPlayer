"use client"
import { useEffect, useState } from 'react';
import hamburguerButton from '../../../public/assets/home/header/hamburguerButton.png';
import logo from '../../../public/assets/home/header/logo.png';
import Image from 'next/image';
import {Modal} from '../hooks/Modal.js';
import { useMutation } from '@tanstack/react-query';

export function Header() {

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) setIsLogged(true);
        const nome = localStorage.getItem("nome");
        setNome(nome);
    }, [])

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [active, setActive] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [nome, setNome] = useState('');
    //Aqui criei o Header que pode ser chamado em outros componentes oq é bom já q vamos reutilizar ele
    //Então so importa e chama o componente que nem eu fiz na Home.jsx que ele ja aparece mesma coisa com o footer
    
    function LoginForm ({handleSubmit}) {
        const [loginData, setLoginData] = useState({ nome: "", senha: "" });
    
    return (
        <form className='flex flex-col gap-10 w-full' onSubmit={(e) => handleSubmit(e, "login", loginData)}>
            <h2 className='text-4xl font-bold text-center text-primary'>Login</h2>

            <input type="text" placeholder='Nome' className='p-2 border border-borderGray rounded text-white' value={loginData.nome} onChange={(e) => setLoginData({...loginData, nome: e.target.value})}/>

            <input type="password" placeholder='Senha' className='p-2 border border-borderGray rounded text-white' value={loginData.senha} onChange={(e) => setLoginData({...loginData, senha: e.target.value})}/>

            <button type='submit' className='bg-primary cursor-pointer text-white p-2 rounded hover:scale-110 transition-transform duration-300 smooth'>Submit</button>
        </form>
    )}

    function RegisterForm({handleSubmit}) {

        const [registerData, setRegisterData] = useState({ nome: "", senha: "" });
    
        return (
        <form className='flex flex-col gap-10 w-full' onSubmit={(e) => handleSubmit(e, "register", registerData)}>
            <h2 className='text-4xl font-bold text-center text-primary'>Registre-se</h2>

            <input type="text" placeholder='Nome e sobrenome' className='p-2 border border-borderGray rounded text-white' value={registerData.nome} onChange={(e) => setRegisterData({...registerData, nome: e.target.value})}/>

            <input type="password" placeholder='Senha' className='p-2 border border-borderGray rounded text-white' value={registerData.senha} onChange={(e) => setRegisterData({...registerData, senha: e.target.value})}/>

            <button type='submit' className='bg-primary cursor-pointer text-white p-2 rounded hover:scale-110 transition-transform duration-300 smooth'>Submit</button>
        </form>
    )}

    const loginMutation = useMutation({
        mutationFn: async (loginData) => {
          const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
          });
          const json = await res.json();
          if (!res.ok) throw new Error(json.error || "Erro ao fazer login");
          return json;
        },
        onSuccess: (data) => {
          localStorage.setItem("token", data.token);
          setIsLogged(true);
          setShowLogin(false);
          localStorage.setItem("nome", data.user.nome);
          setNome(data.user.nome);
          alert("Login realizado com sucesso");
        },
        onError: (e) => alert(e.message || "Erro ao fazer login"),
    });

    const registerMutation = useMutation({
        mutationFn: async (registerData) => {
          const res = await fetch("/api/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registerData),
          });
          const json = await res.json();
          if (!res.ok) throw new Error(json.error || "Erro ao registrar usuário");
          return json;
        },
        onSuccess: () => {
          alert("Usuário registrado com sucesso, faça o login");
          setShowRegister(false);
        },
        onError: (e) => alert(e.message || "Erro ao registrar usuário"),
    });


    function handleSair(e){
        e.preventDefault();
        setIsLogged(false);
        localStorage.removeItem("token");
        localStorage.removeItem("nome");
        setNome('');
    }

    function handleSubmit(e, type, data){
        e.preventDefault();

        if(type === "login"){
            loginMutation.mutate({nome: data.nome, senha: data.senha});
        }else if(type === "register"){
            registerMutation.mutate({nome: data.nome, senha: data.senha});
        }
    }
    
    
    return(
        <header className='w-full bg-background fixed top-0 left-0 z-50' >
            <nav className='h-20 flex items-center w-full justify-between'>
                <div className='ml-10 w-7 h-7'>
                    <button className='relative cursor-pointer' onClick={() => setActive(!active)}><Image className='h-6 w-6' src={hamburguerButton} alt="" /></button>
                        <ul className={`absolute left-0 mt-1 ml-5 w-40 rounded-2xl bg-background p-1 border-black border rounded z-50 transform transition-all duration-300 ease-in-out origin-top
                        ${active ? "opacity-100 scale-100 visible" : "opacity-0 scale-y-0 invisible"}`}>
                            <li className='hover:bg-[#262626] text-white px-3 rounded'><a href="">Arquivo</a></li>
                            <li className='hover:bg-[#262626] text-white px-3 rounded'><a href="">Editar</a></li>
                            <li className='hover:bg-[#262626] text-white px-3 rounded'><a href="">Exibir</a></li>
                            <li className='hover:bg-[#262626] text-white px-3 rounded'><a href="">Configurações</a></li>
                            <li className='hover:bg-[#262626] text-white px-3 rounded'><a href="">Ajuda</a></li>
                        </ul>
                </div>

                <div className='flex items-center gap-2'>
                    <Image src={logo} alt="" />
                    <span className='flex gap-2 text-primary text-base md:text-xl 2xl:text-2xl'>
                        <span className='text-primray'>Audio</span>{""}Player
                    </span>
                </div>


                {isLogged ? 
                    <div className='flex gap-5 text-white items-center mr-10'>
                        <span className='text-base md:text-xl'>{nome}</span>
                        <button onClick={handleSair} className='cursor-pointer bg-red-500 p-3 rounded text-base md:text-xl'>Sair</button>
                    </div>
                :
                    <div className='flex gap-5 mr-10'>
                        <button className='text-white bg-primary p-2 rounded cursor-pointer text-base md:text-xl' onClick={() => setShowLogin(true)}>Login</button>
                        <button className='text-white bg-green-600 p-2 rounded cursor-pointer text-base md:text-xl' onClick={() => setShowRegister(true)}>Register</button>
                    </div>
                }

                <Modal isOpen={showLogin} closed={() => setShowLogin(false)}>
                    <LoginForm  handleSubmit={handleSubmit}/>
                </Modal>
                <Modal isOpen={showRegister} closed={() => setShowRegister(false)}>
                    <RegisterForm  handleSubmit={handleSubmit}/>
                </Modal>
            </nav>
        </header>
    )
}