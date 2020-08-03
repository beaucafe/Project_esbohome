import { IResponse } from './response.interface'

interface IStatus {
  code: number
  message: string
}

class defaultResponse implements IResponse {
  Status = { code: 0, message: 'No change!!!' }
  Created = {}
  Updated = {}
  constructor(status?: IStatus, created?, updated?) {
    this.Status = status ? status : this.Status
    this.Created = created ? created : this.Created
    this.Updated = updated ? updated : this.Updated
  }
}

export { defaultResponse }
