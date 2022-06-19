import {
  Bot,
  Channel,
  Collection,
  DiscordEmoji,
  DiscordGatewayPayload,
  DiscordReady,
  Emoji,
  Guild,
  Integration,
  Interaction,
  Invite,
  Member,
  Message,
  PresenceUpdate,
  Role,
  ScheduledEvent,
  ThreadMember,
  User,
  VoiceState,
} from "https://deno.land/x/discordeno@13.0.0-rc45/mod.ts";

interface ThreadMemberUpdatePayload {
  id: bigint;
  guildId: bigint;
  joinedAt: number;
  flags: number;
}

interface ThreadMembersUpdatePayload {
  id: bigint;
  guildId: bigint;
  addedMembers?: ThreadMember[];
  removedMemberIds?: bigint[];
}

interface ScheduledEventUserAddPayload {
  guildScheduledEventId: bigint;
  guildId: bigint;
  userId: bigint;
}

interface ScheduledEventUserRemovePayload {
  guildScheduledEventId: bigint;
  guildId: bigint;
  userId: bigint;
}

interface ReadyPayload {
  shardId: number;
  v: number;
  user: User;
  guilds: bigint[];
  sessionId: string;
  shard?: number[];
  applicationId: bigint;
}

interface IntegrationDeletePayload {
  id: bigint;
  guildId: bigint;
  applicationId?: bigint;
}

interface IntegrationUpdatePayload {
  guildId: bigint;
}

interface InviteDeletePayload {
  channelId: bigint;
  guildId?: bigint;
  code: string;
}

interface MessageDeletePayload {
  id: bigint;
  channelId: bigint;
  guildId?: bigint;
}

interface MessageDeleteBulkPayload {
  ids: bigint[];
  channelId: bigint;
  guildId?: bigint;
}

interface ReactionAddPayload {
  userId: bigint;
  channelId: bigint;
  messageId: bigint;
  guildId?: bigint;
  member?: Member;
  user?: User;
  emoji: Emoji;
}

interface ReactionRemovePayload {
  userId: bigint;
  channelId: bigint;
  messageId: bigint;
  guildId?: bigint;
  emoji: Emoji;
}

interface ReactionRemoveEmojiPayload {
  channelId: bigint;
  messageId: bigint;
  guildId?: bigint;
  emoji: Emoji;
}

interface ReactionRemoveAllPayload {
  channelId: bigint;
  messageId: bigint;
  guildId?: bigint;
}

interface VoiceServerUpdatePayload {
  token: string;
  endpoint?: string;
  guildId: bigint;
}

interface ChannelPinsUpdatePayload {
  guildId?: bigint;
  channelId: bigint;
  lastPinTimestamp?: number;
}

interface StageInstanceCreatePayload {
  id: bigint;
  guildId: bigint;
  channelId: bigint;
  topic: string;
}

interface StageInstanceDeletePayload {
  id: bigint;
  guildId: bigint;
  channelId: bigint;
  topic: string;
}

interface StageInstanceUpdatePayload {
  id: bigint;
  guildId: bigint;
  channelId: bigint;
  topic: string;
}

interface GuildEmojisUpdatePayload {
  guildId: bigint;
  emojis: Collection<bigint, DiscordEmoji>;
}

interface RoleDeletePayload {
  guildId: bigint;
  roleId: bigint;
}

interface WebhooksUpdatePayload {
  channelId: bigint;
  guildId: bigint;
}

interface TypingStartPayload {
  guildId: bigint | undefined;
  channelId: bigint;
  userId: bigint;
  timestamp: number;
  member: Member | undefined;
}

export interface ClientEvents {
  debug: [text: string, ...args: unknown[]];
  threadCreate: [bot: Bot, thread: Channel];
  threadDelete: [bot: Bot, thread: Channel];
  threadMemberUpdate: [bot: Bot, payload: ThreadMemberUpdatePayload];
  threadMembersUpdate: [bot: Bot, payload: ThreadMembersUpdatePayload];
  threadUpdate: [bot: Bot, thread: Channel];
  scheduledEventCreate: [bot: Bot, event: ScheduledEvent];
  scheduledEventUpdate: [bot: Bot, event: ScheduledEvent];
  scheduledEventDelete: [bot: Bot, event: ScheduledEvent];
  scheduledEventUserAdd: [bot: Bot, payload: ScheduledEventUserAddPayload];
  scheduledEventUserRemove: [
    bot: Bot,
    payload: ScheduledEventUserRemovePayload,
  ];
  ready: [bot: Bot, payload: ReadyPayload, rawPayload: DiscordReady];
  interactionCreate: [bot: Bot, interaction: Interaction];
  integrationCreate: [bot: Bot, integration: Integration];
  integrationDelete: [bot: Bot, payload: IntegrationDeletePayload];
  integrationUpdate: [bot: Bot, payload: IntegrationUpdatePayload];
  inviteCreate: [bot: Bot, invite: Invite];
  inviteDelete: [bot: Bot, payload: InviteDeletePayload];
  guildMemberAdd: [bot: Bot, member: Member, user: User];
  guildMemberRemove: [bot: Bot, user: User, guildId: bigint];
  guildMemberUpdate: [bot: Bot, member: Member, user: User];
  messageCreate: [bot: Bot, message: Message];
  messageDelete: [bot: Bot, payload: MessageDeletePayload, message?: Message];
  messageDeleteBulk: [bot: Bot, payload: MessageDeleteBulkPayload];
  messageUpdate: [bot: Bot, message: Message, oldMessage?: Message];
  reactionAdd: [bot: Bot, payload: ReactionAddPayload];
  reactionRemove: [bot: Bot, payload: ReactionRemovePayload];
  reactionRemoveEmoji: [bot: Bot, payload: ReactionRemoveEmojiPayload];
  reactionRemoveAll: [bot: Bot, payload: ReactionRemoveAllPayload];
  presenceUpdate: [
    bot: Bot,
    presence: PresenceUpdate,
    oldPresence?: PresenceUpdate,
  ];
  voiceServerUpdate: [bot: Bot, payload: VoiceServerUpdatePayload];
  voiceStateUpdate: [bot: Bot, voiceState: VoiceState];
  channelCreate: [bot: Bot, channel: Channel];
  dispatchRequirements: [
    bot: Bot,
    data: DiscordGatewayPayload,
    shardId: number,
  ];
  channelDelete: [bot: Bot, channel: Channel];
  channelPinsUpdate: [bot: Bot, data: ChannelPinsUpdatePayload];
  channelUpdate: [bot: Bot, channel: Channel];
  stageInstanceCreate: [bot: Bot, data: StageInstanceCreatePayload];
  stageInstanceDelete: [bot: Bot, data: StageInstanceDeletePayload];
  stageInstanceUpdate: [bot: Bot, data: StageInstanceUpdatePayload];
  guildEmojisUpdate: [bot: Bot, payload: GuildEmojisUpdatePayload];
  guildBanAdd: [bot: Bot, user: User, guildId: bigint];
  guildBanRemove: [bot: Bot, user: User, guildId: bigint];
  guildLoaded: [bot: Bot, guild: Guild];
  guildCreate: [bot: Bot, guild: Guild];
  guildDelete: [bot: Bot, id: bigint, shardId: number];
  guildUpdate: [bot: Bot, guild: Guild];
  raw: [bot: Bot, data: DiscordGatewayPayload, shardId: number];
  roleCreate: [bot: Bot, role: Role];
  roleDelete: [bot: Bot, payload: RoleDeletePayload];
  roleUpdate: [bot: Bot, role: Role];
  webhooksUpdate: [bot: Bot, payload: WebhooksUpdatePayload];
  botUpdate: [bot: Bot, user: User];
  typingStart: [bot: Bot, payload: TypingStartPayload];
}

export interface EdgeEvent<E extends keyof ClientEvents> {
  (...args: ClientEvents[E]): Promise<void> | void;
}
