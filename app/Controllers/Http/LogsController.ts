import Log from "App/Models/Log";

export default class LogsController {
  public async index() {
    const logs = await Log.all();
    return logs;
  }
}
