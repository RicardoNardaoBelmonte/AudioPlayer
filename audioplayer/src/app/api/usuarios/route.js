"use server"
import bcrypt from 'bcrypt';
import { NextResponse  } from "next/server";
import { criarUsuario, buscarUsuario, deletarUsuario } from "../db.js";

export async function POST(req){
    try{
        const {nome, senha} = await req.json();
        if(!nome || !senha) return NextResponse.json({error: "Nome ou senha são obrigatórios"}, {status: 400});

        const userParaInserir = await buscarUsuario(nome);

        const {nome: nomeExistente} = userParaInserir ?? {};

        if (nomeExistente) return NextResponse.json({error: "O Usuário já existe"},{status: 400});

        const senhaHash = await bcrypt.hash(senha, 10);

        const user = await criarUsuario(nome, senhaHash);
        return NextResponse.json({message: "Usuário criado com sucesso!", userId: user}, {status: 201});

    }catch(e){
        return NextResponse.json({error: e.message}, {status: 500})
    }
}
