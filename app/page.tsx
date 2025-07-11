import Image from "next/image";
import { Navigation, About, Reviews, Contact } from './components.tsx';

export default function Home() {
  return (
    <div className="w-full min-h-dvh max-h-full">
      <Navigation />
      <div id="home" className="w-full bg-[url('/images/logo-bg.png')] bg-cover py-15">
        <div className="relative w-3/4 md:w-[500px] h-[350px] md:h-dvh m-auto">
          <Image src="/images/logo.png" fill alt="retro buy & sell"/>
        </div>
      </div>
      <About />
      <Contact />
      <Reviews />

      
    </div>
  );
}
