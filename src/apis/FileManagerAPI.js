import { ref } from "vue";

export default function () {
  const file = ref([]);

  function addFile(newFiles) {
    if (newFiles.length > 0) {
      file.value = new UploadableFile(newFiles[0]);
    }
  }

  function removeFile() {
    file.value = [];
  }

  async function uploadFile(file, userId) {
    const url = `/api/users/${userId}/profilePicture`;
    // set up the request data
    let formData = new FormData();
    formData.append("file", file.file);
    // track status and upload file
    file.status = "loading";
    let response = await fetch(url, { method: "POST", body: formData });
    // // change status to indicate the success of the upload request
    file.status = response.ok ? "success" : "error";
    console.log(response);
    return response;
  }

  return { file, addFile, removeFile, uploadFile };
}


class UploadableFile {
  constructor(file) {
    this.name = file.name;
    this.size = file.size;
    this.lastModified = file.lastModified;
    this.type = file.type;

    this.file = file;
    this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
    this.url = URL.createObjectURL(file);
    this.status = "ready";
  }
}
