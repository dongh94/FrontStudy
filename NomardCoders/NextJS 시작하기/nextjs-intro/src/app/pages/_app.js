import Layout from "../../components/NavBar"
export default function App({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />;
      <span>_App scope</span>
    </div>
  )

}