import React, { useContext } from "react"
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "./PostCard"
import {FETCH_POSTS_QUERY} from '../Queries/queries'
import { AuthContext } from '../untils/auth';
function Home() {
    const { user } = useContext(AuthContext);
    const { 
        loading,
        data
    } = useQuery(FETCH_POSTS_QUERY);
    return (
        <div>
            <Grid columns={1}>
                <Grid.Row className="page-title">
                    <h1>Hãy bình chọn cho truyện ngắn bạn yêu thích nhất nào</h1>
                </Grid.Row>

                <Grid.Row>
                    {loading ? (
                        <h1>Loading posts...</h1>
                    ) : (
                            <Transition.Group>
                                { data && data.getPosts.map(post => (
                                <Grid.Column key={post.id}>
                                    <PostCard post={post}></PostCard>
                                </Grid.Column>
                            ))}
                            </Transition.Group>
                        )}
                </Grid.Row>
            </Grid>
        </div>
    )
}


export default Home