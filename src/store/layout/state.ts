interface LayoutState {
  loading: boolean,
  message: {
    show: boolean,
    text: string | null,
    duration: number | null
  }
}

const state: LayoutState = {
  loading: false,
  message: {
    show: false,
    text: null,
    duration: null
  }
}

export default state
