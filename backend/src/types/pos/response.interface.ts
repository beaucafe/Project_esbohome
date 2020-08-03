export interface IResponse {
  Status: status
  Created: Object
  Updated: Object
  Message?: Object
}

interface status {
  code: number
  message: string
  lastData?: Object
  lastBill?: Object
}

// export const defaultResponse: IResponse = {
//   Created: {},
//   Updated: {},
//   Status: {
//     code: 0,
//     message: 'No change!!',
//   },
// }
