/// <reference types="vite/client" />

declare module 'blocksdk' {
  class SDK {
    constructor(arg1?: unknown, arg2?: unknown, arg3?: boolean)
    setData(key: string, value: string): void
    getData(key: string): string | undefined
    setContent(content: string): void
  }

  export default SDK
}
