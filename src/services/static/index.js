export class Static {
  constructor() {}

  async getItems(mapId) {
    return await fetch(`./public/static/${mapId}.json`).then(res => res.json());
  }
}
