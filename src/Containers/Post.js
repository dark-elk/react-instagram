import React from 'react';
import { connect } from 'react-redux';
import InputForm from '../Components/InputForm';
import Button from '../Components/Button';

class Post extends React.Component {
    incrementLikes = (e) => {
        e.preventDefault();
        const { incrementLikes } = this.props;
        incrementLikes(this.props.id);
    };

    addComment = (e) => {
        e.preventDefault();
        const text = e.target[0].value;
        if (text === '') return;
        const { addComment } = this.props;
        const TEST = { id: this.props.id, text: text};
        addComment(TEST);
        e.target.reset();
    };

    render () {
        const post = this.props.post,
            Pic = () => <img src={ post.pic } />,
            LikesCount = () => post.likes,
            CommentsList = () => Object.entries(post.comments).map(([key, text]) =>
                <li key={key}>{text}</li>);
        return (
            <div className='post'>
                <Pic />
                <LikesCount />
                <Button
                    onClick={this.incrementLikes}
                    text='♥'
                />
                <ul>{ <CommentsList /> }</ul>
                <InputForm onSubmit={this.addComment} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        store: state
    }
};

const mapDispatchToProps = dispatch => {
    return {
        incrementLikes: (postID) => dispatch({ type: 'INCREMENT_LIKES', payload: postID }),
        addComment: (TEST) => dispatch({ type: 'ADD_COMMENT', payload: TEST }),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);