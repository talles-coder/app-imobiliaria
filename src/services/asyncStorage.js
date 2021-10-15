export async function storeData(key, value){
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log("erro storage: ",e)
    }
  }

export async function getData(key){
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        return value
      } else {
        return null
      }
    } catch(e) {
      console.log("erro storage: ",e)
    }
  }