import React, { useContext } from "react";
import { Button, Card, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from '../untils/auth'
import LikeButton from './LikeButton'

function PostCard({ post: { body, createAt, id, likeCount, commentCount, likes } }) {
    const { user } = useContext(AuthContext)

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{body}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createAt).fromNow(true)}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{id,likes,likeCount}}/>
                <Button as='div' labelPosition='right' as={Link} to={`/posts/${id}`}>
                    <Button color='blue'>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    )
}
export default PostCard