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
    if (req.url.endsWith('.css')) {
      res.header('Content-Type', 'text/css');
    }
    next();
  }
}

@Injectable()
export class JsContentTypeMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    if (req.url.endsWith('.js')) {
      res.header('Content-Type', 'text/javascript');
    }
    next();
  }
}
