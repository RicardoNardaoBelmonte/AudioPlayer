// layout.js (Server Component)
import './globals.css';
import ReactQueryProvider from './ReactQuery.js';

export const metadata = {
  title: 'Audioplayer',
  description:
    'Audioplayer é um reprodutor de música onde você pode logar, escutar suas músicas favoritas e adicionar faixas à sua lista de favoritos.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
