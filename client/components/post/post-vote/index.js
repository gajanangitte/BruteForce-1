import React, { useContext } from 'react'

import { AuthContext } from '../../../store/auth'
import { FetchContext } from '../../../store/fetch'
import ModalContext from '../../../store/modal'

import Button from '../../button'
import { ArrowUp, ArrowDown } from '../../icons'

import styles from './post-vote.module.css'

<<<<<<< HEAD
const PostVote = ({ score, votes, questionId, answerId, setQuestion }) => {
=======
const PostVote = ({ score, votes, questionId, answerId, setQuestion, blogId, setBlog }) => {
>>>>>>> master
  const { authState, isAuthenticated } = useContext(AuthContext)
  const { authAxios } = useContext(FetchContext)
  const { handleComponentVisible } = useContext(ModalContext)

  const isUpVoted = () => {
    return votes.find((v) => v.user === authState.userInfo?.id)?.vote === 1
  }

  const isDownVoted = () => {
    return votes.find((v) => v.user === authState.userInfo?.id)?.vote === -1
  }

  const upVote = async () => {
<<<<<<< HEAD
    const { data } = await authAxios.get(
      `/votes/upvote/${questionId}/${answerId ? answerId : ''}`
    )
    setQuestion(data)
  }

  const downVote = async () => {
    const { data } = await authAxios.get(
      `/votes/downvote/${questionId}/${answerId ? answerId : ''}`
    )
    setQuestion(data)
  }

  const unVote = async () => {
    const { data } = await authAxios.get(
      `/votes/unvote/${questionId}/${answerId ? answerId : ''}`
    )
    setQuestion(data)
=======

    if(blogId) {
      const { data } = await authAxios.get(
        `/votes/upvoteB/${blogId}`
      )
      setBlog(data)
    }
    else {
      const { data } = await authAxios.get(
        `/votes/upvote/${questionId}/${answerId ? answerId : ''}`
      )
      setQuestion(data)
    }
  }

  const downVote = async () => {

    if(blogId) {
      const { data } = await authAxios.get(
        `/votes/downvoteB/${blogId}`
      )
      setBlog(data)
    }
    else {
      const { data } = await authAxios.get(
        `/votes/downvote/${questionId}/${answerId ? answerId : ''}`
      )
      setQuestion(data)
      }
    }

  const unVote = async () => {

      if(blogId) {
        const { data } = await authAxios.get(
          `/votes/unvoteB/${blogId}`
        )
        setBlog(data)
      }
      else
      {
        const { data } = await authAxios.get(
          `/votes/unvote/${questionId}/${answerId ? answerId : ''}`
        )
        setQuestion(data)
      }

>>>>>>> master
  }

  return (
    <div className={styles.voteCell}>
      <Button
        className={styles.voteButton}
        onClick={() =>
          isAuthenticated()
            ? isUpVoted()
              ? unVote()
              : upVote()
            : handleComponentVisible(true, 'signup')
        }
      >
        <ArrowUp className={isUpVoted() ? styles.voted : ''} />
      </Button>
      <div className={styles.score}>{score}</div>
      <Button
        className={styles.voteButton}
        onClick={() =>
          isAuthenticated()
            ? isDownVoted()
              ? unVote()
              : downVote()
            : handleComponentVisible(true, 'signup')
        }
      >
        <ArrowDown className={isDownVoted() ? styles.voted : ''} />
      </Button>
    </div>
  )
}

export default PostVote
