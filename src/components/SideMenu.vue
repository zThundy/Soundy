<template>
  <div class="menu-container" :class="{ 'collapsed': collapsed }">
    <div style="width: 100%; text-align: center;"><img src="/assets/logo-500x500.png" /></div>

    <div class="elem-container">
      <div
        v-for="element of elementsTop"
        v-bind:key="element.path"
        class="elem"
        @click="changePath(element.path)"
        :class="{ 'selected': element.selected }"
        :style="[element.color ? { color: element.color } : {}]"
      >
        <font-awesome-icon :icon="element.icon" />
        <span :class="{ 'collapsed': collapsed }">{{ element.text }}</span>
      </div>
    </div>

    <div style="justify-content: flex-end;" class="elem-container">
      <div
        v-for="element of elementsBottom"
        v-bind:key="element.text"
        class="elem"
        @click="execute(element)"
        :style="[element.color ? { color: element.color } : {}]"
      >
        <font-awesome-icon :icon="element.icon" />
        <span :class="{ 'collapsed': collapsed }">{{ element.text }}</span>
      </div>
    </div>

    <!-- create social links footer -->
    <div class="footer-links" :style="[ collapsed ? { height: '22%' } : {} ]">
      <div class="social-links" :style="[ collapsed ? { 'flex-direction': 'column', 'justify-content': 'flex-start' } : {} ]">
        <a href="https://github.com/zthundy" target="_blank">
          <font-awesome-icon icon="fa-brands fa-github" />
        </a>
        <a href="https://twitch.tv/zthundy__" target="_blank">
          <font-awesome-icon icon="fa-brands fa-twitch" />
        </a>
        <a href="https://twitter.com/zthundy__" target="_blank">
          <font-awesome-icon icon="fa-brands fa-twitter" />
        </a>
      </div>
    </div>

    <!-- <div style="justify-content: flex-end; height: 10%;" class="elem-container">
      <div class="elem">
        <font-awesome-icon icon="fa-brands fa-github" />
        <font-awesome-icon icon="fa-brands fa-twitch" />
        <font-awesome-icon icon="fa-brands fa-twitter" />
      </div>
    </div> -->
  </div>
</template>

<script>
// import { watch } from "vue";
import { useRoute, /* useRouter */ } from 'vue-router'

export default {
  name: "SideMenu",
  data() {
    // const router = useRouter()
    const page = useRoute();

    const routes = this.$router.options.routes
    var elementsTop = [];
    for (const route of routes) {
      if (route.name === "dashboard") {
        for (const children of route.children) {
          elementsTop.push({
            name: children.name,
            path: "/dashboard/" + page.params.id + "/" + children.path,
            text: (children.name.charAt(0).toUpperCase() + children.name.slice(1)).replace(/([-])/g, " ").trim(),
            icon: children.icon,
          })
        }
      }
    }

    return {
      collapsed: false,
      elementsTop,
      elementsBottom: [
        {
          icon: "arrow-left",
          text: "Collapse",
        },
        {
          icon: "right-from-bracket",
          text: "Log out",
          color: "rgb(255, 0, 0)",
        },
      ],
    };
  },

  watch: {
    // watch for changes in route
    $route() {
      // change selected element
      this.changeSelected();
    },
  },

  mounted() {
    // change selected element
    this.changeSelected();
  },
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },

  methods: {
    myEventHandler() {
      if (window.innerWidth < 1400) {
        this.collapsed = true;
      } else {
        this.collapsed = false;
      }
      if (this.collapsed) this.elementsBottom[0].icon = "arrow-right"; else this.elementsBottom[0].icon = "arrow-left";
    },
    changeSelected() {
      // change selected element
      for (var i in this.elementsTop) {
        // trim and replace all spaces with dashes
        if (this.$route.name === this.elementsTop[i].text.trim().replace(/\s+/g, "-").toLowerCase()) {
          this.elementsTop[i].selected = true;
        } else {
          this.elementsTop[i].selected = false;
        }
      }
    },
    execute(element) {
      if (element.text === "Collapse") {
        this.collapsed = !this.collapsed;
        // rotate by 180deg the arrow
        if (this.collapsed) element.icon = "arrow-right"; else element.icon = "arrow-left";
      } else if (element.text === "Log out") {
        // this.$cookies.remove("token");
        this.$router.push("/");
      }
    },
    // change path of child component
    changePath(path) {
      if (!path) return;
      this.$router.push(path);
    },
  },
};
</script>

<style>
.menu-container {
  user-select: none;
  overflow: hidden;
  top: 0;
  bottom: 0;
  position: sticky;
  height: 100vh;
  width: 15%;
  max-width: 16.5rem;
  min-width: 4.25rem;
  z-index: 1;
  /* make background gradient */
  background: linear-gradient(
    130deg,
    rgb(170, 126, 173) 0%,
    rgb(163, 90, 163) 20%,
    rgb(94, 15, 83) 100%
  );
  /* border-right: 4px solid rgb(85, 5, 70); */
  transition: all 0.2s ease-in-out;
}

.menu-container.collapsed {
  width: 80px;
  min-width: 80px;
}

span {
  transition: all 0.2s ease-in-out;
  margin-left: 10px;
  font-size: 1.3em;
  opacity: 1;
}

span.collapsed {
  transition: all 0.2s ease-in-out;
  font-size: 0;
  opacity: .3em;
}

.elem-container {
  display: flex;
  flex-direction: column;
  height: 36%;
  width: 95%;
  margin: auto;
}

.elem {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 90%;
  cursor: pointer;
  /* border: 1px rgba(255, 255, 255, 0.2) solid; */
  border-radius: 0 20px 20px 0;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
  /* box-shadow: 0 0 5px 0 rgb(255, 255, 255); */
}

/* only trigger hover when does not have selected class */
.elem:not(.selected):hover {
  /* box-shadow: 0 0 10px 0 rgb(255, 255, 255); */
  border: 1px rgba(255, 255, 255, 0.2) solid;
  background-color: rgba(29, 0, 29, .1);
}

.selected {
  box-shadow: 0 0 1px 0 rgb(255, 255, 255);
  border: 1px rgba(255, 255, 255, 0.2) solid;
  background-color: rgba(29, 0, 29, .2);
}

img {
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}

.footer-links {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 12%;
  width: 100%;
}

.social-links {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}

.social-links a {
  margin: auto;
  color: rgb(168, 168, 168);
  font-size: 2em;
}

/* make different bg colors on hover */
.social-links a:nth-child(1):hover {
  color: rgb(255, 255, 255);
}

.social-links a:nth-child(2):hover {
  color: #a970ff;
}

.social-links a:nth-child(3):hover {
  color: rgb(47, 154, 226);
}
</style>
