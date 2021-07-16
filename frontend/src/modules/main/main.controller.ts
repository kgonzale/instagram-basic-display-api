import {
  InstagramInformation
} from "./models/InstagramInformation";

export default class MainController {
  private httpService;
  handle: string;
  instagramInformation: InstagramInformation;
  mockedImages = [{
          "displayUrl": "https://i.imgur.com/ep9b0Ro.jpeg"
      },
      {
          "displayUrl": "https://i.imgur.com/EKMoucO.jpeg"
      },
      {
          "displayUrl": "https://i.imgur.com/Zk3KKUW.jpeg"
      },
      {
          "displayUrl": "https://i.imgur.com/Afg43nh.jpeg"
      },
      {
          "displayUrl": "https://i.imgur.com/7tNR1Or.jpeg"
      }
  ]

  constructor($http) {
      this.httpService = $http;
  }

  $onInit() {}

  getInstagramInformation(handle: string): void {
      this.httpService.get(`http://localhost:8080/instagram/${handle}`).then((response) => {
          this.instagramInformation = response.data;
      })
  }

  postDiscordWebhook(): void {
      console.log(this.instagramInformation)
  }
}