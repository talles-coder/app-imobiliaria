import { getLoteamentos , liberarReservaLote} from '../database/Firebase'
import Global from '../global/Global'
import {convertToDay, convertToMonth} from '../utils/Date'

// TODO - ascync storage
function reservaExpirou(dataRegistro, diaAtual) {
    return diaAtual > (convertToDay(dataRegistro) + 2)
}

export default async function updateLoteamentos() {
        
    let diaAtual = new Date().getDate()
    
    const todosLoteamentos = await getLoteamentos()

    const lotesRevisados = []

    todosLoteamentos.forEach(async (doc) => {
        const object = {
            ...doc.data(),
            id: doc.id,
        }
        const data = {
            todasReservas : 0,
            totalVendas : 0
        }
        Object.values(doc.get('csvObject.content')).forEach((element, index) => {
            Object.entries(element).forEach((quadras) => {
                const indiceQuadra = quadras[0]
                const quadra = quadras[1]

                // todos os lotes com status reservado

                if (quadra.status === "reservado" && reservaExpirou(quadra.data, diaAtual)) {liberarReservaLote(doc.id, index, indiceQuadra, quadra.status , quadra.corretor.email)}
                if (quadra.status === "reservado" && !reservaExpirou(quadra.data, diaAtual)) {data.todasReservas++}
                    
                

                // todos os lotes com status vendido
                
                if (quadra.status === "vendido") {data.totalVendas++}
            })
        })
        object.csvObject.totalReservados = data.todasReservas
        object.csvObject.totalVendidos = data.totalVendas

        lotesRevisados.push(object)
    })
    return lotesRevisados
}
