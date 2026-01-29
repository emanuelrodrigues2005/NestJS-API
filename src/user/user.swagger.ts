import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function ApiCreateUser() {
    return applyDecorators(
        ApiOperation({
            summary: 'Criar um usuário',
            description: 'Endpoint para criar um novo usuário.',
        }),
        ApiResponse({
            status: 201,
            description: 'Usuário criado com sucesso.',
            schema: {
                type: 'object',
                properties: {
                    id: { type: 'number', example: 1 },
                    email: { type: 'string', example: 'email@exemple.com' },
                    name: { type: 'string', example: 'João Silva' },
                    createdAt: { type: 'string', example: '2024-01-01T00:00:00Z' },
                    updatedAt: { type: 'string', example: '2024-01-01T00:00:00Z' },
                },
            },
        }),
       ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' }),
       ApiResponse({ status: 500, description: 'Erro interno do servidor.' }),
    )
}