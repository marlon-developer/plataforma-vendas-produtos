<script>
export default {
  name: 'footer-component',

  data() {
    return {
      base_url: process.env.VUE_APP_API_URL
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  background: #b9e2fc;
  color: black;
}
</style>
