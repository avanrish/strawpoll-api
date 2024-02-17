import { Controller, Get, Redirect, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller({ version: VERSION_NEUTRAL })
@ApiExcludeController()
export class AppController {
  @Get()
  @Redirect('/docs/api')
  redirectToDocs(): void {}
}
