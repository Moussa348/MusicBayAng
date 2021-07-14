import { Customer } from "./customer";
import { LikedMusic } from "./liked-music";
import { PurchasedMusic } from "./purchased-music";
import { SharedMusic } from "./shared-music";

export class Feed {
    likedMusics:LikedMusic[];
    sharedMusics:SharedMusic[];
    purchasedMusics:PurchasedMusic[];
    profiles:Customer[];
}
