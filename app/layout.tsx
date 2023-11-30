import { montserrat } from './ui/font';
import './ui/global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* asi llamo la fuente que importe */}
      <body className={`${montserrat.className} antialiased `}>
        {children}

      <footer className='py-10 flex justify-center '>
          Hecho con amor por Vercel
      </footer>
      </body>
    </html>
  );
}
