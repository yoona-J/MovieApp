/* import Axios from 'axios'
import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment'; */

import React, { useState } from 'react'
import { Button } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
// const { TextArea } = Input;
// const { Title } = Typography;
function Comments(props) {
    
    // const movieId = props.postId;
    //const videoId = props.match/useParams.videoId
    const user = useSelector(state => state.user)
    const [commentValue, setcommentValue] = useState("")

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id ,
            postId: props.postId
        }
        //console.log(variables)
        
        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success){
                    setcommentValue("")
                    console.log(response.data.result)
                    props.refreshFunction(response.data.result)
                }else {
                    alert( '커멘트를 저장하지 못했습니다.')
                }
            })
    }
    
  return (
    <div>
        <br />
        <p> Replies </p>
        <hr />
        {/* Comment Lists  */}
        {/*console.log(props.CommentLists)*/}

        {props.CommentLists && props.CommentLists.map((comment, index) => (
            (!comment.responseTo &&
                <React.Fragment>
                    <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                    <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                </React.Fragment>
            )
        ))}

            {props.CommentLists && props.CommentLists.length === 0 &&
                <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px'}} >
                    Be the first one who shares your thought about this movie
                </div>
            }
        
        {/* Comment Lists */}

        {/*props.commentLists && props.commentLists.map((comment, index) => (
             (!comment.responseTo &&
             <SingleComment comment={props.comment} postId= {videoId} />
             )
             ) )*/}

       
        {/* Root Comment Form */}

        <form style= {{ display: 'flex '}} onSubmit={onSubmit} >
            <textarea
                style={{ width: '100%', borderRadius: '5px' }}
                onChange={handleClick}
                value={commentValue}
                placeholder="코멘트를 작성해 주세요"
            />
            <br/>
            <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >Submit</Button>
        </form>

    </div>
  )
}

export default Comments
