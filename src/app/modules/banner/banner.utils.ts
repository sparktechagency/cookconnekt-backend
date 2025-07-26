import { IBanner } from "./banner.interface";


function getParsedBannerData(data:IBanner) {
     const bannerData = JSON.parse(data);
}

export default getParsedBannerData