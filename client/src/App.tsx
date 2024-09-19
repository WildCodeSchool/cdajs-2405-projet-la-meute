import Layout from './layouts/Layout';
import PageName from './pages/PageName/PageName';

function App() {

  return (
    <>
      <Layout>
        <h1>App</h1>
        <a href="/" className="debug">Test link</a>
        <PageName />
      </Layout>
    </>
  )
}

export default App;
