import React, { useState, useEffect, useContext } from 'react'

import { AuthContext } from '../../../store/auth'
import ModalContext from '../../../store/modal'

import AddComment from '../add-comment'

<<<<<<< HEAD
import styles from './comment-list.module.css'
=======
import styles from './comment-list.module.css' 
>>>>>>> master

const CommentList = ({
  children,
  questionId,
  answerId,
<<<<<<< HEAD
  setQuestion,
=======
  blogId,
  setQuestion,
  setBlog
>>>>>>> master
}) => {
  const { isAuthenticated } = useContext(AuthContext)
  const { handleComponentVisible } = useContext(ModalContext)

  const [showAddComment, setShowAddComment] = useState(false)
  const [visibleComments, setVisibleComments] = useState(children.slice(0, 3))
  const [difference, setDiffrence] = useState(null)
  
  useEffect(() => {
    setVisibleComments(children.slice(0,3))  
  }, [children])

  useEffect(() => {
    setDiffrence(children.length - visibleComments.length)
  }, [visibleComments])


  return (
    <div className={styles.commentCell}>
      {visibleComments}

      {difference > 0  ? (
        <a
          className={styles.showMore}
          onClick={() => setVisibleComments(children)}
        >
          show <b>{difference}</b> more comments
        </a>
      ) : (
        !showAddComment && (
          <a
            className={styles.addComment}
            onClick={() => isAuthenticated() ? setShowAddComment(true) : handleComponentVisible(true, 'signup')}
          >
            add comment
          </a>
        )
      )}

      {showAddComment && (
        <AddComment
          questionId={questionId}
<<<<<<< HEAD
          answerId={answerId}
          setShowAddComment={setShowAddComment}
          setQuestion={setQuestion}
=======
          blogId={blogId}
          answerId={answerId}
          setShowAddComment={setShowAddComment}
          setQuestion={setQuestion}
          setBlog={setBlog}
>>>>>>> master
        />
      )}
    </div>
  )
}

export default CommentList
