"use server"

import { NextResponse  } from "next/server";
import { criarMusica,  listarMusicas, deletarMusica } from "../db.js";
import { verifyToken } from "../login/route.js";

function msToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000); 
    const seconds = Math.floor((ms % 60000) / 1000); 
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export async function POST(req){
    try{
        const {musica, path} = await req.json();

        if(!musica || !path) return  NextResponse.json({error: "Música ou path não adicionados"}, {status: 400});

        const {payload, error, status} = verifyToken(req);
        if(error) return NextResponse.json({ error }, { status });

        const usuario_id = payload.id;

        const duracao = msToMinutesAndSeconds(musica.duracao);
        
        const musicId = await criarMusica(
            musica.nome, 
            musica.artista,
            path,
            musica.thumb,
            duracao,
            usuario_id,
        )
        
        return NextResponse.json({message: "Música adicionada com sucesso"}, {status: 201});
    }catch(e){
        return NextResponse.json({error: e.message}, {status: 500})
    }
}

export async function GET(req){

    try{
        const {payload, error, status} = verifyToken(req);

        if(error) return NextResponse.json({error}, {status});

        const idFromToken = payload.id;

        const musicas = await listarMusicas(idFromToken);
        
        return NextResponse.json({musicas}, {status: 200});
    }catch(e){
        return NextResponse.json({error: e.message}, {status: 500});
    }
}

export async function DELETE(req){

    try{

        const id = await req.json();
        const { payload, error, status} = verifyToken(req);

        if(error) return NextResponse.json({error}, {status});

        const idFromToken = payload.id;

        const musicaDeletada = deletarMusica(id, idFromToken);

        if (!musicaDeletada) return NextResponse.json({error: "Música não encontrada ou id do usuário não bate"}, {status: 404})
        
        return NextResponse.json({message: "Música deletada com sucesso"});
    }catch(e){
        return NextResponse.json({error: e.message}, {status: 500});
    }
}