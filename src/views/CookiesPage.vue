<script>
export default {
  data() {
    return {};
  },

  methods: {
    scrollToBottom() {
      this.$refs["bottom"].scrollIntoView({ behavior: "smooth" });
      // remove class from element "down-arrow"
      this.$refs["arrow"].classList.remove("show");
      this.$refs["arrow"].classList.add("hide");
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="back-text-container">
      <RouterLink class="back-text" to="/">
        <v-icon icon="mdi-arrow-left" class="icon"></v-icon>
        <span>Back to soundy</span>
      </RouterLink>
    </div>
    <div class="text-container">
      <h1>Cookie Policy for Soundy</h1>

      <p>This is the Cookie Policy for Soundy, accessible from soundy.com</p>

      <p><strong>What Are Cookies</strong></p>

      <p>
        As is common practice with almost all professional websites this site
        uses cookies, which are tiny files that are downloaded to your computer,
        to improve your experience. This page describes what information they
        gather, how we use it and why we sometimes need to store these cookies.
        We will also share how you can prevent these cookies from being stored
        however this may downgrade or 'break' certain elements of the sites
        functionality.
      </p>

      <p><strong>How We Use Cookies</strong></p>

      <p>
        We use cookies for a variety of reasons detailed below. Unfortunately in
        most cases there are no industry standard options for disabling cookies
        without completely disabling the functionality and features they add to
        this site. It is recommended that you leave on all cookies if you are
        not sure whether you need them or not in case they are used to provide a
        service that you use.
      </p>

      <p><strong>Disabling Cookies</strong></p>

      <p>
        You can prevent the setting of cookies by adjusting the settings on your
        browser (see your browser Help for how to do this). Be aware that
        disabling cookies will affect the functionality of this and many other
        websites that you visit. Disabling cookies will usually result in also
        disabling certain functionality and features of the this site. Therefore
        it is recommended that you do not disable cookies. This Cookies Policy
        was created with the help of the
        <a
          class="back-text"
          href="https://www.cookiepolicygenerator.com/cookie-policy-generator/"
          >Cookies Policy Generator</a
        >.
      </p>
      <p><strong>The Cookies We Set</strong></p>

      <ul>
        <li>
          <p>Account related cookies</p>
          <p>
            If you create an account with us then we will use cookies for the
            management of the signup process and general administration. These
            cookies will usually be deleted when you log out however in some
            cases they may remain afterwards to remember your site preferences
            when logged out.
          </p>
        </li>

        <li>
          <p>Login related cookies</p>
          <p>
            We use cookies when you are logged in so that we can remember this
            fact. This prevents you from having to log in every single time you
            visit a new page. These cookies are typically removed or cleared
            when you log out to ensure that you can only access restricted
            features and areas when logged in.
          </p>
        </li>

        <li>
          <p>Email newsletters related cookies</p>
          <p>
            This site offers newsletter or email subscription services and
            cookies may be used to remember if you are already registered and
            whether to show certain notifications which might only be valid to
            subscribed/unsubscribed users.
          </p>
        </li>

        <li>
          <p>Forms related cookies</p>
          <p>
            When you submit data to through a form such as those found on
            contact pages or comment forms cookies may be set to remember your
            user details for future correspondence.
          </p>
        </li>

        <li>
          <p>Site preferences cookies</p>
          <p>
            In order to provide you with a great experience on this site we
            provide the functionality to set your preferences for how this site
            runs when you use it. In order to remember your preferences we need
            to set cookies so that this information can be called whenever you
            interact with a page is affected by your preferences.
          </p>
        </li>
      </ul>

      <p><strong>Third Party Cookies</strong></p>
      <p>
        In some special cases we also use cookies provided by trusted third
        parties. The following section details which third party cookies you
        might encounter through this site.
      </p>

      <ul>
        <li>
          <p>
            This site uses Google Analytics which is one of the most widespread
            and trusted analytics solution on the web for helping us to
            understand how you use the site and ways that we can improve your
            experience. These cookies may track things such as how long you
            spend on the site and the pages that you visit so we can continue to
            produce engaging content.
          </p>
          <p>
            For more information on Google Analytics cookies, see the official
            Google Analytics page.
          </p>
        </li>

        <li>
          <p>
            Third party analytics are used to track and measure usage of this
            site so that we can continue to produce engaging content. These
            cookies may track things such as how long you spend on the site or
            pages you visit which helps us to understand how we can improve the
            site for you.
          </p>
        </li>

        <li>
          <p>
            From time to time we test new features and make subtle changes to
            the way that the site is delivered. When we are still testing new
            features these cookies may be used to ensure that you receive a
            consistent experience whilst on the site whilst ensuring we
            understand which optimisations our users appreciate the most.
          </p>
        </li>

        <li>
          <p>
            As we sell products it's important for us to understand statistics
            about how many of the visitors to our site actually make a purchase
            and as such this is the kind of data that these cookies will track.
            This is important to you as it means that we can accurately make
            business predictions that allow us to monitor our advertising and
            product costs to ensure the best possible price.
          </p>
        </li>

        <li>
          <p>
            The Google AdSense service we use to serve advertising uses a
            DoubleClick cookie to serve more relevant ads across the web and
            limit the number of times that a given ad is shown to you.
          </p>
          <p>
            For more information on Google AdSense see the official Google
            AdSense privacy FAQ.
          </p>
        </li>

        <li>
          <p>
            We use adverts to offset the costs of running this site and provide
            funding for further development. The behavioural advertising cookies
            used by this site are designed to ensure that we provide you with
            the most relevant adverts where possible by anonymously tracking
            your interests and presenting similar things that may be of
            interest.
          </p>
        </li>
      </ul>
      <p><strong>More Information</strong></p>

      <p>
        Hopefully that has clarified things for you and as was previously
        mentioned if there is something that you aren't sure whether you need or
        not it's usually safer to leave cookies enabled in case it does interact
        with one of the features you use on our site.
      </p>
      <p>
        For more general information on cookies, please read
        <a
          class="back-text"
          href="https://www.cookiepolicygenerator.com/sample-cookies-policy/"
          >the Cookies Policy article</a
        >.
      </p>
      <p>
        However if you are still looking for more information then you can
        contact us through one of our preferred contact methods:
      </p>

      <h1 ref="bottom">Contact email</h1>

      <ul>
        <li>Email: test@example.com</li>
      </ul>
    </div>
    <div ref="arrow" class="down-arrow show" @click="scrollToBottom">
      <v-icon icon="mdi-arrow-down"></v-icon>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 70%;
  margin: 0 auto;
  padding: 30px;
  max-height: 900px;
  border-radius: 15px;
  border: 1px solid hsl(220, calc(1 * 7.7%), 15%);
  /* add black shadow behind */
  box-shadow: 0 0 10px 0 hsl(220, calc(1 * 7.7%), 15%);
  background-color: hsl(220, calc(1 * 7.7%), 22.9%);
  /* fit content in container */
  overflow: auto;

  animation: showAnim 0.5s ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes showAnim {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.text-container {
  border-radius: 15px;
  padding: 30px;
  background-color: hsl(220, calc(1 * 7.7%), 20%);
}

/* restyle the scrolling bar */
::-webkit-scrollbar {
  display: none;
}

/* make an arrow that sits in the middle of the container */
.down-arrow {
  transition: all 0.2s ease-in-out;
  position: fixed;
  bottom: 5%;
  left: 50%;
  width: 80px;
  height: 80px;
  background-color: rgb(181, 101, 187);
  border-radius: 50px;
  opacity: 0;
  cursor: pointer;
}

.down-arrow:hover {
  transition: all 0.2s ease-in-out;
  background-color: rgb(246, 124, 255);
}

.show {
  animation: showAnim 0.5s ease-in-out;
  animation-fill-mode: forwards;
}

.hide {
  animation: hideAnim 0.5s ease-in-out;
  animation-fill-mode: forwards;
}

/* put content of down-arrow container in the middle */
.down-arrow > * {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 40px;
}

@keyframes showAnim {
  0% {
    bottom: 5%;
    opacity: 0;
  }
  100% {
    bottom: 8%;
    opacity: 1;
  }
}

@keyframes hideAnim {
  0% {
    bottom: 8%;
    opacity: 1;
  }
  100% {
    bottom: 5%;
    opacity: 0;
  }
}

.back-text-container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-bottom: 2%;
  z-index: 1;
  text-align: center;
  font-size: 2em;
}

.back-text {
  transition: all 0.1s ease-in-out;
  color: rgb(181, 101, 187);
  position: relative;
  top: 50%;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
}

.back-text:hover {
  transition: all 0.1s ease-in-out;
  text-decoration: underline;
  color: rgb(246, 124, 255);
}

.back-text:hover .icon {
  transition: all 0.1s ease-in-out;
  color: rgb(246, 124, 255);
  margin-right: 2%;
}

.icon {
  transition: all 0.1s ease-in-out;
  margin-right: 1%;
}
</style>
