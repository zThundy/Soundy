<template>
  <div class="page-container">
    <div class="bg">
      <div class="sounds-list">
        <div
          v-for="sound of sounds"
          v-bind:key="sound.name"
          @click="selectSound(sound)"
          class="sound"
          :class="{ 'selected': sound === selectedSound }"
        >
          <span class="title">{{ sound.name }}</span>
          <span class="description"><font-awesome-icon class="icon" icon="paperclip" /> {{ sound.description }}</span>
        </div>
      </div>
      <div class="sounds-info">
        <div v-if="selectedSound">
          <div>{{ selectedSound.name }}</div>
          <div>{{ selectedSound.path }}</div>
          <div>{{ selectedSound.volume }}</div>
          <div>{{ selectedSound.isPlaying }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sounds",
  data() {
    return {
      sounds: [
        {
          path: "C:/Users/username/Music/sound1.mp3",
          name: "Meme sound number one",
          description: "This is a description for the sound",
          volume: 0.5,
          isPlaying: false,
        },
        {
          path: "C:/Users/username/Music/sound2.mp3",
          name: "Very long name for a sound to add to this website",
          description: "This is a description for the sound",
          volume: 0.5,
          isPlaying: false,
        },
      ],
      selectedSound: null,
    };
  },

  methods: {
    selectSound(sound) {
      if (this.selectedSound !== null && sound.name === this.selectedSound.name) {
        this.selectedSound = null;
        return;
      }
      this.selectedSound = sound;
    }
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
  background-color: rgb(70, 70, 70);
  border-radius: 10px;
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

.sound {
  user-select: none;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  transition: all 0.1s ease-in-out;
  width: fit-content;
  border-radius: 10px;
  background-color: #333333;
  cursor: pointer;
  padding: 10px;
  min-width: 100%;
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

.selected {
  box-shadow: 0 0 1px 0 rgb(255, 255, 255);
  border: 1px rgba(255, 255, 255, 0.2) solid;
  background-color: rgba(87, 87, 87, 1);
}
</style>
