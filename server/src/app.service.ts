import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

export class CssContentTypeMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    console.log("Inside CSS Module", req.url)
    if (req.url.endsWith('.css')) {
      console.log("inside css", req.url)
      res.header('Content-Type', 'text/css');
    }
    next();
  }
}

@Injectable()
export class JsContentTypeMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    console.log("Inside JS Module", req.url)
    if (req.url.endsWith('.js')) {
      console.log("inside js", req.url)
      res.header('Content-Type', 'text/javascript');
    }
    next();
  }
}
