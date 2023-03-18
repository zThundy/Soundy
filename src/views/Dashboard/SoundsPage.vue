<template>
  <div class="bg" v-if="sounds.length > 0">
    <v-list class="sounds-list" lines="three">
      <v-list-item
        v-for="(sound, i) in sounds"
        :key="i"
        :title="(sound.changed ? '* ' + sound.name : sound.name) || 'No name provided'"
        :subtitle="sound.description || 'No description provided'"
        :value="sound.id"
        class="sound"
        active-color="primary"
        @click="select(sound, i)"
      >
      <template v-slot:append>
        <v-icon
          icon="mdi-movie-open-edit"
        ></v-icon>
      </template>
      </v-list-item>
    </v-list>

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

          <v-textarea
            label="Sound Description"
            v-model="selectedSound.description"
            placeholder="Type the description of your sound file"
            :counter="80"
            variant="solo"
          ></v-textarea>

          <v-text-field
            label="Points needed"
            v-model="selectedSound.points"
            type="number"
            variant="solo"
          ></v-text-field>
        </div>

        <div class="color-picker-container">
          <v-color-picker
            class="ma-2"
            v-model="selectedSound.color"
            :modes="['rgb']"
          ></v-color-picker>
        </div>

        <v-divider style="margin-top: 30px; margin-bottom: 30px; width: 90%; margin-left: auto; margin-right: auto;" :thickness="2"></v-divider>

        <div class="slider-container">
          <v-slider
            :thumb-color="selectedSound.color"
            label="Volume"
            v-model="selectedSound.volume"
            :min="1"
            :max="100"
            thumb-label
            step="1"
          ></v-slider>
        </div>

        <div class="audio-player-container">
          <AudioPlayer
            :file="selectedSound.path"
            :volume="selectedSound.volume / 100"
          ></AudioPlayer>
        </div>

        <v-divider style="margin-top: 30px; margin-bottom: 30px; width: 90%; margin-left: auto; margin-right: auto;" :thickness="2"></v-divider>

        <div class="buttons-container">
          <v-btn
            style="margin-left: 40px; margin-right: 40px;"
            @click="saveSound(selectedSound)"
            :color="selectedSound.color"
            prepend-icon="mdi-floppy"
            size="large"
          >Save</v-btn>

          <v-btn
            style="margin-left: 40px; margin-right: 40px;"
            @click="deleteSound(selectedSound)"
            prepend-icon="mdi-delete"
            color="red"
            size="large"
          >Delete</v-btn>
        </div>
      </div>

      <div
        v-else
        class="sound-infoes-container"
        style="margin: auto; width: 95%"
      >
        <div style="text-align: center" v-if="sounds.length > 0">
          Select a sound
        </div>
      </div>
    </div>
  </div>
  <div style="text-align: center; margin-top: 30px; margin-bottom: 30px;" v-else>
    <v-progress-circular indeterminate :size="70" :width="5" color="rgb(247, 92, 255)"></v-progress-circular>
  </div>
</template>

<script>
import { getCachedSounds } from "./../../apis/SoundsGetterAPI.js";
import AudioPlayer from "../../components/AudioPlayer.vue";

export default {
  components: { AudioPlayer },
  name: "SoundsPage",
  inject: ["$emitter"],
  // async setup() {
  //   var sounds = await getCachedSounds()
  //   for (var i in sounds) sounds.index = i;
  //   return { sounds, selectedSound: null };
  // },

  data() {
    return { sounds: [], selectedSound: null };
  },

  methods: {
    select(sound, index) {
      if (this.selectedSound !== null && sound.id === this.selectedSound.id) {
        this.selectedSound = null;
        return;
      }
      sound.index = index;
      this.selectedSound = sound;
    },
    saveSound(sound) {
      // TODO: Save sound
      this.$emitter.emit("notif", {
        message: 'Sound "' + sound.name + '" saved!',
        type: "success",
      });
      // this.sounds.set(this.sounds, sound.index, sound);
      this.sounds.splice(sound.index, 1, sound);
      // if (this.sounds[i].id === sound.id) this.sounds[i] = sound;
    },
    deleteSound(sound) {
      this.sounds.splice(sound.index, 1);
      this.selectedSound = null;
      // TODO: Delete sound
      this.$emitter.emit("notif", {
        message: 'Sound "' + sound.name + '" deleted!',
        type: "success",
      });
    },
    activateUploader() {
      this.$emitter.emit("toggle-uploader", true);
    },
    reload() {
      window.location.reload();
    },
    playSound(sound) {
      console.log("playing")
      console.log(sound)
    }
  },

  watch: {
    'selectedSound.name'(newValue) {
      if (this.selectedSound)
        if (this.sounds[this.selectedSound.index].name !== newValue) {
          this.sounds[this.selectedSound.index].changed = true;
        }
    }
  },

  computed: {},

  mounted() {
    getCachedSounds()
      .then(sounds => {
        for (var i in sounds) {
          sounds[i].index = i
          sounds[i].changed = false;
          sounds[i].playing = false;
        };
        this.sounds = sounds;
      });
  }
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

.bg {
  display: flex;
  flex-direction: row;
  height: 95%;
  width: 95%;
  margin-top: 55px;
  margin-bottom: 55px;
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
  background-color: rgba(0, 0, 0, 0);
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
  margin: auto;
  margin-top: 5px;
  margin-bottom: 10px;
  transition: all 0.1s ease-in-out;
  border-radius: 10px;
  background-color: #333333;
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

.color-picker-container {
  margin: auto;
  width: 95%;
}

.audio-player-container {
  margin: auto;
  width: 95%;
}

.buttons-container {
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  justify-content: center;
}

.slider-container {
  justify-content: center;
  align-content: center;
  text-align: center;
  margin: auto;
  width: 95%;
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
