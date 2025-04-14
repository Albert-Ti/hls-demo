import {BadRequestException, Injectable} from '@nestjs/common'
import {spawn} from 'child_process'
import {Response} from 'express'
import * as fs from 'fs'
import {join} from 'path'

@Injectable()
export class VideoService {
  uploadVideo(file: Express.Multer.File, res: Response) {
    const filePath = file.path
    const fileName = file.filename.split('.')[0]
    const outputDir = join(__dirname, '..', 'hls', fileName)

    fs.mkdirSync(outputDir, {recursive: true})

    // prettier-ignore
    /* 
      Здесь ты запускаешь FFmpeg и просишь его:
      Разделить видео на .ts фрагменты по 10 секунд
      Создать index.m3u8 — плейлист, который HLS-плеер потом будет читать
    */
    const ffmpeg = spawn('ffmpeg', [
      '-i', filePath,           // входной файл
      '-profile:v', 'baseline', // профиль совместимости для старых устройств
      '-level', '3.0',          // уровень H.264
      '-start_number', '0',     // с какого номера начинать .ts-файлы
      '-hls_time', '10',        // длина каждого .ts-фрагмента (в секундах)
      '-hls_list_size', '0',    // не ограничивать размер плейлиста
      '-f', 'hls',              // формат вывода — HLS
      `${outputDir}/index.m3u8` // путь к выходному .m3u8 плейлисту
    ])

    console.log('Папка должна быть:', outputDir)
    console.log('Файл существует?', fs.existsSync(join(outputDir, 'index.m3u8')))

    // Выводит в консоль логи от FFmpeg (очень полезно при отладке ошибок).
    ffmpeg.stderr.on('data', data => console.log(`ffmpeg: ${data}`))

    ffmpeg.on('close', code => {
      if (code === 0) {
        return res.json({url: `/hls/${fileName}/index.m3u8`})
      } else {
        throw new BadRequestException('FFmpeg failed')
      }
    })
  }
}
