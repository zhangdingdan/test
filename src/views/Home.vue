<template>
    <div class="home">
        <div  class="d-flex justify-center my-8">
            <span class="font-weight-light display-1" >SIIX </span>
            <span class="amber--text display-1" >AGT</span>
        </div>

        <h1 class="d-flex justify-center my-2">Welcome Siix-AGT!</h1>
    </div>
</template>
<script>
export default {
    sockets: {
        connect() {
        this.connection = true;
        },
        disconnect() {
        this.connection = false;
        }
    },
    
}
</script>

<style scoped>

</style>