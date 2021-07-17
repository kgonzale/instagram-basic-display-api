import {
  InstagramInformation
} from "./models/InstagramInformation";

export default class MainController {
  private httpService;
  handle: string;
  instagramInformation: InstagramInformation;
  mockedImages = [{
          "displayUrl": "https://i.imgur.com/ep9b0Ro.jpeg",
          "id" : "carousel__slide1"
      },
      {
          "displayUrl": "https://i.imgur.com/EKMoucO.jpeg",
          "id" : "carousel__slide2"
      },
      {
          "displayUrl": "https://i.imgur.com/Zk3KKUW.jpeg",
          "id" : "carousel__slide3"
      },
      {
          "displayUrl": "https://i.imgur.com/Afg43nh.jpeg"
          ,"id" : "carousel__slide4"
      },
      {
          "displayUrl": "https://i.imgur.com/7tNR1Or.jpeg",
          "id" : "carousel__slide5"
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
      const embed = { 
        title: this.instagramInformation.fullName,
        description: `bio: ${this.instagramInformation.biography}, followers: ${this.instagramInformation.followCount}`,
        thumbnail: { url: `${this.instagramInformation.profilePicture}` }
      }

      this.httpService.post(`http://localhost:8080/discord`, embed).then((response) => {
        alert("Successful!")
    })
  }
}