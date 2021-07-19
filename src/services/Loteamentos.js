import { getLoteamentos , liberarReservaLote} from '../database/Firebase'
import Global from '../global/Global'
import {convertToDay, convertToMonth} from '../utils/Date'

// TODO - ascync storage
// TODO - adcionar pagina de resumo
function reservaExpirou(dataRegistro, diaAtual) {
    return diaAtual > (convertToDay(dataRegistro) + 2)
}

export default async function updateLoteamentos(tipo) {
        
    let diaAtual = new Date().getDate()
    
    const todosLoteamentos = await getLoteamentos()

    const lotesRevisados = []
    const listaMinhasReservas = []
    const listaTodasReservas = []

    todosLoteamentos.forEach((doc) => {
        const object = {
            ...doc.data(),
            id: doc.id,
        }
        const data = {
            todasReservas: 0,
            totalVendas: 0,
        }
        Object.values(doc.get('csvObject.content')).forEach((element, index) => {
            Object.entries(element).forEach((quadras) => {
                const indiceQuadra = quadras[0]
                const quadra = quadras[1]

                // todos os lotes com status reservado

                if (quadra.status === "reservado" && reservaExpirou(quadra.data, diaAtual)) {liberarReservaLote(doc.id, index, indiceQuadra, quadra.status , quadra.corretor.email)}
                if (quadra.status === "reservado" && !reservaExpirou(quadra.data, diaAtual)) {
                    data.todasReservas++
                    quadra.quadra = indiceQuadra
                    quadra.id = doc.id
                    quadra.nomeLote = doc.data().nomeLote
                    quadra.index = index
                    quadra.endereco = doc.data().address.address.enderecoFormatado
                    listaTodasReservas.push(quadra)
                    if (quadra.corretor.email == Global.EMAIL) {
                        listaMinhasReservas.push(quadra)
                    }
                }
                    
                

                // todos os lotes com status vendido
                
                if (quadra.status === "vendido") {
                    data.totalVendas++
                }
            })
        })
        object.csvObject.totalReservados = data.todasReservas
        object.csvObject.totalVendidos = data.totalVendas

        lotesRevisados.push(object)
    })
    
    if (tipo == "loteamentos") {return lotesRevisados}
    if (tipo == "minhasReservas") {return listaMinhasReservas}
    if (tipo == "todasReservas") {return listaTodasReservas}
}
