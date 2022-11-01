import {
  Difficulty,
  ResourceLocation,
  ResourceNamespace,
} from "../../minecraft";
import { InControlHeldItem } from "./held-item";
import { InControlPotion } from "./potion";

interface InControlMobCount {
  amount: number;
  mob?: ResourceLocation | ResourceLocation[];
  all?: boolean;
  passive?: boolean;
  hostile?: boolean;
  mod?: ResourceNamespace;
  perchunk?: boolean;
  perplayer?: boolean;
}

interface InControlConditions {
  phase?: string | string[];
  onjoin?: boolean;
  mindaycount?: number;
  maxdaycount?: number;
  daycount?: number;
  baby?: boolean;
  spawner?: boolean;
  incontrol?: boolean;
  minheight?: number;
  maxheight?: number;
  minlight?: number;
  maxlight?: number;
  mincount?: InControlMobCount;
  maxcount?: InControlMobCount;
  maxthis?: number;
  maxtotal?: number;
  maxpeaceful?: number;
  maxhostile?: number;
  maxneutral?: number;
  maxlocal?: number;
  minspawndist?: number;
  maxspawndist?: number;
  mintime?: number;
  maxtime?: number;
  mindifficulty?: number;
  maxdifficulty?: number;
  mindist?: number;
  maxdist?: number;
  canspawnhere?: boolean;
  norestrictions?: boolean;
  inliquid?: boolean;
  inwater?: boolean;
  inlava?: boolean;
  inair?: boolean;
  isnotcolliding?: boolean;
  difficulty?: Difficulty;
  weather?: "rain" | "thunder";
  category?: string | string[];
  biometags?: string | string[];
  hostile?: boolean;
  passive?: boolean;
  seesky?: boolean;
  slime?: boolean;
  structure?: ResourceLocation;
  mob?: ResourceLocation | ResourceLocation[];
  mod?: ResourceNamespace | ResourceNamespace[];
  block?: ResourceLocation | ResourceLocation[] | JSON; // TODO: Improve typing
  blockoffset?: JSON; // TODO: Improve typing
  biome?: ResourceLocation | ResourceLocation[];
  biometype?: string | string[];
  dimension?: ResourceLocation | ResourceLocation[];
  dimensionmod?: ResourceNamespace | ResourceNamespace[];
  random?: number;
  player?: boolean;
  fakeplayer?: boolean;
  realplayer?: boolean;
  projectile?: boolean;
  explosion?: boolean;
  magic?: boolean;
  fire?: boolean;
  source?: string | string[];
  playerhelditem?: string | string[] | JSON;
  offhanditem?: string | string[] | JSON;
  bothhandsitem?: string | string[] | JSON;

  // Lost Cities Support
  incity?: boolean;
  instreet?: boolean;
  inbuilding?: boolean;
  insphere?: boolean;

  // Game Stages Support
  gamestage?: boolean;
}

export enum InControlSpawnResult {
  Default = "default",
  Deny = "deny",
  Allow = "allow",
}

type InControlSpawnConditions = Pick<
  InControlConditions,
  | "phase"
  | "onjoin"
  | "mindaycount"
  | "maxdaycount"
  | "daycount"
  | "baby"
  | "spawner"
  | "incontrol"
  | "minheight"
  | "maxheight"
  | "minlight"
  | "maxlight"
  | "mincount"
  | "maxcount"
  | "minspawndist"
  | "maxspawndist"
  | "mintime"
  | "maxtime"
  | "mindifficulty"
  | "maxdifficulty"
  | "canspawnhere"
  | "isnotcolliding"
  | "difficulty"
  | "weather"
  | "category"
  | "biometags"
  | "hostile"
  | "passive"
  | "seesky"
  | "slime"
  | "structure"
  | "mob"
  | "mod"
  | "block"
  | "blockoffset"
  | "biome"
  | "biometype"
  | "dimension"
  | "dimensionmod"
  | "random"
  | "playerhelditem"
  | "offhanditem"
  | "bothhandsitem"
  | "incity"
  | "instreet"
  | "inbuilding"
  | "insphere"
  | "gamestage"
>;

// !! Result is omitted - implement in each use
interface InControlSpawnActions {
  nbt?: JSON; // TODO: Improve typing
  customname?: string;
  healthmultiply?: number;
  healthadd?: number;
  speedmultiply?: number;
  speedadd?: number;
  damagemultiply?: number;
  damageadd?: number;
  angry?: boolean;
  potion?: InControlPotion | InControlPotion[];
  helditem?: InControlHeldItem | InControlHeldItem[];
  armorboots?: ResourceLocation | ResourceLocation[];
  armorhelmet?: ResourceLocation | ResourceLocation[];
  armorlegs?: ResourceLocation | ResourceLocation[];
  armorchest?: ResourceLocation | ResourceLocation[];
}

export type InControlSpawnData =
  | InControlUnblockedSpawnData
  | InControlBlockedSpawnData;

export type InControlUnblockedSpawnData = InControlSpawnConditions &
  InControlSpawnActions & {
    /**
     * Used to determine if spawn should be a llowed or blocked.
     *
     * If default is used, it is possible the spawn cab still be denied if there is not enough light, etc.
     *
     * If you dont specify a result then whatever other mob control mods have decided is preserved.
     */
    result?: Exclude<InControlSpawnResult, InControlSpawnResult.Deny>;
  };

export type InControlBlockedSpawnData = InControlSpawnConditions & {
  /**
   * Used to determine if spawn should be a llowed or blocked.
   *
   * If default is used, it is possible the spawn cab still be denied if there is not enough light, etc.
   *
   * If you dont specify a result then whatever other mob control mods have decided is preserved.
   */
  result: InControlSpawnResult.Deny;
};

export type InControlSummonAidData =
  | InControlUnblockedSummonAidData
  | InControlBlockedSummonAidData;

export type InControlUnblockedSummonAidData = InControlSpawnConditions &
  InControlSpawnActions & {
    /**
     * Used to determine if spawn should be a llowed or blocked.
     *
     * If default is used, it is possible the spawn cab still be denied if there is not enough light, etc.
     *
     * If you dont specify a result then whatever other mob control mods have decided is preserved.
     */
    result?: Exclude<InControlSpawnResult, InControlSpawnResult.Deny>;
  };

export type InControlBlockedSummonAidData = InControlSpawnConditions & {
  /**
   * Used to determine if spawn should be a llowed or blocked.
   *
   * If default is used, it is possible the spawn cab still be denied if there is not enough light, etc.
   *
   * If you dont specify a result then whatever other mob control mods have decided is preserved.
   */
  result: InControlSpawnResult.Deny;
};

export interface InControlSpawnerConditions {
  dimension: ResourceLocation | ResourceLocation[];
  mindaycount?: number;
  maxdaycount?: number;
  mindist?: number;
  maxdist?: number;
  minheight?: number;
  maxheight?: number;
  norestrictions?: boolean;
  inliquid?: boolean;
  inwater?: boolean;
  inlava?: boolean;
  inair?: boolean;
  maxthis?: number;
  maxtotal?: number;
  maxpeaceful?: number;
  maxhostile?: number;
  maxneutral?: number;
  maxlocal?: number;
}

export enum InControlMobsFromBiome {
  Monster = "monster",
  Creature = "creature",
  Ambient = "ambient",
  WaterCreature = "water_creature",
  WaterAmbient = "water_ambient",
  Misc = "misc",
}

export interface InControlSpawnerData {
  phase?: string | string[];
  mob: ResourceLocation | ResourceLocation[];
  // weights?: unknown; // TODO: Implement
  mobsfrombiome?: InControlMobsFromBiome;
  attempts?: number;
  persecond?: number;
  amount?: {
    minimum: number;
    maximum: number;
    groupdistance?: number;
  };
  conditions: InControlSpawnerConditions;
}

type InControlLootConditions = Pick<
  InControlConditions,
  | "baby"
  | "minheight"
  | "maxheight"
  | "minlight"
  | "maxlight"
  | "minspawndist"
  | "maxspawndist"
  | "mintime"
  | "maxtime"
  | "mindifficulty"
  | "maxdifficulty"
  | "difficulty"
  | "weather"
  | "category"
  | "biometags"
  | "hostile"
  | "passive"
  | "seesky"
  | "structure"
  | "mob"
  | "mod"
  | "block"
  | "blockoffset"
  | "biome"
  | "biometype"
  | "dimension"
  | "dimensionmod"
  | "random"
  | "player"
  | "fakeplayer"
  | "realplayer"
  | "projectile"
  | "explosion"
  | "magic"
  | "fire"
  | "source"
  | "playerhelditem"
  | "offhanditem"
  | "bothhandsitem"
  | "incity"
  | "instreet"
  | "inbuilding"
  | "insphere"
  | "gamestage"
>;

export type InControlLootData = InControlLootConditions & {
  item?: ResourceLocation | ResourceLocation[];
  itemcount: string; // TODO: Improve with a class
  nbt?: JSON; // TODO: Improve type
  remove?: ResourceLocation | ResourceLocation[];
  removeall?: boolean;
};
