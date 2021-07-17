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
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const addisonMock_json_1 = __importDefault(require("./mock-data/addison/addisonMock.json"));
const mockPost_json_1 = __importDefault(require("./mock-data/addison/mockPost.json"));
const app = express_1.default();
const cors = require('cors');
const port = 8080;
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
});
app.use(cors());
app.use(express_1.default.json());
app.get('/instagram/:handle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { handle } = req.params;
    console.log(`"handle: ${handle}"`);
    // const instagramInformationUrl = `https://www.instagram.com/${handle}/?__a=1`
    // const instagramInformation = await axios.get(instagramInfo);
    const instagramInformation = addisonMock_json_1.default.graphql.user;
    const postId = instagramInformation.edge_owner_to_timeline_media.edges[0].node.shortcode;
    console.log(`"postId: ${postId}"`);
    // const postInformationUrl = `https://www.instagram.com/p/${postId}/?__a=1`
    // const postInformation = await axios.get(postInformationUrl);
    const postInformation = mockPost_json_1.default.graphql.shortcode_media;
    const postType = postInformation.__typename;
    const accessibilityCaption = (postType === "GraphSidecar") ?
        postInformation.edge_sidecar_to_children.edges[1].node.accessibility_caption
        : postInformation.accessibility_caption;
    const grabDateRegex = /(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\s+\d{1,2},\s+\d{4}/g;
    const latestPostDate = accessibilityCaption.match(grabDateRegex);
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
        allPosts: posts,
        latestPostDate: latestPostDate[0]
    };
    console.log(userInformation);
    res.send(userInformation);
}));
app.post('/discord', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const embeds = [body];
    const url = "https://discord.com/api/webhooks/865014862789738507/9zLyGEy6irx8_84gg2RuP84LlifN7yHF9TbDfh6eykz5zWzJDb2nwfriMa7h3tCVUrWZ";
    try {
        const response = yield axios_1.default.post(url, {
            content: "", embeds
        });
    }
    catch (error) {
        throw error.message;
    }
    res.send(body.fullName);
}));
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map