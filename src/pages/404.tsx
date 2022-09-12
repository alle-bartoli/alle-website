/*******************************************************************************
*                                                                              *
* 404.                                                                         *
*                                                                              *
*******************************************************************************/
import * as React from "react"
import { Link, HeadFC } from "gatsby"
import '../styles/global.css'



const NotFoundPage = () => {
  return (
    <main className='p-24'>
      <h1 className='mb-12'>Page not found</h1>
      <p className='mb-12'>
        Sorry 😔, we couldn’t find what you were looking for.
        <br />
        <br />
        <Link to="/">Go home</Link>.
      </p>
    </main>
  )
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>
