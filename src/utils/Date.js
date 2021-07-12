export function convertToDay (data) {
    return new Date(data * 1000).getDate()
}

export function convertToMonth (data) {
    return new Date(data * 1000).getMonth()
}

export function dataFormatada (date) {
    return ("0" + date.getDate()).substr(-2) + "/" + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear() + " " + ("0" + date.getHours()).substr(-2) + ":" + ("0" + date.getMinutes()).substr(-2)
}

export function dataLimiteFormatada (date) {
    date.setDate(date.getDate() + 2);
    return ("0" + date.getDate()).substr(-2) + "/" + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear() + " " + ("0" + date.getHours()).substr(-2) + ":" + ("0" + date.getMinutes()).substr(-2);
}