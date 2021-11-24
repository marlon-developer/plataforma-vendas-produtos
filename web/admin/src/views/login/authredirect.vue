<script>
    export default {
        name: 'AuthRedirect',
        created() {
            window.opener.location.href = `${window.location.origin}/login#${window.location.search.slice(1)}`
            window.close()
        }
    }
</script>
