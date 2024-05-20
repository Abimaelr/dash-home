<template>
  <div class="about-page">
    <div class="header">
      <h1>About Us</h1>
      <!-- <img src="your-logo.png" alt="Company Logo" /> -->
    </div>

    <div class="content">
      <section class="intro">
        <h2>Welcome to Our Project</h2>
        <p>
          We develop smart devices capable of collecting temperature data and detecting smoke
          indications. Our devices, powered by ESP and equipped with DHT11 sensors, can detect early
          signs of fire in indoor environments.
        </p>
      </section>

      <section class="mission">
        <h2>Our Mission</h2>
        <p>
          Our primary goal is to contribute to fire prevention and rapid notification of authorities
          by detecting smoke and temperature variations. Additionally, our technology enables
          monitoring of usage patterns to identify potential fire risks, enhancing community safety.
        </p>
      </section>

      <section class="benefits">
        <h2>Benefits of Our Technology</h2>
        <ul>
          <li>Early fire detection</li>
          <li>Rapid notification of authorities</li>
          <li>Continuous monitoring of potential fire risks</li>
          <li>Enhanced community safety</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
.about-page {
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  /* padding: 20px; */
}

.header {
  /* display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; */
  /* margin-bottom: 30px; */
}

.header h1 {
  font-size: 28px;
}

.header img {
  width: 100px;
  height: auto;
}

.content {
  max-width: 800px;
  width: 100%;
}

.intro,
.mission,
.benefits {
  margin-bottom: 40px;
}

.intro h2,
.mission h2,
.benefits h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.intro p,
.mission p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 15px;
}

.benefits ul {
  list-style-type: none;
}

.benefits li {
  margin-bottom: 10px;
}

/* Add animations or additional styling as desired */
</style>
