<template>
  <div class="uploader">
    <DropZone class="drop-area" @files-dropped="addFile" #default="{ dropZoneActive }">
      <label for="file-input" class="file-input-label">
        <span v-if="dropZoneActive">
          <span>Alsmost there!</span>
          <span class="smaller">
            Release <strong><em>here</em></strong> to upload the file
          </span>
        </span>
        <span v-else>
          <span>Drag Your Files Here</span>
          <span class="smaller">
            or <strong><em>click here</em></strong> to select files
          </span>
        </span>

        <input type="file" id="file-input" @change="onInputChange" />
      </label>
      <ul class="image-list" v-show="file.name">
        <div class="file-ready-container">
          <span>{{ computeStatus(file.status) }}</span>
        </div>
      </ul>
    </DropZone>

    <div class="buttons-container">
      <button @click.prevent="uploadClick" class="upload-button">Upload</button>
      <button @click.prevent="cancel" class="upload-button">Cancel</button>
    </div>
  </div>
</template>

<script>
import emitter from "tiny-emitter/instance";
// Components
import DropZone from './DropZone.vue'
// File Management
import useFileList from '../compositions/file-list'
// Uploader
import createUploader from '../compositions/file-uploader'

const { file, addFile, removeFile } = useFileList()
function onInputChange(e) {
  /* check if there are more than one file added, if so pick last one */
	addFile(e.target.files)
	e.target.value = null // reset so that selecting the same file again will still cause it to fire this change
}

function cancel() {
  emitter.emit("toggle-uploader", false);
  removeFile();
}

const { uploadFile } = createUploader('https://discord.com/api/webhooks/1071101423242182696/VhL9eFJ_RiOS293nnW2MUjj0IYwPo42YKRY9bjFkwr8lx4mjLx2HUpgQsN1dTPqvmtTb')

export default {
  components: { DropZone },
  setup() {
    return {
      file,
      addFile,
      removeFile,
      onInputChange,
      cancel,
      uploadFile
    }
  },

  methods: {
    computeStatus(status) {
      switch (status) {
        case 'loading':
          return 'Uploading...'
        case 'success':
          setTimeout(() => this.cancel(), 1000);
          return 'Uploaded!'
        case 'error':
          return 'Error'
        default:
          return 'Ready'
      }
    },
    computeName(name) {
      if (name) {
        name = name.split('.')[0];
        if (name.length > 50) name = name.slice(0, 50) + '...'
      }
      return name
    },
    uploadClick(e) {
      e.srcElement.disabled = true;
      this.uploadFile(this.file);
    }
  }
}
</script>

<style scoped lang="scss">
.uploader {
	font-family: Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #ffffff;
	margin: 0 auto;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.drop-area {
	width: 100%;
	max-width: 800px;
	margin: 0 auto;
	padding: 50px;
  border: 2px dashed #ffffff;
  border-radius: 30px;
	transition: all .2s ease-in-out;
	&[data-active=true] {
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
	}
}

.file-input-label {
	font-size: 36px;
	cursor: pointer;
	display: block;
	span {
		display: block;
	}
	input[type=file]:not(:focus-visible) {
		// Visually Hidden Styles taken from Bootstrap 5
		position: absolute !important;
		width: 1px !important;
		height: 1px !important;
		padding: 0 !important;
		margin: -1px !important;
		overflow: hidden !important;
		clip: rect(0, 0, 0, 0) !important;
		white-space: nowrap !important;
		border: 0 !important;
	}

	.smaller {
		font-size: 16px;
	}
}

.image-list {
	display: flex;
	list-style: none;
	flex-wrap: wrap;
	padding: 0;
}

.upload-button {
  transition: all 0.2s ease-in-out;
	display: block;
	appearance: none;
	border: 0;
	border-radius: 50px;
	padding: 0.75rem 3rem;
	margin: 40px;
	font-size: 1.25rem;
	font-weight: bold;
  width: 100%;
  background: linear-gradient(
    150deg,
    rgb(170, 126, 173) 0%,
    rgb(163, 90, 163) 20%,
    rgb(94, 15, 83) 100%
  );
	color: #fff;
	text-transform: uppercase;
	cursor: pointer;
  background-size: 400% 400%;
  background-position: 0% 50%;
}

.upload-button:hover {
  background-position: 100% 50%;
  transition: all 0.2s ease-in-out;
}

.upload-button:disabled {
  background: linear-gradient(
    150deg,
    rgb(73, 55, 75) 0%,
    rgb(56, 31, 56) 20%,
    rgb(32, 5, 29) 100%
  );
  background-size: 400% 400%;
  background-position: 0% 50%;
  color: gray;
  transition: all 0.2s ease-in-out;
  cursor: not-allowed;
}

.buttons-container {
  display: flex;
  flex-direction: row;
  width: 35%;
  justify-content: center;
  margin: 0 auto;
}

.file-ready-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  width: 100%;
  height: 100%;
}

.file-ready-container span {
  width: 70%;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>