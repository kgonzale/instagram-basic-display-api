import { AllPosts } from "./AllPosts";

export interface InstagramInformation {
    profilePicture: string
    biography: string
    fullName: string
    followCount: number
    likeCount: number
    commentCount: number
    latestPostCaption: string
    postType: string
    allPosts: AllPosts | string,
    latestPostDate: number
}