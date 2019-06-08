export class Cache {
  constructor() {}

  async getItems(mapId) {
    return await fetch(`./public/cache/${mapId}.json`).then(res => res.json());
  }
}
