import { HttpStatus } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from './google-oauth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('google')
export class GoogleAuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req: Request) {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(
    @Req() req: Request,
    @Res() res: Response
    ){
      const responseHTML = '<script>res = window.close();</script>'
    // let responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
    // responseHTML = responseHTML.replace('%value%', JSON.stringify({
    //     user: req.user
    // }));

    res.status(200).send(responseHTML);
    // res.redirect('http://localhost:4200/login/succes/');

    const registerGoogle = await this.authService.googleSignup(req);
    return res.status(HttpStatus.CREATED).send(registerGoogle);
  }
}