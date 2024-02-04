import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiResult = <TModel extends Type>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiResponse({
      schema: {
        properties: {
          result: { $ref: getSchemaPath(model) },
        },
      },
    }),
  );
};
