<template>
  <div class="page-container">
    <div class="bg" v-if="sounds">
      <div class="sounds-list">
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
        <div v-if="selectedSound" class="sound-infoes-container">
          <div class="input-container">
            <label class="label">Sound Name:</label>
            <input v-model="selectedSound.name" maxlength="40" placeholder="Type the name of your sound file (max 40)"/>
            <label class="label">Sound Description:</label>
            <input v-model="selectedSound.description" maxlength="80" placeholder="Type the description of your sound file (max 80)"/>
          </div>

          <label class="label">Volume:</label>
          <div class="slidecontainer">
            <input v-model="selectedSound.volume" type="range" min="1" max="100" class="slider">
            <span style="width: 50px; text-align: center;">{{ (selectedSound.volume) }}%</span>
          </div>

          <div class="save-button" @click="saveSound(selectedSound)">
            <span class="save-button-text"><font-awesome-icon class="icon" icon="floppy-disk" /> Save</span>
          </div>
        </div>
        <div v-else class="sound-infoes-container" style="margin: auto;">
          <div style="text-align: center;">Select a sound</div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="loading">
        <font-awesome-icon class="icon" icon="spinner" spin />
      </div>
    </div>
  </div>
</template>

<script>
import emitter from "tiny-emitter/instance";

export default {
  name: "sounds",
  data() {
    if (process.env.NODE_ENV === "development")
      return {
        sounds: [
          {
            id: "b22bbdf0-8d82-41c1-b7d2-5e93ad632c27",
            path: "C:/Users/username/Music/sound1.mp3",
            name: "Meme sound number one",
            description: "This is a description for the sound",
            volume: 30,
            isPlaying: false,
          },
          {
            id: "67a92512-1237-4dd3-a63c-3d7a6c0d8f40",
            path: "C:/Users/username/Music/sound2.mp3",
            name: "Emotional damage",
            description: "This is a description for the sound",
            volume: 70,
            isPlaying: false,
          },
          {
            id: "850a518f-9e6e-4552-9b49-afd80b687839",
            path: "C:/Users/username/Music/sound3.mp3",
            name: "Very long name for a sound to add to this website, and still adding shit to see how the container behaves",
            description: "This is a description for the sound",
            volume: 95,
            isPlaying: false,
          },
          {
            id: "7ff7233d-7c0a-4f5f-ae93-fca9a2f75d76",
            path: "C:/Users/username/Music/sound3.mp3",
            name: "Very long name for a sound to add to this website, and still adding shit to see how the container behaves",
            description: "This is a description for the sound",
            volume: 10,
            isPlaying: false,
          },
          {
            id: "2a181a1f-ad47-4f45-8611-e05cffdb0b51",
            path: "C:/Users/username/Music/sound3.mp3",
            name: "Very long name for a sound to add to this website, and still adding shit to see how the container behaves",
            description: "This is a description for the sound",
            volume: 99,
            isPlaying: false,
          },
        ],
        selectedSound: null,
      };
    else
      return {
        sounds: null,
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
      emitter.emit("notif", {
        message: 'Sound "' + sound.name + '" saved!',
        type: "success",
      });
    },
  },

  watch: {
  },

  computed: {
  },
};
</script>

<style scoped>
.page-container {
  height: 100%;
  width: 80vw;
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
  margin-bottom: 30px;
  background-color: rgb(70, 70, 70);
  border-radius: 10px;
}

.loading {
  display: flex;
  flex-direction: row;
  height: 50vh;
  width: 100%;
  margin-top: 25px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(70, 70, 70);
  color: rgb(247, 92, 255);
  border-radius: 10px;
  font-size: 4em;
  justify-content: center;
  align-items: center;
  background-size: 400% 400%;
	animation: colorShift 5s ease infinite;
}

/* keyframes to animate color change of spinner */
@keyframes colorShift {
  0% {
    color: rgb(247, 92, 255);
  }
  50% {
    color: rgb(163, 55, 167);
  }
  100% {
    color: rgb(247, 92, 255);
  }
}

.input-container {
  display: flex;
  flex-direction: column;
  height: 250px;
  width: 100%;
  margin-top: 25px;
  margin-right: auto;
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
  width: 95%;
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
  background-color: #333333;
  margin-right: auto;
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
  padding: 10px;
  width: 95%;
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

.save-button {
  user-select: none;
  transition: all 0.1s ease-in-out;
  border-radius: 10px;
  padding: 10px 15px 10px 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: rgb(180, 0, 190);
  cursor: pointer;
  width: fit-content;
  color: white;
  text-align: center;
}

.save-button:hover {
  transition: all 0.1s ease-in-out;
  background-color: rgb(176, 49, 185);
  color: white;
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
</style>
