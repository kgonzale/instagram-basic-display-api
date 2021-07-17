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


    // const latestPostDate = (postInformation.edge_sidecar_to_children.edges[1].node.accessibility_caption) ? 
    //     postInformation.edge_sidecar_to_children.edges[1].node.accessibility_caption
    //     : postInformation.display_url;


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
        allPosts: posts
    }

    console.log(userInformation)

    res.send(userInformation);
})



app.post('/discord', async (req: Request, res: Response) => {
    const { body } = req;  

    const embeds = [body]

    const url = "https://discord.com/api/webhooks/865014862789738507/9zLyGEy6irx8_84gg2RuP84LlifN7yHF9TbDfh6eykz5zWzJDb2nwfriMa7h3tCVUrWZ"  

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