import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

export class UserIdCheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('antes')

        // tenta converter o parâmetro para número e se mesmo assim não for um número, lança uma exceção
        if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
            throw new BadRequestException('ID inválido. Insira um ID numérico.')
        }

        next()
    }
}
