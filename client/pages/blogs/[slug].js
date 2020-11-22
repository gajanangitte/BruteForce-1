import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import { publicFetch } from '../../util/fetcher'

import Layout from '../../components/layout'
import PageTitle from '../../components/page-title'
import DetailPageContainer from '../../components/detail-page-container'
import PostWrapper from '../../components/post/post-wrapper'
import PostVote from '../../components/post/post-vote'
import PostSummary from '../../components/post/post-summary'
import CommentList from '../../components/post/comment-list'
import CommentItem from '../../components/post/comment-list/comment-item'
import { Spinner } from '../../components/icons'

const BlogDetail = ({ blogId, title }) => {
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await publicFetch.get(`/blog/${blogId}`)
      setBlog(data)
    }

    fetchBlog()
  }, [])


  const isClient = typeof window === 'object'

  return (
    <Layout extra={false}>
      <Head>
        <title>{title}</title>
        <link rel="canonical" href={isClient && window.location.href}></link>
      </Head>

      <PageTitle title={title} button />

      <DetailPageContainer>
        {!blog && (
          <div className="loading">
            <Spinner />
          </div>
        )}

        {blog && (
          <>
            <PostWrapper borderBottom={false}>
              <PostVote
                score={blog.score}
                votes={blog.votes}
                blogId={blogId}
                setBlog={setBlog}
              />
              <PostSummary
                tags={blog.tags}
                author={blog.author}
                created={blog.created}
                blogId={blogId}
              >
                {blog.text}
              </PostSummary>
              <CommentList blogId={blogId} setBlog={setBlog}>
                {blog.comments.map(({ id, author, created, body }) => (
                  <CommentItem
                    key={id}
                    commentId={id}
                    blogId={blogId}
                    author={author.username}
                    isOwner={author.username === blog.author.username}
                    created={created}
                    setBlog={setBlog}
                  >
                    {body}
                  </CommentItem>
                ))}
              </CommentList>
            </PostWrapper>

          </>
        )}
      </DetailPageContainer>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const slug = context.params.slug
  const blogId = slug.split('-').shift()
  const title = slug
    ?.substr(slug.indexOf('-') + 1)
    .split('-')
    .join(' ')

  return {
    props: {
      blogId,
      title
    }
  }
}

export default BlogDetail
