import { log } from "../compositions/Logger.js";

var sounds = null;
if (process.env.NODE_ENV === "development" && true) {
  sounds = [
    {
      id: "b22bbdf0-8d82-41c1-b7d2-5e93ad632c27",
      path: "C:/Users/username/Music/sound1.mp3",
      name: "Meme sound number one",
      description: "This is a description for the sound",
      volume: 30,
      points: 80,
      isPlaying: false,
    },
    {
      id: "67a92512-1237-4dd3-a63c-3d7a6c0d8f40",
      path: "C:/Users/username/Music/sound2.mp3",
      name: "Emotional damage",
      description: "This is a description for the sound",
      volume: 70,
      points: 100,
      isPlaying: false,
    },
    {
      id: "850a518f-9e6e-4552-9b49-afd80b687839",
      path: "C:/Users/username/Music/sound3.mp3",
      name: "Very long name for a sound to add to this website, and still adding shit to see how the container behaves",
      description: "This is a description for the sound",
      volume: 95,
      points: 200,
      isPlaying: false,
    },
    {
      id: "7ff7233d-7c0a-4f5f-ae93-fca9a2f75d76",
      path: "C:/Users/username/Music/sound3.mp3",
      name: "Very long name for a sound to add to this website, and still adding shit to see how the container behaves",
      description: "This is a description for the sound",
      volume: 10,
      points: 20,
      isPlaying: false,
    },
    {
      id: "2a181a1f-ad47-4f45-8611-e05cffdb0b51",
      path: "C:/Users/username/Music/sound3.mp3",
      name: "Very long name for a sound to add to this website, and still adding shit to see how the container behaves",
      description: "This is a description for the sound",
      volume: 99,
      points: 90,
      isPlaying: false,
    },
    {
      id: "2a181a1f-ad47-4f45-8611-e05cffd30b51",
      path: "C:/Users/username/Music/sound3.mp3",
      name: "Very long name for a sound to add to this website, and still adding shit to see how the container behaves",
      description: "This is a description for the sound",
      volume: 99,
      points: 90,
      isPlaying: false,
    },
    {
      id: "21181a1f-ad47-4f45-8611-e05cffd30b51",
      path: "C:/Users/username/Music/sound3.mp3",
      name: "Very long name for a sound to add to this website, and still adding shit to see how the container behaves",
      description: "This is a description for the sound",
      volume: 99,
      points: 90,
      isPlaying: false,
    },
    {
      id: "21181a1f-ad47-4f45-8611-e05cffd30b59",
      path: "C:/Users/username/Music/sound3.mp3",
      name: "Very long name for a sound to add to this website, and still adding shit to see how the container behaves",
      description: "This is a description for the sound",
      volume: 99,
      points: 90,
      isPlaying: false,
    },
    {
      id: "21181a1a-ad47-4f45-8611-e05cffd30b59",
      path: "C:/Users/username/Music/sound3.mp3",
      name: "Very long name for a sound to add to this website, and still adding shit to see how the container behaves",
      description: "This is a description for the sound",
      volume: 99,
      points: 90,
      isPlaying: false,
    },
  ];
} else {
  sounds = null;
}

export async function getCachedSounds() {
  if (sounds) {
    return sounds;
  }
  await _getSounds();
  return sounds;
}

async function _getSounds() {
  // make request to server to get all uploaded sounds
  await fetch("http://localhost:3000/sounds", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(),
  })
    .then((response) => response.json())
    .then((data) => {
      sounds = data;
    })
    .catch((error) => {
      const logId = log("Error getting sounds from server", error);
      console.error("Error:", error);
      sounds =
        "There has been an error, please try again Later. If the problem persists, please contact the administrator. Error ID: " +
        logId;
    });
}
