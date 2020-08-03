import { IResponse } from 'src/types/pos/response.interface'

interface Iresult {
  created: boolean
  updated: boolean
}

//#region   ตัวอย่าง  isPromise
/*  Example
isPromise(new Promise(() => {}))  
// true

async function asyncFn () {  
  return 'async'
}
isPromise(asyncFn())  
// true

isPromise()  
// false

isPromise(1)  
// false

isPromise('no')  
// false

*/
//#endregion

export const isPromise = (promise) => {
  return !!promise && typeof promise.then === 'function'
}

export const changeStatus = async (object) => {
  let created = 0
  let updated = 0
  // console.log(object.length)

  object.forEach((data) => {
    // console.log(data)
    if (data.created) created++
    if (data.updated) updated++
    //if (result.update) update++;
  })

  return { created, updated }
}

const sendResult = (create?, update?, message?): IResponse => {
  let Status = { code: 200, message: `Data has not changed.!` }
  let Created = create
  let Updated = update
  let Message = message ? message : {}

  if (Created) {
    Status = { code: 201, message: 'Successfully created.' }
  } else Created = {}

  if (Updated) {
    Status = { code: 201, message: 'Successfully updated.' }
  } else Updated = {}

  return { Status, Created, Updated, Message }
}

export const ResponseStatus = async (object, message?) => {
  const result = await changeStatus(object)
  const { created, updated } = result
  return await sendResult(created, updated)
}

export const ResponsePromiseStatus = async (object) => {
  const result = await PromiseStatus(object)
  const { created, updated } = result
  return await sendResult(created, updated)
}

const PromiseStatus = async (promise) => {
  return await Promise.all(promise).then((data) => {
    let created = 0
    let updated = 0
    data.forEach((result: Iresult) => {
      // console.log(result)

      if (result.created) created++

      if (result.updated) updated++
    })

    return { created, updated }
  })
}
