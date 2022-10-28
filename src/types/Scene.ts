import Casting from './Casting'
import Reaction from './Reaction'

export default interface Scene {
  id: number
  title: string
  casting?: Casting[]
  image?: string
  reactions?: Reaction[]
  beginTimecode: number
  endTimecode: number
  manualChange?: boolean
}
