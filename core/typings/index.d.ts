// 全局变量
declare interface Window {
  wx: any
  WeixinJSBridge: any
  mocha: any
}

// 模块
// declare namespace yypkg {
//   export interface debounce {
//     (func: Function, delay: number): Function
//   }
//   export interface throttle {
//     (func: Function, delay: number): Function
//   }
//   export interface sleep {
//     (delay: number): Promise<any>
//   }
//   export interface clone {
//     clone(value: any): any
//     cloneJSON(x: any, errOrDef: boolean): any
//     cloneLoop(value: any): any
//     cloneForce(value: any): any
//     hasOwnProp(obj: any, key: any): boolean
//     isClone(value: any): boolean
//     loopList: any[]
//     simpleWeakmap: {
//       (): void
//       set(key: any, value: any): void
//       get(key: any): void
//       clear(): void
//     }
//   }

//   export interface type {
//     (value: any, strict?: boolean): any
//   }
//   export interface scrollToTop {
//     (scrollY: number, time: number): any
//   }

//   export type userAgent = string

//   export type vendor = string

//   export type appVersion = string

//   // 路径
//   export interface getUrlParam {
//     (name: string, url: string): any
//   }
//   export interface getUrlPath {
//     (): string
//   }
//   export interface getAbsoluteUrl {
//     (url: string): string
//   }

//   // 浏览器
//   export interface getFirstBrowserLanguage {
//     (): string
//   }
//   export interface getIEVersion {
//     (): number
//   }

//   // 格式化
//   export interface uuid {
//     (value: number): string
//   }
//   export interface randomColor {
//     (): string
//   }
//   export interface trimSpace {
//     (value: string): string
//   }
//   export interface dateFormat {
//     (value: Date, format?: string): string
//   }
//   export interface thousandsDot {
//     (value: number): string
//   }
//   export interface padZero {
//     (value: number, digits: number): string
//   }
//   export interface numberRange {
//     (value: number, options: any): number
//   }
//   export interface compareVersion {
//     (value1: string, value2: string): any
//   }
//   export interface stringToDOMElement {
//     (value: any): any
//   }

//   // 微信
//   export interface wechatSDK {
//     (options?: any): any
//     [key: string]: any
//   }
//   export interface wechatResetFontSize {
//     (): void
//   }

//   // 资源
//   export interface fetchResources {
//     (url: string, resolve: Function, retry?: number): void
//   }
//   export interface loadScript {
//     (url: string, retry?: number): Promise<boolean>
//   }
//   export interface loadStyle {
//     (url: string, retry?: number): any
//   }
//   export interface loadStyleText {
//     (value: string): void
//   }
//   export interface forceReload {
//     (): void
//   }
//   export interface mocha {
//     (testcases: any): Promise<any>
//   }

//   export class SourceLoader {
//     constructor(argument: any)
//     configs: any
//   }
//   export type SourceLoaderLoadData = any
//   export type SourceLoaderEvent = {
//     [key: string]: any
//   }

//   export class ProgressController {
//     constructor(argument: any)
//     config: any
//     data: any
//   }
//   export type ProgressControllerTimer = any
//   export type ProgressControllerEvent = {
//     [key: string]: any
//   }

//   // 检测
//   export interface environmentDetect {
//     (): boolean
//   }
//   export interface isParentElement {
//     (value1: any, value2: any): boolean
//   }
// }
