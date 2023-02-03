export async function uploadFile(file, url) {
  // set up the request data
  let formData = new FormData()
  formData.append('file', file.file)
  // track status and upload file
  file.status = 'loading'
  let response = await fetch(url, { method: 'POST', body: formData })
  // change status to indicate the success of the upload request
  file.status = response.ok ? 'success' : 'error';
  return response
}

export default function createUploader(url) {
  return {
    uploadFile: function (file) {
      return uploadFile(file, url)
    },
  }
}