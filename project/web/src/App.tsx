import { useEffect, useState } from 'react'
import * as Dialog from  '@radix-ui/react-dialog'
import axios from 'axios'

import logoImg from './assets/logo-nlw-esports.svg'
import './styles/main.css'


import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'

export interface Games {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads:number;
  }
}

export function App() {
  const [games, setGames] = useState<Games[]>([])

  useEffect(()=> {
    axios.get('http://localhost:8081/games/')
    .then( res => setGames(res.data))
  }, [])

  return (
    <div className= 'max-w-[1366] mx-auto flex flex-col items-center my-20'>
        <img src={logoImg} alt="logo" />

        <h1 className='font-black text-white text-6xl mt-20'>Seu <span className='bg-nlw-gradient text-transparent bg-clip-text'>duo</span> está aqui.</h1>

        <div className="grid grid-cols-6 gap-6 mt-16">
            {games.map(game => {
              console.log(game) 
              return (
                  <GameBanner 
                      key={game.id} 
                      bannerUrl={game.bannerUrl} 
                      title={game.title} 
                      adsCount={game._count.ads}
                  />
              )
            })}

        </div>
       
        <Dialog.Root>
          <CreateAdBanner />
          <CreateAdModal />
        </Dialog.Root>
    </div>
  )
}
