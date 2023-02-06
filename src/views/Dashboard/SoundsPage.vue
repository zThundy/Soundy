<template>
  <div class="bg" v-if="sounds && typeof sounds === 'object'">
    <div class="sounds-list" v-if="sounds.length > 0">
      <div
        v-for="sound of sounds"
        v-bind:key="sound.id"
        @click="selectSound(sound)"
        class="sound"
        :class="{ 'sound-selected': sound === selectedSound }"
      >
        <span class="title">{{ computeStringLength(sound.name, 60) }}</span>
        <span class="description"><font-awesome-icon class="icon" icon="paperclip" /> {{ sound.description }}</span>
      </div>
    </div>
    <div class="sounds-info">
      <div v-if="selectedSound" class="sound-infoes-container" style="width: 95%;">
        <div class="input-container">
          <label class="label">Sound Name:</label>
          <input v-model="selectedSound.name" maxlength="40" placeholder="Type the name of your sound file (max 40)"/>
          <label class="label">Sound Description:</label>
          <input v-model="selectedSound.description" maxlength="80" placeholder="Type the description of your sound file (max 80)"/>
          <label class="label">Points needed:</label>
          <input type="number" v-model="selectedSound.points" maxlength="80" placeholder="Type the description of your sound file (max 80)"/>
        </div>

        <div class="slider-container">
          <label class="label">Volume:</label>
          <div class="slidecontainer">
            <input v-model="selectedSound.volume" type="range" min="1" max="100" class="slider">
            <span style="width: 50px; text-align: center;">{{ (selectedSound.volume) }}%</span>
          </div>
        </div>

        <div class="buttons-container">
          <div class="save-button" @click="saveSound(selectedSound)">
            <span><font-awesome-icon class="icon" icon="floppy-disk" /> Save</span>
          </div>
          <div class="delete-button" @click="deleteSound(selectedSound)">
            <span><font-awesome-icon class="icon" icon="trash" /> Delete</span>
          </div>
        </div>
      </div>
      <div v-else class="sound-infoes-container" style="margin: auto; width: 65%;">
        <div style="text-align: center;" v-if="sounds.length > 0">Select a sound</div>
        <div class="no-sounds-container" v-else>
          <span>No sounds to show <font-awesome-icon class="icon" icon="face-frown" /></span>
          <div class="upload-button" @click="activateUploader()">
            <span><font-awesome-icon class="icon" icon="plus" /> Upload one</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="typeof sounds === 'string'">
    <div class="error-container">
      <span class="error-message">{{ sounds }}</span>
      <div class="refresh-button" @click="reload()">
        <span><font-awesome-icon class="icon" icon="rotate" /> Refresh</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getCachedSounds } from './../../apis/SoundsGetterAPI.js';

export default {
  name: "sounds",
  inject: ["$emitter"],
  async setup() {
    return {
      sounds: await getCachedSounds(),
    }
  },

  data() {
    return {
      selectedSound: null,
    };
  },

  methods: {
    selectSound(sound) {
      if (this.selectedSound !== null && sound.id === this.selectedSound.id) {
        this.selectedSound = null;
        return;
      }
      this.selectedSound = sound;
    },
    computeStringLength(name, length) {
      if (name.length === 0) {
        return "No name";
      }
      if (name.length > length) {
        return name.substring(0, length) + "...";
      }
      return name;
    },
    saveSound(sound) {
      // TODO: Save sound
      this.$emitter.emit("notif", {
        message: 'Sound "' + sound.name + '" saved!',
        type: "success",
        time: 500,
      });
    },
    deleteSound(sound) {
      for (var i in this.sounds) {
        if (this.sounds[i].id === sound.id) {
          this.sounds.splice(i, 1);
          break;
        }
      }
      this.selectedSound = null;
      // TODO: Delete sound
      this.$emitter.emit("notif", {
        message: 'Sound "' + sound.name + '" deleted!',
        type: "success",
        time: 500,
      });
    },
    activateUploader() {
      this.$emitter.emit("toggle-uploader", true);
    },
    reload() {
      window.location.reload();
    },
  },

  watch: {
  },

  computed: {
  },
};
</script>

<style>
.error-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 25px;
  border-radius: 10px;
}

.error-message {
  margin: auto;
  font-size: 20px;
  color: white;
}

.input-container {
  display: flex;
  flex-direction: column;
  height: 250px;
  width: 92%;
  margin: auto;
  margin-top: 25px;
  border-radius: 10px;
}

.input-container input {
  transition: all 0.1s ease-in-out;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: auto;
  background-color: rgb(70, 70, 70);
  height: auto;
  padding: 15px;
  width: 100%;
  border: none;
  border-radius: 15px;
  color: white;
}

.input-container input:hover {
  transition: all 0.1s ease-in-out;
  background-color: rgb(80, 80, 80);
}

.input-container input:focus {
  transition: all 0.1s ease-in-out;
  outline: none;
  background-color: rgb(90, 90, 90);
  box-shadow: 0 0 5px 0 rgb(255, 255, 255);
}

.label {
  margin-top: 10px;
  color: rgb(247, 92, 255);
}

.bg {
  display: flex;
  flex-direction: row;
  height: 95%;
  width: 95%;
  margin-top: 55px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(107, 107, 107);
  border-radius: 10px;
}

.sounds-list {
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
}

.sounds-info {
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.sound {
  user-select: none;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  /* margin-left: 10px; */
  transition: all 0.1s ease-in-out;
  border-radius: 10px;
  cursor: pointer;
  background-color: #333333;
  padding: 10px;
  max-width: 95%;
  min-width: 95%;
}

.sound-infoes-container {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  /* margin-left: 10px; */
  transition: all 0.1s ease-in-out;
  border-radius: 10px;
  background-color: #333333;
  padding: 10px;
}

.sound:hover {
  transition: all 0.1s ease-in-out;
  background-color: #555555;
}

.title {
  font-size: 1.2em;
}

.description {
  font-size: 0.8em;
}

.sound-selected {
  box-shadow: 0 0 15px 0 rgb(255, 255, 255);
  /* border: 1px rgba(255, 255, 255, 0.2) solid; */
  background-color: rgba(87, 87, 87, 1);
}

.buttons-container {
  display: flex;
  flex-direction: row;
  height: auto;
  width: 92%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  border-radius: 10px;
}

.upload-button {
  user-select: none;
  transition: all 0.1s ease-in-out;
  border-radius: 10px;
  padding: 10px 15px 10px 10px;
  /* margin-top: 10px; */
  /* margin-bottom: 10px; */
  background-color: rgb(180, 0, 190);
  cursor: pointer;
  width: fit-content;
  color: white;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}

.upload-button:hover {
  transition: all 0.1s ease-in-out;
  background-color: rgb(176, 49, 185);
  color: white;
}

.slider-container {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 92%;
  margin: auto;
  margin-top: 80px;
  border-radius: 10px;
}

.slidecontainer {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 10px;
}

/* The slider itself */
.slider {
  margin-top: auto;
  margin-bottom: auto;
  -webkit-appearance: none;
  appearance: none;
  width: 90%;
  height: 10px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  border-radius: 20px;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: rgb(180, 0, 190);
  cursor: pointer;
  border-radius: 20px;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: rgb(180, 0, 190);
  cursor: pointer;
  border-radius: 20px;
}

.slider::-webkit-slider-thumb:hover {
  background: rgb(176, 49, 185);
}

.slider::-moz-range-thumb:hover {
  background: rgb(176, 49, 185);
}

.no-sounds-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 50%;
  color: white;
}
</style>
