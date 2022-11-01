import { writeFile } from "fs/promises";
import path from "path";
import {
  InControlLootData,
  InControlSpawnData,
  InControlSpawnerData,
  InControlSummonAidData,
} from "./types";

enum InControlConfig {
  Experience = "experience",
  Loot = "loot",
  Phases = "phases",
  PotentialSpawn = "potentialspawn",
  Spawn = "spawn",
  Spawner = "spawner",
  SummonAid = "summonaid",
}

export class InControl {
  private loot: InControlLootData[] = [];
  private spawns: InControlSpawnData[] = [];
  private spawner: InControlSpawnerData[] = [];
  private summonAid: InControlSummonAidData[] = [];

  // Ignored files (for now at least)
  private experience: unknown[] = [];
  private phases: unknown[] = [];
  private potentialSpawn: unknown[] = [];

  private static configPaths: Map<InControlConfig, string> = new Map([
    [
      InControlConfig.Experience,
      generateConfigPath(InControlConfig.Experience),
    ],
    [InControlConfig.Loot, generateConfigPath(InControlConfig.Loot)],
    [InControlConfig.Phases, generateConfigPath(InControlConfig.Phases)],
    [
      InControlConfig.PotentialSpawn,
      generateConfigPath(InControlConfig.PotentialSpawn),
    ],
    [InControlConfig.Spawn, generateConfigPath(InControlConfig.Spawn)],
    [InControlConfig.Spawner, generateConfigPath(InControlConfig.Spawner)],
    [InControlConfig.SummonAid, generateConfigPath(InControlConfig.SummonAid)],
  ]);

  public addLoot(loot: InControlLootData): void {
    this.loot.push(loot);
  }

  public addSpawn(spawn: InControlSpawnData): void {
    this.spawns.push(spawn);
  }

  public addSpawner(spawner: InControlSpawnerData): void {
    this.spawner.push(spawner);
  }

  public addSummonAid(summonAid: InControlSummonAidData): void {
    this.summonAid.push(summonAid);
  }

  public generateFiles(): Promise<void[]> {
    Array.from(InControl.configPaths).map(([_, path]) =>
      writeFile(path, JSON.stringify({}, undefined, 2))
    );
    return Promise.all(
      Array.from(InControl.configPaths).map(([config, path]) =>
        writeFile(
          path,
          JSON.stringify(this.getDataForFile(config), undefined, 2)
        )
      )
    );
  }

  private getDataForFile(
    config: InControlConfig
  ): (InControlSpawnData | InControlLootData | unknown)[] {
    switch (config) {
      case InControlConfig.Experience:
        return this.experience;
      case InControlConfig.Loot:
        return this.loot;
      case InControlConfig.Phases:
        return this.phases;
      case InControlConfig.PotentialSpawn:
        return this.potentialSpawn;
      case InControlConfig.Spawn:
        return this.spawns;
      case InControlConfig.Spawner:
        return this.spawner;
      case InControlConfig.SummonAid:
        return this.summonAid;
      default:
        throw new Error(`unsupported incontrol config ${config}`);
    }
  }
}

function generateConfigPath(config: InControlConfig): string {
  return path.join(__dirname, "config", "incontrol", `${config}.json`);
}
