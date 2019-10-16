<template>
    <v-app>
        <v-app-bar app dark>
            <v-toolbar-title class="headline text-uppercase">
                <span>NODE SIMULATION</span>
                <span class="font-weight-light">&nbsp;UI</span>
                <span class="mr-2 appVersion">&nbsp;v{{ appVersion }}</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>

        <v-content>
            <Admin />
        </v-content>
    </v-app>
</template>

<script>
import Admin from './components/Admin';

export default {
    name: 'App',
    components: {
        Admin
    },
    data: () => ({
        appVersion: process.env.VUE_APP_VERSION || 0
    })
};
</script>

<style>
.appVersion {
    font-size: small !important;
    color: #ffee58;
}
</style>
