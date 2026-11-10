<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import swarmConfig from './swarm-config';

const stage = ref<HTMLElement>();
let swarm: LedworkSwarmHandle | undefined;

onMounted(() => {
  if (stage.value && window.LedworkSwarm) swarm = window.LedworkSwarm.mount(stage.value, swarmConfig);
});
onBeforeUnmount(() => swarm?.destroy());
</script>

<template>
  <div class="stage" ref="stage"></div>
  <div class="site-name">seedoubleyou.dev</div>
</template>

<style scoped>
.stage {
  position: fixed;
  inset: 0;
}

.site-name {
  position: fixed;
  left: max(16px, env(safe-area-inset-left));
  bottom: max(14px, env(safe-area-inset-bottom));
  font-size: 14px;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.6);
  pointer-events: none;
  user-select: none;
}
</style>
