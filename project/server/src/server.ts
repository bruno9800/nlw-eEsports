import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { convertHoursStringToMinutes } from './utils/convert-hours-string-to-minutes'
import { convertMinutesToHourString } from './utils/convert-minutes-to-hours-string'

const app = express()
const prisma = new PrismaClient()

app.use(express.json()) // para o express entender json

app.use(cors())

// requests busca informações da requisição
// response retorna algo para a requisição


 // HTTP methods / API RESTful / HTTP Codes

 // 201 -> Created
 // 200 -> Ok
 // 3** -> redirecionamento
 // 4** -> erros por erro no código
 // 5** -> erros inesperados

 // GET, POST, PUT, PATCH, DELETE
 // QUERY(estado) : ROUTE(visivel) : BODY(oculto)


app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })

    return res.json(games)
})

app.post('/games/:id/ads', async(req: any, res: any) => {
    const gameId = req.params.id
    const body = req.body

    const ad = await prisma.ad.create({
        data: {
            gameId: gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHoursStringToMinutes(body.hourStart),
            hourEnd: convertHoursStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })

    return res.status(201).json(ad)
})

app.get('/games/:id/ads', async(request: any, response: any) => {
    const gameId: any = request.params.id

    const ads: any = await prisma.ad.findMany({
        select: {
            id:true,
            name:true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId: gameId
        },
        orderBy: {
            createAt: 'desc'
        }
    })

    return response.send(ads.map( (ad:any) => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd)
        }
    }))
})

app.get('/ads/:id/discord', async (request: any, response: any) => {
    const adId = request.params.id

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    })


    return response.json({
        discord: ad.discord
    })
})


app.listen(8081)