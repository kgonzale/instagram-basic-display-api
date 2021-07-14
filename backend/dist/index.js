"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const proxies_1 = require("./proxies/proxies");
const httpsProxyAgent = require("https-proxy-agent");
const mavrckMock_json_1 = __importDefault(require("./mock-data/mavrck/mavrckMock.json"));
const mockPost_json_1 = __importDefault(require("./mock-data/mavrck/mockPost.json"));
const app = express_1.default();
const port = 8080;
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
});
app.get('/instagram/:handle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { handle } = req.params;
    console.log(`"handle: ${handle}"`);
    // const instagramInformationUrl = `https://www.instagram.com/${handle}/?__a=1`
    // const instagramInformation = await axios.get(instagramInfo);
    const instagramInformation = mavrckMock_json_1.default.graphql.user;
    const postId = instagramInformation.edge_owner_to_timeline_media.edges[0].node.shortcode;
    console.log(`"postId: ${postId}"`);
    const postInformationUrl = `https://www.instagram.com/p/${postId}/?__a=1`;
    const proxyList = yield proxies_1.populateProxyList();
    const proxy = proxyList[Math.floor(Math.random()) * proxyList.length];
    const agent = new httpsProxyAgent(proxy);
    const postInformationData = yield axios_1.default.get(postInformationUrl, {
        httpsAgent: agent
    });
    console.log(postInformationData.data);
    const postInformation = mockPost_json_1.default.graphql.shortcode_media;
    const postType = postInformation.__typename;
    const posts = (postType === "GraphSidecar") ? postInformation.edge_sidecar_to_children.edges.map((item) => {
        return {
            displayUrl: item.node.display_url,
            type: item.node.__typename
        };
    }) : postInformation.display_url;
    const userInformation = {
        profilePicture: instagramInformation.profile_pic_url_hd,
        biography: instagramInformation.biography,
        fullName: instagramInformation.full_name,
        followCount: instagramInformation.edge_followed_by.count,
        likeCount: instagramInformation.edge_owner_to_timeline_media.edges[0].node.edge_liked_by,
        commentCount: postInformation.edge_media_to_parent_comment.count,
        latestPostCaption: postInformation.edge_media_to_caption.edges[0].node,
        postType: postType,
        allPosts: posts
    };
    res.send(postInformationData.data);
}));
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map