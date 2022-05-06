import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { createRoot } from 'react-dom/client';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss';



// Components
import Borkcraft from "./Borkcraft"
import Home from "./Home"
import Login from './Login';
import Signup from './Signup';
import Request from './Request';


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
                    <Route path="/request"   element={<Request   />} />  {/* Test Route */}
                </Routes>
            </div>
        </Router>
    )
}


//  ============================ 
const root = document.getElementById('root')
const ReactRoot = createRoot(root)
ReactRoot.render(<App />)