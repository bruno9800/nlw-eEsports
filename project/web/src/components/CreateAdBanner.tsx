import { MagnifyingGlassPlusIcon } from "@heroicons/react/24/solid";
import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner() {
    return (
        <div className='relative max-w-[1200] bg-[#2A2634] px-8 py-6 mt-8 self-stretch rounded-lg overflow-hidden before:content-[""] before:w-full before:h-1 before:bg-nlw-gradient before:absolute before:left-0 before:top-0 flex justify-between items-center'>
        <div>
          <strong className='text-white text-2xl block'>Não encontrou o seu duo?</strong>
          <span className='text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
        </div>

        <Dialog.Trigger className='py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 flex items-center gap-3'>
          <MagnifyingGlassPlusIcon className='w-6 h-6'/>
          Publicar Anúncio</Dialog.Trigger>
      </div>
    )
}