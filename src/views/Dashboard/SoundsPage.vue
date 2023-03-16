<template>
  <div class="bg" v-if="sounds && typeof sounds === 'object'">
    <div class="sounds-list" v-if="sounds.length > 0">
      <div
        v-for="sound of sounds"
        v-bind:key="sound.id"
        @click="selectSound(sound)"
        class="sound"
        :class="{ 'sound-selected': sound.id === (selectedSound ? selectedSound.id : '') }"
      >
        <span class="title">{{ sound.name || "No name" }}</span>
        <!-- <span class="description"><font-awesome-icon class="icon" icon="paperclip" />{{ sound.description }}</span> -->
      </div>
    </div>
    <div class="sounds-info">
      <div
        v-if="selectedSound"
        class="sound-infoes-container"
        style="width: 95%"
      >
        <div class="input-container">
          <v-text-field
            label="Sound Name"
            v-model="selectedSound.name"
            maxlength="40"
            :counter="40"
            placeholder="Type the name of your sound file"
            clearable
            variant="solo"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-textarea
            label="Sound Description"
            v-model="selectedSound.description"
            placeholder="Type the description of your sound file"
            :counter="80"
            variant="solo"
          ></v-textarea>
          <v-spacer></v-spacer>
          <v-text-field
            label="Points needed"
            v-model="selectedSound.points"
            type="number"
            variant="solo"
          ></v-text-field>
        </div>

        <div class="slider-container">
          <v-slider
            thumb-color="purple"
            label="Volume"
            v-model="selectedSound.volume"
            :min="1"
            :max="100"
          ></v-slider>
        </div>

        <div class="buttons-container">
          <v-btn @click="saveSound(selectedSound)"><v-icon class="icon" icon="mdi-floppy" />Save</v-btn>
          <v-btn @click="deleteSound(selectedSound)"><v-icon class="icon" icon="mdi-delete" />Delete</v-btn>
        </div>
      </div>

      <div
        v-else
        class="sound-infoes-container"
        style="margin: auto; width: 65%"
      >
        <div style="text-align: center" v-if="sounds.length > 0">
          Select a sound
        </div>
        <div class="no-sounds-container" v-else>
          <span
            >No sounds to show
            <font-awesome-icon class="icon" icon="face-frown"
          /></span>
          <div class="upload-button" @click="activateUploader()">
            <span
              ><font-awesome-icon class="icon" icon="plus" /> Upload one</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCachedSounds } from "./../../apis/SoundsGetterAPI.js";

export default {
  name: "SoundsPage",
  inject: ["$emitter"],
  async setup() {
    return {
      sounds: await getCachedSounds(),
    };
  },

  data: () => ({
    selectedSound: null
  }),

  methods: {
    selectSound(sound) {
      if (this.selectedSound !== null && sound.id === this.selectedSound.id) {
        this.selectedSound = null;
        return;
      }
      this.selectedSound = sound;
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

  watch: {},

  computed: {},
};
</script>

<style>
.input-container {
  display: flex;
  flex-direction: column;
  width: 92%;
  margin: auto;
  margin-top: 25px;
  border-radius: 10px;
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
  margin-bottom: 30px;
  border-radius: 10px;
  padding: 10px 15px 10px 10px;
}

.slider-container {
  justify-content: center;
  align-content: center;
  text-align: center;
  margin-top: 80px;
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
