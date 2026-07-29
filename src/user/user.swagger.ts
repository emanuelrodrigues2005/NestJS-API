import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

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
    ApiResponse({ status: 409, description: 'Email já cadastrado.' }),
    ApiResponse({ status: 500, description: 'Erro interno do servidor.' }),
  );
}

export function ApiUpdateUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualizar dados de um usuário',
      description: 'Endpoint para atualizar um usuário existente.',
    }),
    ApiParam({ name: 'id', description: 'ID do usuário a ser editado' }),
    ApiResponse({
      status: 200,
      description: 'Usuário atualizado com sucesso.',
    }),
    ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' }),
    ApiResponse({ status: 404, description: 'Usuário não encontrado.' }),
    ApiResponse({
      status: 409,
      description: 'Email já está em uso por outro usuário.',
    }),
  );
}
