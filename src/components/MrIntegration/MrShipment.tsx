import createShipment from '@frontboi/mondial-relay/node'
import { CreateShipmentResponse } from '@frontboi/mondial-relay/types'

const data: CreateShipmentResponse = await createShipment({
  // check out examples/createShipment for a complete example of
  // the object that should be passed to this function
  //
  // the parameters you pass are validated by Yup so that you are
  // sure you send correct data to Mondial Relay
})

const { rawResponse, isSandbox, sendingNumber, etiquetteLink } = data