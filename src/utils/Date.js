export function convertToDay (data) {
    return new Date(data * 1000).getDate()
}

export function convertToMonth (data) {
    return new Date(data * 1000).getMonth()
}
