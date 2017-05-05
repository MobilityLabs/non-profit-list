declare module CSSModule {
  declare var exports: { [key: string]: string };
}

declare type Middleware = (req: Request, res: Response, next: Function) => void;