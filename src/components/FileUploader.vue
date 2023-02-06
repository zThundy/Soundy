<template>
  <div class="uploader">
    <div class="close-button-container">
      <button @click.prevent="cancel" class="close-button"><font-awesome-icon icon="xmark"/></button>
    </div>

    <DropZone class="drop-area" @files-dropped="addFile" #default="{ dropZoneActive }">
      <label for="file-input" class="file-input-label">
        <span v-if="dropZoneActive">
          <span><font-awesome-icon :icon="computeIcon()" :spin="computeIcon() === 'spinner' ? true : false"/></span>
          <span class="smaller">
            Release <strong><em>here</em></strong> to upload the file
          </span>
        </span>
        <span v-else>
          <span><font-awesome-icon :icon="computeIcon()"/></span>
          <span class="smaller">
            Drag Your Files Here or <strong><em>click here</em></strong> to select files
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
      <button @click.prevent="uploadClick" id="upload-button" class="upload-button">Upload</button>
      <button @click.prevent="cancel" class="upload-button">Cancel</button>
    </div>
  </div>
</template>

<script>
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

const { uploadFile } = createUploader('https://discord.com/api/webhooks/1071101423242182696/VhL9eFJ_RiOS293nnW2MUjj0IYwPo42YKRY9bjFkwr8lx4mjLx2HUpgQsN1dTPqvmtTb')

export default {
  inject: ["$emitter"],
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
    cancel() {
      this.$emitter.emit("toggle-uploader", false);
      removeFile();
    },
    computeStatus(status) {
      switch (status) {
        case 'loading':
          return 'UPLOADING...'
        case 'success':
          setTimeout(() => this.cancel(), 2000);
          return 'UPLOADED!'
        case 'error':
          // ri enable button
          const button = document.querySelector('#upload-button');
          button.disabled = false;
          return 'ERROR'
        default:
          return 'READY'
      }
    },
    computeName(name) {
      if (name) {
        name = name.split('.')[0];
        if (name.length > 50) name = name.slice(0, 50) + '...'
      }
      return name
    },
    computeIcon() {
      if (!file.value.name) return "arrow-up-from-bracket";
      if (file.value.status === "ready") return "circle-minus";
      if (file.value.status === 'loading') return 'spinner';
      if (file.value.status === 'success') return 'circle-check';
      if (file.value.status === 'error') return 'circle-xmark';
    },
    uploadClick(e) {
      if (!file.value.name) {
        return this.$emitter.emit("notif", {
          message: 'Please select a file first',
          type: "error",
          time: 1500,
        });
      } 
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

.close-button-container {
  width: 10%;
  margin-left: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  position: relative;
}

.close-button {
  transition: all .1s ease-in-out;
  font-size: 1.5rem;
  color: rgb(48, 48, 48);
  background: none;
  border: none;
  cursor: pointer;
}

.close-button:hover {
  transition: all .1s ease-in-out;
  color: rgb(250, 0, 0);
}
</style>