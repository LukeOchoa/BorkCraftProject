import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
/* import { createRoot } from 'react-dom/client'; */
import ReactDOM, { render } from 'react-dom';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss';
import { store } from './store';
import { Provider } from 'react-redux';



// Components
import Borkcraft from "./Borkcraft"
import Home from "./Home"
import Login from './Login';
import Signup from './Signup';
import Request from './Request';
import Request2 from './Request2';
import MainPage from './MainPage';
import Servy from './Servy';


// Main App
function App() {
    return (
        <Router>
            <div className="App" id="root">
                <Routes>
                    <Route path="/"          element={<Home      />} />
                    <Route path="/borkcraft" element={<Borkcraft />} />
                    <Route path="/login"     element={<Login     />} />
                    <Route path="/signup"    element={<Signup    />} />
                    {/*<Route path="/request"   element={<Request   />} />  {/* Test Route */} 
                    <Route path="/servy"     element={<Servy     />} />
                    <Route path="/request2"  element={<Request2  />} />  {/* Test Route 2 */}
                    <Route path="/mainpage"  element={<MainPage  />} />  {/* Test Route 3 */}
                </Routes>
            </div>
        </Router>
    )
}


//  ============================ 
//const root = document.getElementById('root')
//const ReactRoot = createRoot(root)
//ReactRoot.render(<App />)

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);
