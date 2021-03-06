import axios from 'axios';
import express, { Request, Response, NextFunction } from 'express';

import mockInstagramResponse from './mock-data/addison/addisonMock.json'
import mockPostResponse from './mock-data/addison/mockPost.json'

const app = express();
const cors = require('cors')
const port = 8080;

app.use(function (req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
});

/* allow all headers */
app.use(cors())
app.use(express.json())

app.get('/instagram/:handle', async (req: Request, res: Response) => {
    const { handle } = req.params;
    console.log(`"handle: ${handle}"`)

    // const instagramInformationUrl = `https://www.instagram.com/${handle}/?__a=1`
    // const instagramInformation = await axios.get(instagramInfo);

    const instagramInformation = mockInstagramResponse.graphql.user;
    
    const postId: string = instagramInformation.edge_owner_to_timeline_media.edges[0].node.shortcode;
    console.log(`"postId: ${postId}"`)
    // const postInformationUrl = `https://www.instagram.com/p/${postId}/?__a=1`
    // const postInformation = await axios.get(postInformationUrl);

    const postInformation = mockPostResponse.graphql.shortcode_media as any;
    const postType = postInformation.__typename;


    const accessibilityCaption = (postType === "GraphSidecar") ? 
        postInformation.edge_sidecar_to_children.edges[1].node.accessibility_caption
        : postInformation.accessibility_caption;

    const grabDateRegex = /(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\s+\d{1,2},\s+\d{4}/g

    const latestPostDate = accessibilityCaption.match(grabDateRegex)

    const posts = (postType === "GraphSidecar") ? postInformation.edge_sidecar_to_children.edges.map((item: any) => {
        return {
            displayUrl: item.node.display_url,
            type: item.node.__typename
        } 
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
    }

    res.send(userInformation);
})



app.post('/discord', async (req: Request, res: Response) => {
    const { body } = req;  

    const embeds = [body]

    const url = process.env.DISCORD_WEBHOOK;  

    try { 
        const response = await axios.post(url, { 
             content: "", embeds 
        })
    }
    catch(error) {
        throw error.message;
    }

    res.send(body.fullName)
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});