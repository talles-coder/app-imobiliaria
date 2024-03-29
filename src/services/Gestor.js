import { getDashboardUsuario, getLoteamentos } from '../database/Firebase'
import Global from '../global/Global'
import {convertToDay, convertToMonth} from '../utils/Date'

// TODO - ascync storage

function reservaExpiraHoje(dataRegistro, diaAtual) {
    return (convertToDay(dataRegistro) + 2) === diaAtual
}

function reservaExpirou(dataRegistro, diaAtual) {
    return diaAtual > (convertToDay(dataRegistro) + 2)
}

function efetuadoHoje(dataRegistro, diaAtual) {
    return convertToDay(dataRegistro) === diaAtual
}

function vendidoNesseMes(dataRegistro, mesAtual) {
    return convertToMonth(dataRegistro) === mesAtual
}

export default async function updateGestorDashboard(identificacao) {
    const dashboard =  await getDashboardUsuario(identificacao)

    const data = {
        ...dashboard.dashboard,
        ativasHoje: 0,
        realizadasHoje: 0,
        expiramHoje: 0,

        totalAtivasHoje: 0,
        totalRealizadasHoje: 0,
        totalExpiramHoje: 0,
        
        vendasHoje: 0,
        vendasNesteMes: 0,
        totalVendas: 0,
    }

    let diaAtual = new Date().getDate()
    let mesAtual = new Date().getMonth()

    let minhasReservas = []
    let todasReservas  = []
    
    todosLoteamentos = await getLoteamentos()

    todosLoteamentos.forEach(async (doc) => {
        Object.values(doc.get('csvObject.content')).forEach((element) => {
            Object.entries(element).forEach((quadras) => {
                const indiceQuadra = quadras[0]
                const quadra = quadras[1]
                
                //Reservas do usuário atual
                if (quadra.status === "reservado") {todasReservas.push(quadra)}
                    
                if (quadra.status === "reservado"){
                    // if(reservaExpirou(quadra.data, diaAtual)) {
                    //     // TODO - importar function
                    //     liberarReservaLote(id, jindex, indiceQuadra, quadra.status , quadra.corretor.email)
                    // }
                    todasReservas = []
                    if(quadra.corretor.email == Global.EMAIL)minhasReservas.push(quadra)
                    
                    if(efetuadoHoje(quadra.data, diaAtual)) data.totalRealizadasHoje++
                    if(!reservaExpirou(quadra.data, diaAtual)) data.totalAtivasHoje++
                    if(reservaExpiraHoje(quadra.data, diaAtual)) data.totalexpiramHoje++

                    if(efetuadoHoje(quadra.data, diaAtual) && quadra.corretor.email == Global.EMAIL) data.realizadasHoje++
                    if(!reservaExpirou(quadra.data, diaAtual) && quadra.corretor.email == Global.EMAIL) data.ativasHoje++
                    if(reservaExpiraHoje(quadra.data, diaAtual) && quadra.corretor.email == Global.EMAIL) data.expiramHoje++
                }
                

                // todos os lotes com status vendido
                
                if (quadra.status === "vendido"){
                    if(efetuadoHoje(quadra.data, diaAtual)) data.vendasHoje++
                    if(vendidoNesseMes(quadra.data, mesAtual)) data.vendasNesteMes++
                    data.totalVendas++
                }
            })
            // await db.collection("loteamentos").doc(id).update({
            //     'csvObject.totalReservados': registroReservasVendas.totalReservados, 
            //     'csvObject.totalVendidos': registroReservasVendas.totalVendidos,
            // })
        })
    })
    return data
}
