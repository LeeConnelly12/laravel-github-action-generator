interface Output {
  name: string
  on?: {
    push: {
      branches: string[]
    }
  }
}

export type { Output }
