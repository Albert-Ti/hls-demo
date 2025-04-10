export const fetchUploadVideo = async (file: File) => {
  const formatData = new FormData()
  formatData.append('file', file)

  const response = await fetch('http://localhost:3000/videos/upload', {
    method: 'POST',
    body: formatData,
  })

  return await response.json()
}
