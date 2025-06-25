/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'blocksdk' {
  class SDK {
    constructor(arg1?: any, arg2?: any, arg3?: boolean)
    setData(key: string, value: string): void
    getData(key: string): string | undefined
    setContent(content: string): void
  }

  export default SDK
}
