'use client'

import Image from 'next/image'
import { useState } from 'react';
import React from 'react';
// import SigninButton from './components/SigninButton';

// import useGoogle from './auth/useGoogle';
import FHIR_to_summary from './parsing/parsing';
import GOOGLE from "./google.json";

import GoogleDrivePicker from './GoogleDrivePicker';
import { useGoogleLogin, GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// const {google} = require('googleapis');


export default function Home() {
  // const { token, authorize, revoke } = useGoogle();

  const [summary, setSummary] = useState('Nothing Here Yet');
  const [loadUrl, setLoadUrl] = useState('http://orenkohavi.github.io/FHIRData/FHIR_Reference');
  const [file, setFile] = useState('');

  // const handleSuccess = (codeResponse) => {
  //   console.log('Login Success:', codeResponse);
  // };

  // const handleError = (error) => {
  //   console.log('Login Failed:', error);
  // };

  // const login = useGoogleLogin({
  //   onSuccess: handleSuccess,
  //   onError: handleError,
  //   scope: 'profile email https://www.googleapis.com/auth/drive',
  // });

  const handleImportClick = async () => {
    try {
      const response = await fetch(loadUrl, {
      })
      const data = await response.text(); // assuming the URL returns text
    
      const summaryText = FHIR_to_summary(data);
      setFile(data);
      console.log('clicked');
      setSummary(summaryText);
    } catch (error) {
      console.error('Error fetching or processing data:', error);
      setSummary('Error loading summary.');
    }
  };

  const handleLoadClick = async (e) => {
    // try {
    //   console.log("here")
    //   //TODO: get upload loaded data to google drive
    //   var request = window.gapi.client.request({
    //     'path': 'https://www.googleapis.com/upload/drive/v3/files',
    //     'method': 'POST',
    //     'params': {'uploadType': 'media'}, //TODO: edit this to a multi part upload to add name/metadata
    //     'headers': {
    //       'Authorization': "Bearer " + token
    //     },
    //     'body': file});
    // request.execute(function(file) {
    //   console.log('file uploaded to drive', file);
    //   setSummary('File Uploaded to Drive');
    // });
    // } catch (error){
    //   console.error('Error fetching or processing data:', error);
    //   setSummary('Error loading summary.');
    // }
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete?')) {
      setSummary('Nothing Here');
      //TODO: Clear the actual google drive file (?)
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Google Drive Pod
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/Brown-CS-Logo.png"
              alt="Vercel Logo"
              style="color:transparent"
              className="dark:invert"
              width={100}
              height={15}
              priority
            />
          </a>
        </div>
      </div>  

      <div>
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-center"> 
          <a className="justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 hover:border-gray-300 hover:bg-gray-100">
            <GoogleDrivePicker/>
          </a>
          <p className="justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 hover:border-gray-300 hover:bg-gray-100">
          <button onClick={handleImportClick}> Import </button>
          </p>
          <p className="justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 hover:border-gray-300 hover:bg-gray-100">
          <button onClick={handleLoadClick}> Load </button>
          </p>
          <p className="justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 hover:border-gray-300 hover:bg-gray-100">
          {/* <button onClick={handleImportClick}> Delete </button> */}
          </p>
        </div>
        <div className="text-center" style={{ margin: '20px 0' }}>
          {summary}
        </div>
        
        <div id='SummaryURL' style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}>
          <label htmlFor="urlInput" style={{ marginRight: '10px' }}>URL:</label>
          <input 
            id="urlInput" 
            type="text" 
            value={loadUrl}
            onChange={(e) => setLoadUrl(e.target.value)}
            style={{ padding: '10px', marginRight: '10px' }}
          />
          <button 
            className="justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 hover:border-gray-300 hover:bg-gray-100"
            onClick={() => setLoadUrl("http://orenkohavi.github.io/FHIRData/FHIR_Reference")}
            style={{ padding: '10px' }}
          >
            Reset URL
          </button>
        </div>

      </div>

      </div>
      {/* <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
         <button>google login button :(</button>
      </div> */}

      {/* <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}
    </main>
  )
}