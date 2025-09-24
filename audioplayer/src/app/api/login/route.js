import bcrypt from 'bcrypt';
import {buscarUsuario} from '../db.js';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function verifyToken(req) {
    const authHeader = req.headers.get("authorization");
  
    if (!authHeader) {
      return { error: "Token não encontrado", status: 401 };
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      return { payload }; 
    } catch (e) {
      return { error: "Token inválido ou expirado", status: 401 };
    }
  }

export async function POST(req){
    const {nome, senha} = await req.json();

    if(!nome || !senha ) return NextResponse.json({error: "É necessário preencher todos os campos"}, {status: 400});

    try{
        const user = await buscarUsuario(nome);

        if(!user) return NextResponse.json({error: "Usuário não encontrado"}, {status: 404});

        const senhaValidada = await bcrypt.compare(senha, user.senha);

        if(!senhaValidada) return NextResponse.json({error: "Senha incorreta!"}, {status: 401});

        const token = jwt.sign(
            {id: user.id, nome: user.nome},
            process.env.SECRET_KEY,
            {expiresIn: "24h"}
        );

        return NextResponse.json({ token }, { status: 200 });
      }catch(e){
        return NextResponse.json({message: e.message}, {status: 500});
    }
}