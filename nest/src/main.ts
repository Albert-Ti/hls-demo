import {NestFactory} from '@nestjs/core'
import {NestExpressApplication} from '@nestjs/platform-express'
import {join} from 'path'
import {AppModule} from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableCors({origin: 'http://localhost:5173'})

  /* 
    Делает папку hls доступной через HTTP.
    Например: ./hls/video/index.m3u8 становится доступен по адресу http://localhost:3000/hls/video/index.m3u8
  */
  app.useStaticAssets(join(__dirname, 'hls'), {prefix: '/hls'})
  await app.listen(3000)
}

bootstrap()
