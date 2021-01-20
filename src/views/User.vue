<template>
    <div class="user">
        <h1> Date and Time: </h1>
        <v-spacer></v-spacer>

        <v-card-text width="200px" height="200px" color="blue">
            <v-text-field :value="range" slot="activator" label="date" prepend-icon="mdi-calendar" ></v-text-field>
            <v-date-picker v-model="range"></v-date-picker>
        </v-card-text>
        
    </div>
</template>

<script>

export default {
    data() {
        return {
            range: null
        }
    }
}
</script>
