import {Controller, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common'
import {FileInterceptor} from '@nestjs/platform-express'

import {Response} from 'express'
import {diskStorage} from 'multer'
import {VideoService} from './video.service'

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
      }),
    }),
  )
  async uploadVideo(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    return this.videoService.uploadVideo(file, res)
  }
}
