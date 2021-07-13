import MainService from "./main.service"

export default class MainController {
  static $inject = ['mainService']

  private mainService: MainService
  private welcomeMessage: string

  constructor (mainService) {
    this.mainService = mainService
  }

  $onInit () {
    this.welcomeMessage = this.mainService.helloWorld()
  }
}
