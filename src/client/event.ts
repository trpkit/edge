import {
  EventHandlers
} from "https://deno.land/x/discordeno@13.0.0-rc45/mod.ts";

// @ts-ignore - just to satisfy typescript
export interface ClientEvents extends EventHandlers {}

export interface EdgeEvent<E extends keyof ClientEvents> {
  (...args: Parameters<ClientEvents[E]>): unknown;
}
