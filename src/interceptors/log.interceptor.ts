import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Observable, tap } from 'rxjs'

export class LogInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {
        // executa o código depois de ter chamado o handler, pega o retorno e coloca no tubo (pipe)
        // tap() pega o retorno do método, executa um código no meio e retorna o código original

        /* antes de executar o manipulador de rota (o controller), ele vai pegar a data, vai chamar a rota normalmente
        e antes de terminar, vai fazer um pipe - pegar o retorno da rota, vai guardar, executar a função dentro do pipe
        (a função tap) e só então prosseguir com o retorno do controller */
        const dt = Date.now()

        return next.handle().pipe(
            tap(() => {
                const request = context.switchToHttp().getRequest()

                console.log(
                    `[${new Date().toLocaleString()}] Acesso à rota URI: ${request.url} | Method: ${request.method} - Duração da operação: ${Date.now() - dt}ms`
                )
            })
        )
    }
}
