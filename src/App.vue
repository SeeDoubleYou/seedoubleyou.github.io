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
  <a class="linkedin" href="https://www.linkedin.com/in/cees-willem-hofstede" target="_blank" rel="noopener" aria-label="LinkedIn">
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="3.5" fill="none" stroke="currentColor" stroke-width="1.6" />
      <circle cx="7.6" cy="7.4" r="1.45" fill="currentColor" />
      <rect x="6.35" y="10" width="2.5" height="7.6" fill="currentColor" />
      <path d="M11.2 10h2.4v1.1c.5-.8 1.5-1.3 2.6-1.3 2 0 3 1.2 3 3.5v4.3h-2.5v-3.9c0-1.1-.4-1.7-1.3-1.7s-1.7.6-1.7 1.8v3.8h-2.5z" fill="currentColor" />
    </svg>
  </a>
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

.linkedin {
  position: fixed;
  right: max(16px, env(safe-area-inset-right));
  bottom: max(12px, env(safe-area-inset-bottom));
  display: block;
  line-height: 0;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.3s ease;
}

.linkedin:hover,
.linkedin:focus-visible {
  color: rgba(255, 255, 255, 0.9);
}

.linkedin:focus-visible {
  outline: 1px solid currentColor;
  outline-offset: 3px;
}
</style>
