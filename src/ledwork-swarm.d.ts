// The swarm comes from public/ledwork/ledwork-swarm.min.js, loaded in index.html.
interface LedworkSwarmHandle {
  config: Record<string, any>;
  supported: boolean;
  destroy(): void;
}

interface Window {
  LedworkSwarm?: {
    mount(container: HTMLElement | string, options?: Record<string, any>): LedworkSwarmHandle;
    readonly defaults: Record<string, any>;
  };
}
