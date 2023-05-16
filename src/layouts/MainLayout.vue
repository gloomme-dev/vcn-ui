<template>
  <q-layout view="lHh Lpr lFf" class="bg-white">
    <q-header class="bg-info text-primary q-pa-sm">
      <q-toolbar>
        <q-btn v-if="$route.meta.title==='Register'" dense flat round icon="chevron_left" @click="$router.go(-1)" >
          <q-tooltip>Back</q-tooltip>
        </q-btn>
        <q-avatar    size="44px" >
          <q-img style="width: 70%" :ratio="1" alt="logo"  src="img/logo.png" />
        </q-avatar>
        <q-toolbar-title class="text-red text-weight-bolder">
          Veterinary Council of Nigeria
        </q-toolbar-title>


<!--        <q-btn-dropdown round content-style="border-radius: 10.7px" content-class="dropdown-shadow q-mt-sm" stretch flat label="Crater365" transition-show="jump-up" transition-hide="jump-up">-->
<!--          <q-card  >-->
<!--            <q-list  class="bg-white" >-->
<!--              <q-item v-for="(item, index) in craterApps " :key="index" clickable v-ripple class="item-elavated">-->
<!--                <q-item-section avatar class="q-pl-sm">-->
<!--                  <q-avatar color="grey-2">-->
<!--                    <q-icon :color="item.color" class="radius-card" :name="item.icon" />-->
<!--                  </q-avatar>-->
<!--                </q-item-section>-->
<!--                <q-item-section class="">-->
<!--                  {{ item.name }}-->
<!--                  <q-item-label caption>-->
<!--                    {{ item.description }}-->
<!--                  </q-item-label>-->
<!--                </q-item-section>-->

<!--                <q-item-section  avatar>-->
<!--                  <q-icon name="chevron_right" />-->
<!--                </q-item-section>-->
<!--              </q-item>-->
<!--            </q-list>-->

<!--          </q-card>-->
<!--        </q-btn-dropdown>-->
<!--        <q-separator dark vertical />-->
<!--        <q-btn stretch flat label="About" />-->
<!--        <q-separator dark vertical />-->
<!--        <q-btn stretch  :to="{ name: 'login' }" flat label="Login" />-->
      </q-toolbar>
    </q-header>
    <q-footer  class=" text-center bg-white text-blue">
      <q-toolbar>

        <q-toolbar-title class="text-subtitle2" >
          {{ `   Powered By   ` }}
          <q-avatar size="100px" >
            <q-img style="width: 100%"   alt="Crate365  logo"  src="https://res.cloudinary.com/galaxycom/image/upload/v1681513241/carter365_hxted2.png" />
          </q-avatar>
<!--  copy right and year-->

        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
.shadow-12dp{
  box-shadow: 0px 24px 40px rgba(0, 0, 0, 0.05), 0px 4px 8px -4px rgba(0, 0, 0, 0.02), inset 0px 2px 0px rgba(255, 255, 255, 0.25);
}
header{
  /*box-shadow: 0px 24px 40px rgba(0, 0, 0, 0.05), 0px 4px 8px -4px rgba(0, 0, 0, 0.02), inset 0px 2px 0px rgba(255, 255, 255, 0.25);*/
  /*border-radius: 12px;*/
}
.dropdown-shadow{
  box-shadow: 0px 24px 40px rgba(0, 0, 0, 0.05), 0px 4px 8px -4px rgba(0, 0, 0, 0.02), inset 0px 2px 0px rgba(255, 255, 255, 0.25);
}
</style>
<script>

export default {
  // components: { NotificationBox },
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {

  },
}
</script>
