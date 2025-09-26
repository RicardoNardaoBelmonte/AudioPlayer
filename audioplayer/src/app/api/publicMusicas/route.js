import fs from "fs";
import path from "path";

export async function GET() {
  const musicDir = path.join(process.cwd(), "public/musicas");
  const files = fs.readdirSync(musicDir);

  const musicas = files.map(file => ({
    nome: file.replace(".mp3", ""),
    path: `/musicas/${file}`,
  }));
  
  return Response.json(musicas);
}
