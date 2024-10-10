import { createParamDecorator, ExecutionContext } from '@nestjs/common'

// o valor a ser avaliado vem do context, que contém o request e o response
export const ParamId = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => {
        // o nest possui acesso a outros protocolos, mas neste caso, vamos usar o HTTP, por isso switchToHttp()
        console.log(context.switchToHttp().getRequest().body)
        return Number(context.switchToHttp().getRequest().params.id)
    }
)
