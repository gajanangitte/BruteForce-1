import React from 'react';
import Head from 'next/head'

import Header from '../../components/layout/header';

import BlogWriteView from '../../components/blog-write-view';
import BlogForm from '../../components/blog-write-view/blog-form';

const Ask = () => {
  return (
    <div>
      <Head>
        <title>Write a Blog</title>
      </Head>

      <Header />

      <BlogWriteView>
        <BlogForm />
      </BlogWriteView>
    </div>
  )
}

export default Ask
