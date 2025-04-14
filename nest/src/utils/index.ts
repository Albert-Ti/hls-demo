import * as fs from 'fs'

export function waitForFile(filePath: string, timeout = 5000): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now()
    const check = () => {
      if (fs.existsSync(filePath)) {
        return resolve()
      }
      if (Date.now() - start > timeout) {
        return reject(new Error('Файл не создан вовремя'))
      }
      setTimeout(check, 300) // проверять каждые 300 мс
    }
    check()
  })
}
