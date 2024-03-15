
import './App.css';

import React , {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router,Routes, Route,} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  const apiKey = "8a0e8a0c29684cf0aaf0d9f57f6d0141"
  const[progress , setProgress] = useState(0)
  
  

    return (
      <div>
        <Router>
          <LoadingBar
        color='#f11946'
        progress={progress}
        
      />
          <Navbar />


         <Routes>
            <Route path="/" element ={<News setProgress ={setProgress} apiKey ={apiKey} key ="general " pageSize={6} country="in" category="general" />}> </Route>
            <Route path="/business" element ={<News setProgress ={setProgress} apiKey ={apiKey} key ="business " pageSize={6} country="in" category="business" />}> </Route>
            <Route path="/entertainment" element={<News setProgress ={setProgress} apiKey ={apiKey} key ="entertainmen " pageSize={6} country="in" category="entertainment" />}> </Route>
            <Route path="/general" element= {<News setProgress ={setProgress} apiKey ={apiKey} key =" general" pageSize={6} country="in" category="general" />}> </Route>
            <Route path="/health" element={<News setProgress ={setProgress} apiKey ={apiKey} key =" health" pageSize={6} country="in" category="health" />}> </Route>
            <Route path="/science" element={<News setProgress ={setProgress} apiKey ={apiKey} key ="science " pageSize={6} country="in" category="science" />}> </Route>
            <Route path="/sports" element={<News setProgress ={setProgress} apiKey ={apiKey} key =" sports" pageSize={6} country="in" category="sports" />}> </Route>
            <Route path="/technology " element={<News setProgress ={setProgress }apiKey ={apiKey} key ="technology " pageSize={6} country="in" category="technology" />}> </Route>
            </Routes>
            
          
        </Router>

      </div>
    )
  
}


export default App;