<template>
  <div class="index-wrapper">
    <b-carousel
      :interval="4000"
      controls
      indicators
      fade
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
    >
    <b-carousel-slide
        v-for="(slider, index) of sliders"
        :key="index"
        :caption="slider.caption"
        :text="slider.text"
        :img-src="slider.imgSrc"
      ></b-carousel-slide>

    </b-carousel>

    <h1 class="text-center index-title">Randy
      <b-icon icon="exclamation-circle-fill" variant="success"></b-icon>
      <span class="badge badge-secondary">New</span>
    </h1>

    <div class="card-wrap a b c">
      <b-card-group v-for="(joke, index) of jokes" :key="index">
      <b-card
        title="Card Title"
        @click="viewJoke(joke)"
      >
        <b-card-text>
          {{joke}}
        </b-card-text>
      </b-card>
      </b-card-group>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      sliders: [
        {
          caption: "First slide",
          text: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
          imgSrc: "https://picsum.photos/1024/480/?image=52"
        },
        {
          caption: "Second slide",
          text: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
          imgSrc: "https://picsum.photos/1024/480/?image=53"
        },
        {
          caption: "Thrid slide",
          text: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
          imgSrc: "https://picsum.photos/1024/480/?image=54"
        }
      ],
      jokes:[
        "joke1",
        "joke2",
        "joke3",
        "joke4",
      ]
    }
  },
  methods: {
    viewJoke(joke) {
      this.$router.push({path: "/jokes", query: {name: joke}})
    }
  },
  asyncData({app, query, params}) {
    console.log(query, params)
    console.log("asyncData 只在服务端运行")
    app.$axios.get("http://jsonplaceholder.typicode.com/posts/1").then(res => {
      console.log(res.data)
    })
  },
  created() {
    console.log("created 服务端客户端都会运行")
  },
  mounted() {
    console.log("mounted 只在客户端运行")
  }
}
</script>
<style scoped lang="less">
.index-wrapper {
  .index-title {
    height: 80px;
    line-height: 80px;
  }

  .card-wrap {
    width: 92%;
    margin: 0 auto;
  }
}
</style>
