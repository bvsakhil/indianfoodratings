import '../styles/globals.css'; // Adjust the path as necessary

function MyApp({ Component, pageProps }: { Component: React.ComponentType<any>; pageProps: any }) {
  return <Component {...pageProps} />;
}

export default MyApp; 