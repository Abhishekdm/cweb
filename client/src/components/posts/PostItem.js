import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import "./PostItem.css";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: {
    _id,
    title,
    text,
    imglink,
    name,
    avatar,
    user,
    likes,
    comments,
    date
  },
  showActions
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div className="margin">
        {/* <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link> */}
        <img className="img_display" src={imglink} alt="" />
      </div>
      <div>
        <Link to={`/posts/${_id}`} className="a_style">
          <p className="title">{title}</p>
          <p className="my-1 text_size">{text}</p>
        </Link>

        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment> By{" "}
          <Link to={`/profile/${user}`}>{name}</Link>
        </p>
        {showActions && (
          <Fragment>
            <button
              onClick={e => addLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up"></i>{" "}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              type="button"
              onClick={e => removeLike(_id)}
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            {/* <Link to={`/posts/${_id}`} className="btn btn-primary"> */}
            <p className="btn btn-primary">
              Comments{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </p>

            {/* </Link> */}
            {!auth.loading && user === auth.user._id && (
              <button
                type="button"
                onClick={e => deletePost(_id)}
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
