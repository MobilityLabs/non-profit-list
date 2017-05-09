// @flow
declare module CSSModule {
  declare var exports: { [key: string]: string };
}

declare type Middleware = (req: Request, res: Response, next: Function) => void;

declare module google {
  declare var maps: {};
}

declare type DOMEvent = ElementEvent<HTMLInputElement>;
