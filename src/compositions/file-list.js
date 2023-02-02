import { ref } from 'vue'

export default function () {
	const file = ref([])

	function addFile(newFiles) {
    console.log(newFiles)
    if (newFiles.length > 0) {
      file.value = new UploadableFile(newFiles[0])
    }
	}

	function removeFile() {
    file.value = []
	}

	return { file, addFile, removeFile }
}

class UploadableFile {
	constructor(file) {
    this.name = file.name
    this.size = file.size
    this.lastModified = file.lastModified
    this.type = file.type

		this.file = file
		this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`
		this.url = URL.createObjectURL(file)
		this.status = 'ready'
	}
}