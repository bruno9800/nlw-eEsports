import { useEffect, useState, FormEvent } from 'react'

import * as Dialog from  '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import axios from 'axios'

import { CheckBadgeIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { Input } from './Form/input'

import { Games } from '../App'

export function CreateAdModal() {
    const [games, setGames] = useState<Games[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    


  async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        console.log(data)
        if(!data.name){
            return
        }
        try{
        await axios.post(`http://localhost:8081/games/${data.game}/ads`, 	{
            name: data.name,
            yearsPlaying: Number(data.yearsPlaying),
            discord: data.discord,
            weekDays: weekDays.map(Number),
            hourStart: data.hourStart,
            hourEnd: data.hourEnd,
            useVoiceChannel: useVoiceChannel,
        })

        alert('Anuncio criado com sucesso !')
        }catch(err) {
            console.log(err)
            alert('Erro ao criar o anúncio')
        }
    }

  useEffect(()=> {
    axios.get('http://localhost:8081/games/')
    .then( res => setGames(res.data))
  }, [])
    return (
        <Dialog.Portal>
            <Dialog.DialogOverlay className='bg-black/60 inset-0 fixed'/>
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
                <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

                    <form className='mt-8 flex flex-col gap-4' onSubmit={handleCreateAd}>
                      <div className='flex flex-col gap-2 '>
                            <label htmlFor="Game" >Joga a quanto tempo ?</label>
                        <div className='relative bg-zinc-900  py-3 px-4 rounded text-sm overflow-hidden'>
                        <Select.Root
                            name='game'
                            
                        >
                            <Select.Trigger aria-label='game' className='flex justify-between w-full'>
                                <Select.Value 
                                placeholder='Selecione o game que deseja jogar'
                                />
                                <Select.Icon className='absolute right-0 top-1/2 -translate-y-1/2 mr-5'>
                                    <ChevronDownIcon className='w-4 h-4' />
                                </Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                            <Select.Content className='bg-zinc-900 rounded w-full overflow-hidden'>
                                <Select.ScrollUpButton className='flex items-center justify-center'>
                                    <ChevronUpIcon className='w-4 h-4 self-center'/>
                                </Select.ScrollUpButton>
                                <Select.Viewport >
                                    <Select.Group>
                                        { games.map(game => {
                                            return (
                                            <Select.Item value={game.id}
                                                className='flex justify-between relative hover:bg-violet-500 px-4 py-3 text-white'
                                                key={game.id}
                                            >
                                                <Select.ItemText
                                                    className='text-sm p-5 text-white'
                                                >{game.title}</Select.ItemText>
                                                <Select.ItemIndicator>
                                                <CheckIcon className='w-4 h-4 text-violet-500'/>
                                                </Select.ItemIndicator>
                                            </Select.Item>
                                            )
                                        })}
                                    </Select.Group>
                                </Select.Viewport>
                                <Select.ScrollDownButton className='flex items-center justify-center'>
                                    <ChevronDownIcon className='w-4 h-4'/>
                                </Select.ScrollDownButton>
                            </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                        </div>
                        
                        {/* <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                        <Input id='game' type='text' placeholder='Selecione o game que deseja jogar'/> */}
                      </div>

                      <div className='flex flex-col gap-2 '>
                        <label htmlFor="name">Seu nome (ou nickname</label>
                        <Input name='name' id='name' type="text" placeholder='Como te chamam dentro do game?'/>
                      </div>

                      <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2 '>
                          <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                          <Input name='yearsPlaying' id='yearsPlaying' type="number" placeholder='0'/>
                        </div>

                        <div className='flex flex-col gap-2 '>
                          <label htmlFor="discord">Qual o seu Discord?</label>
                          <Input name="discord" id="discord" type="text" placeholder='Usuario#0000'/>
                        </div>
                      </div>

                      <div className='flex gap-6'>
                        <div className='flex flex-col gap-2'>
                          <label htmlFor="weekDays">Quando costuma jogar?</label>
                      
                            <ToggleGroup.Root 
                            type='multiple' 
                            className='grid grid-cols-4 gap-1'
                            value={weekDays}
                            onValueChange={setWeekDays}
                            >
                            <ToggleGroup.Item 
                              value='0'
                              title='Domingo'
                              className={`w-8 h-8 rounded  ${weekDays.includes('0') ? 'bg-violet-500': 'bg-zinc-900'}`}
                            >
                              D
                            </ToggleGroup.Item>

                            <ToggleGroup.Item 
                              value='1'
                              title='Segunda'
                              className={`w-8 h-8 rounded  ${weekDays.includes('1') ? 'bg-violet-500': 'bg-zinc-900'}`}
                            >
                              S
                              </ToggleGroup.Item>

                            <ToggleGroup.Item 
                              value='2'
                              title='Terça'
                              className={`w-8 h-8 rounded  ${weekDays.includes('2') ? 'bg-violet-500': 'bg-zinc-900'}`}
                              >
                                T
                            </ToggleGroup.Item>

                            <ToggleGroup.Item 
                              value='3'
                              title='Quarta'
                              className={`w-8 h-8 rounded  ${weekDays.includes('3') ? 'bg-violet-500': 'bg-zinc-900'}`}
                            >
                              Q
                            </ToggleGroup.Item>
                            <ToggleGroup.Item 
                              value='4'
                              title='Quinta'
                              className={`w-8 h-8 rounded  ${weekDays.includes('4') ? 'bg-violet-500': 'bg-zinc-900'}`}
                            >
                              Q
                            </ToggleGroup.Item>

                            <ToggleGroup.Item 
                              value='5'
                              title='Sexta'
                              className={`w-8 h-8 rounded  ${weekDays.includes('5') ? 'bg-violet-500': 'bg-zinc-900'}`}
                            >
                              S
                            </ToggleGroup.Item>
                            
                            <ToggleGroup.Item 
                              value='6'
                              title='Sabado'
                              className={`w-8 h-8 rounded  ${weekDays.includes('6') ? 'bg-violet-500': 'bg-zinc-900'}`}
                            >
                            S
                            </ToggleGroup.Item>
                          </ToggleGroup.Root>
                        </div>
                        <div className='flex flex-col gap-2 flex-1'>
                          <label htmlFor="hourStart">Qual horário do dia?</label>
                          <div className='grid grid-cols-2 gap-2'>
                            <Input name='hourStart' id='hourStart' type="time" placeholder='De' 
                            style={{padding: '0.7rem'}}/>
                            <Input name='hourEnd' id='hourEnd' type="time" placeholder='Até' 
                            style={{padding: '0.7rem'}}/>
                          </div>
                        </div>
                      </div>
                      
                      <label className='mt-2 flex items-center gap-2 text-sm'>
                        <Checkbox.Root 
                            checked={useVoiceChannel}
                            onCheckedChange={checked => {
                                checked===true
                                ? setUseVoiceChannel(true)
                                : setUseVoiceChannel(false)
                            }}
                            className='w-6 h-6 rounded bg-zinc-900 p-1'>
                            <Checkbox.Indicator>
                                <CheckIcon className='w-4 h-4 text-emerald-400' />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Constumo me conectar ao chat de voz
                      </label>

                      <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 '>Cancelar</Dialog.Close>
                        <button
                          type="submit"
                          className='flex items-center bg-violet-500 px-5 h-12 rounded-md font-semibold gap-3 hover:bg-violet-600 '  
                        >
                          <CheckBadgeIcon className='w-6 h-6'/>
                          Encontrar duo
                        </button>
                      </footer>
                    </form>

            </Dialog.Content>
          </Dialog.Portal>
    )
}