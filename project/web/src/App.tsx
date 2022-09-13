import './styles/main.css'

import logoImg from './assets/logo-nlw-esports.svg'

import {MagnifyingGlassPlusIcon} from "@heroicons/react/24/solid"

export function App() {

  return (
    <div className= 'max-w-[1366] mx-auto flex flex-col items-center my-20'>
        <img src={logoImg} alt="logo" />

        <h1 className='font-black text-white text-6xl mt-20'>Seu <span className='bg-nlw-gradient text-transparent bg-clip-text'>duo</span> está aqui.</h1>

        <div className="grid grid-cols-6 gap-6 mt-16">

          <a href="" className='relative rounded-lg overflow-hidden'>
            <img src="/game-1.png" alt="" />
            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
              <strong className='font-bold text-white block'>League of Legends</strong>
              <span className='text-sm text-zinc-300 block'>4 anúncios</span>
              </div> 
          </a>
          <a href="" className='relative rounded-lg overflow-hidden'>
            <img src="/game-2.png" alt="" />

            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
              <strong className='font-bold text-white block'>dota 2</strong>
              <span className='text-sm text-zinc-300 block'>4 anúncios</span>
              </div> 
          </a>
          <a href="" className='relative rounded-lg overflow-hidden'>
            <img src="/game-3.png" alt="" />

            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
              <strong className='font-bold text-white block'>CS:GO</strong>
              <span className='text-sm text-zinc-300 block'>4 anúncios</span>
              </div> 
          </a>
          <a href="" className='relative rounded-lg overflow-hidden'>
            <img src="/game-4.png" alt="" />

            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
              <strong className='font-bold text-white block'>Apex Legends</strong>
              <span className='text-sm text-zinc-300 block'>4 anúncios</span>
              </div> 
          </a>
          <a href="" className='relative rounded-lg overflow-hidden'>
            <img src="/game-5.png" alt="" />

            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
              <strong className='font-bold text-white block'>Fortnite</strong>
              <span className='text-sm text-zinc-300 block'>4 anúncios</span>
              </div> 
          </a>
          <a href="" className='relative rounded-lg overflow-hidden'>
            <img src="/game-6.png" alt="" />

            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
              <strong className='font-bold text-white block'>World of Warcraft</strong>
              <span className='text-sm text-zinc-300 block'>4 anúncios</span>
              </div> 
          </a>
        </div>

        <div className='relative max-w-[1200] bg-[#2A2634] px-8 py-6 mt-8 self-stretch rounded-lg overflow-hidden before:content-[""] before:w-full before:h-1 before:bg-nlw-gradient before:absolute before:left-0 before:top-0 flex justify-between items-center'>
          <div>
            <strong className='text-white text-2xl block'>Não encontrou o seu duo?</strong>
            <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
          </div>

          <button className='py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 flex items-center gap-3'>
            <MagnifyingGlassPlusIcon className='w-6 h-6'/>
            Publicar Anúncio</button>
        </div>
    </div>
  )
}
