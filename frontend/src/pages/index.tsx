import React, { useEffect, ReactElement } from 'react'
import { GetServerSideProps } from 'next'
// import { GetStaticProps, NextApiResponse, NextPageContext } from 'next'

interface Props {
  message: string
}
export default function Home({ message }: Props): ReactElement {
  useEffect(() => {
    document.title = message
  }, [])
  return <h1>Index</h1>
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { res } = ctx
  res.writeHead(302, { Location: '/login' })
  res.end()
  return {
    props: { message: 'Home page' },
  }
}

// Home.getInitialProps = ({ res }: any) => {
//   res.writeHead(301, { Location: '/login' })
//   res.end()
//   return {}
// }
