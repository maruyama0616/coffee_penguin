export type MokaPose =
  | 'greeting'
  | 'thinking'
  | 'excited'
  | 'shopping'
  | 'reading'
  | 'waving'
  | 'sleeping'

export interface MokaState {
  pose: MokaPose
  scale: number
  rotation: number
  expression: 'happy' | 'neutral' | 'excited' | 'sleepy'
}


