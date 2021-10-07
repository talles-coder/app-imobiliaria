import React from 'react';
import { getUsuarios, getImageFromFirebase, deleteUserData, alterarTipoUsuario} from '../database/Firebase'
import Global from '../global/Global'

// TODO - ascync storage
// TODO - adcionar pagina de resumo

export default async function updateCorretores() {
    const todosUsuarios = await getUsuarios()

    const arrayUsuarios = []
    todosUsuarios.forEach((doc) => {
        const usuario = doc.data()
        arrayUsuarios.push(usuario) 
    })

    for (const index in arrayUsuarios) {
        // if (arrayUsuarios[index].imagem !== undefined) {
            // arrayUsuarios[index].URLImagem = await getImageFromFirebase(arrayUsuarios[index].imagem);   
        // } else {
            arrayUsuarios[index].URLImagem = "https://reactnative.dev/img/tiny_logo.png"
        // }
        // console.log(arrayUsuarios[index].URLImagem)
    }
    return arrayUsuarios
}

export function excluir(idUsuario) {
    return deleteUserData(idUsuario)
}

export function alterarTipo(idUsuario, tipoUsuario) {
    return alterarTipoUsuario(idUsuario, tipoUsuario)
}