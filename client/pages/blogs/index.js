import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { publicFetch } from '../../util/fetcher'

import Layout from '../../components/layout'
import QuestionWrapper from '../../components/question/question-wrapper'
import QuestionStats from '../../components/question/question-stats'
import QuestionSummary from '../../components/question/question-summary'
import PageTitle from '../../components/page-title'
import ButtonGroup from '../../components/button-group'
import { Spinner } from '../../components/icons'
import BlogWrapper from '../../components/blog/blog-wrapper'
import BlogStats from '../../components/blog/blog-stats'
import BlogSummary from '../../components/blog/blog-summary'

const Blogs = () => {
  const router = useRouter()

  const [blogs, setBlogs] = useState(null)
  const [sortType, setSortType] = useState('Votes')

  useEffect(() => {
    const fetchQuestion = async () => {
      const { data } = await publicFetch.get('/blog')
      setBlogs(data)
    }

    const fetchQuestionByTag = async () => {
      const { data } = await publicFetch.get(`/blogs/${router.query.tag}`)
      setBlogs(data)
    }

    if (router.query.tag) {
      fetchQuestionByTag()
    } else {
      fetchQuestion()
    }
  }, [router.query.tag])

  const handleSorting = () => {
    switch (sortType) {
      case 'Votes':
        return (a, b) => b.score - a.score
      case 'Views':
        return (a, b) => b.views - a.views
      case 'Newest':
        return (a, b) => new Date(b.created) - new Date(a.created)
      case 'Oldest':
        return (a, b) => new Date(a.created) - new Date(b.created)
      default:
        break
    }
  }

  return (
    <Layout>
      <Head>
        <title>
          {router.query.tag ? router.query.tag : 'Blogs'}
        </title>
      </Head>

      <PageTitle title={router.query.tag ? `Questions tagged [${router.query.tag}]` : 'All Blogs'} button borderBottom={false} />

      <ButtonGroup
        borderBottom
        buttons={['Votes', 'Views', 'Newest', 'Oldest']}
        selected={sortType}
        setSelected={setSortType}
      />

      {!blogs && (
        <div className="loading">
          <Spinner />
        </div>
      )}

      {blogs
        ?.sort(handleSorting())
        .map(
          ({
            id,
            votes,
            comments,
            views,
            title,
            text,
            tags,
            author,
            created
          }) => (
            <BlogWrapper key={id}>
              <BlogStats
                voteCount={votes.length}
                answerCount={comments.length}
                view={views}
              />
              <BlogSummary
                id={id}
                title={title}
                tags={tags}
                author={author}
                createdTime={created}
              >
                {text}
              </BlogSummary>
            </BlogWrapper>
          )
        )}

    </Layout>
  )
}

export default Blogs
