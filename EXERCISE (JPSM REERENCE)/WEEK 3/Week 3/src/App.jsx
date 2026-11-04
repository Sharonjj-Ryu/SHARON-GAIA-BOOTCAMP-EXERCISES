// // // import { useState } from 'react'
// // // import heroImg from './assets/hero.png'
// // // import reactLogo from './assets/react.svg'
// // // import viteLogo from './assets/vite.svg'
// // // //import './App.css'
// // // import JSXExamples from './components/JSXExamples'
// // // import PersonalInfo from './componecmdnts/PersonalInfo'
// // import UserCard from './components/UserCard'

// // // function App() {
// // //   const [count, setCount] = useState(0)

// // //   return (
// // //     <>
// // //       <section id="center">
// // //         <div className="hero">
// // //           <img src={heroImg} className="base" width="170" height="179" alt="" />
// // //           <img src={reactLogo} className="framework" alt="React logo" />
// // //           <img src={viteLogo} className="vite" alt="Vite logo" />
// // //         </div>
// // //         <div>
// // //           <h1>Get started</h1>
// // //           <p>
// // //             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
// // //           </p>
// // //         </div>
// // //         <button
// // //           type="button"
// // //           className="counter"
// // //           onClick={() => setCount((count) => count + 1)}
// // //         >
// // //           Count is {count}
// // //         </button>
// // //       </section>

// // //       <div className="ticks"></div>

// // //       <section id="next-steps">
// // //         <div id="docs">
// // //           <svg className="icon" role="presentation" aria-hidden="true">
// // //             <use href="/icons.svg#documentation-icon"></use>
// // //           </svg>
// // //           <h2>Documentation</h2>
// // //           <p>Your questions, answered</p>
// // //           <ul>
// // //             <li>
// // //               <a href="https://vite.dev/" target="_blank">
// // //                 <img className="logo" src={viteLogo} alt="" />
// // //                 Explore Vite
// // //               </a>
// // //             </li>
// // //             <li>
// // //               <a href="https://react.dev/" target="_blank">
// // //                 <img className="button-icon" src={reactLogo} alt="" />
// // //                 Learn more
// // //               </a>
// // //             </li>
// // //           </ul>
// // //         </div>
// // //         <div id="social">
// // //           <svg className="icon" role="presentation" aria-hidden="true">
// // //             <use href="/icons.svg#social-icon"></use>
// // //           </svg>
// // //           <h2>Connect with us</h2>
// // //           <p>Join the Vite community</p>
// // //           <ul>
// // //             <li>
// // //               <a href="https://github.com/vitejs/vite" target="_blank">
// // //                 <svg
// // //                   className="button-icon"
// // //                   role="presentation"
// // //                   aria-hidden="true"
// // //                 >
// // //                   <use href="/icons.svg#github-icon"></use>
// // //                 </svg>
// // //                 GitHub
// // //               </a>
// // //             </li>
// // //             <li>
// // //               <a href="https://chat.vite.dev/" target="_blank">
// // //                 <svg
// // //                   className="button-icon"
// // //                   role="presentation"
// // //                   aria-hidden="true"
// // //                 >
// // //                   <use href="/icons.svg#discord-icon"></use>
// // //                 </svg>
// // //                 Discord
// // //               </a>
// // //             </li>
// // //             <li>
// // //               <a href="https://x.com/vite_js" target="_blank">
// // //                 <svg
// // //                   className="button-icon"
// // //                   role="presentation"
// // //                   aria-hidden="true"
// // //                 >
// // //                   <use href="/icons.svg#x-icon"></use>
// // //                 </svg>
// // //                 X.com
// // //               </a>
// // //             </li>
// // //             <li>
// // //               <a href="https://bsky.app/profile/vite.dev" target="_blank">
// // //                 <svg
// // //                   className="button-icon"
// // //                   role="presentation"
// // //                   aria-hidden="true"
// // //                 >
// // //                   <use href="/icons.svg#bluesky-icon"></use>
// // //                 </svg>
// // //                 Bluesky
// // //               </a>
// // //             </li>
// // //           </ul>
// // //         </div>
// // //       </section>

// // //       <div className="ticks"></div>
// // //       <section id="spacer"></section>
// // //     </>
// // //   )
// // // }

// // // export default App


// // // function App() {
// // //   return (
// // //     <div>
// // //       <p> Hello World</p>
// // //     </div>
// // //   )
// // // }

// // //export default App

// // //import './App.css'

// // // function App() {
// // //   const users = [
// // //     [id: 1, name:"Jane Doe", "jane@example.com", "Software Engineer"],
// // //     ["John Smith", "john@example.com", "Designer"],
// // //     ["Mary Lee", "mary@example.com", "Project Manager"],
// // //   ];

// // //   return (
// // //     <div>
// // //       {users.map((user) => (
// // //         <UserCard
// // //           key={user.id}
// // //           name={user[0]}
// // //           email={user[1]}
// // //           role={user[2]}
// // //         />
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // // export default App


// // function Header({children}) {
// //   return (
// //     <header className="app-header">
// //       {children}
// //     </header>
// //   );
// // }

// // function Sidebar({children}) {
// //   return (
// //     <aside className="sidebar">
// //       {children}
// //     </aside>
// //   );
// // }

// // function MainContent ({children}) {
// //   return (
// //     <main className="main-content">
// //       {children}
// //     </main>
// //   );
// // }

// // // export default App;

// // // function App() {
// // //   const users = [
// // //     { id: 1, name: "Jane Doe", email: "jane@example.com", role: "Software Engineer" },
// // //     { id: 2, name: "John Smith", email: "john@example.com", role: "Designer" },
// // //     { id: 3, name: "Mary Lee", email: "mary@example.com", role: "Project Manager" },
// // //   ];

// // //   return (
// // //     <div>
// // //       {users.map((user) => (
// // //         <UserCard
// // //           key={user.id}
// // //           name={user.name}
// // //           email={user.email}
// // //           role={user.role}
// // //         />
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // // export default App;


// // function MainContent (){
// //   return(
// //     <main className="main-content">
// //       {children}
// //     </main>
// //   );
// // }


// // function App () {
// //   return (
// //     <div className="app">
// //       <header>
// //         <h1> My Application</h1>
// //         <nav> 
// //           <a href="/"> Home </a>
// //           <a href="/" > About</a>
// //         </nav>
// //       </header>
// //     </div>
// //   )
// // }

// // import UserCard from './components/UserCard'
// // import './App.css'

// // function App() {
// //   return (
// //     <div>
// //       <UserCard></UserCard>
// //       <p>121111111</p>
// //     </div>
// //   )
// // }

// // export default App


// // import React from "react";
// // import CategoryNav from "./components/CategoryNav";
// // import ProductList from './components/ProductList'
// // import PromoBanner from "./components/PromoBanner";

// // function App() {
// //   return (
// //     <div style={{ width: "100%", minHeight: "100vh", margin: 0, padding: 0 }}>
// //       <CategoryNav/>
// //       <ProductList />
// //       <PromoBanner/>
  
// //     </div>
// //   );
// // }

// // export default App;

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navigation from './components/Navigation';
// import Home from './pages/Home';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import UserProfile from './pages/UserProfile';
// import Dashboard from './pages/Dashboard';



// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Navigation />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/user-profile/:id?" element={<UserProfile />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;



// import "./App.css";

// function App() {
//   return (
//     <div className="login-page">

//       {/* Mobile app screen */}
//       <div className="mobile-screen">

//         {/* Logo */}
//         <div className="logo-section">

//           <img
//             className="palm-logo"
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSirhznLwawni2ndxJk3b3nIkI06GIAI-7OyIFE9CV3P_HRFWtNQ23ysPM&s=10"
//             alt="Palm plantation"
//           />

//           <h1>PalmVision AI</h1>

//         </div>


//         {/* Login Form */}
//         <div className="login-form">

//           {/* Username */}
//           <div className="input-box">

//             <span className="input-icon">
//               ♙
//             </span>

//             <input
//               type="text"
//               placeholder="user"
//             />

//           </div>


//           {/* Password */}
//           <div className="input-box">

//             <span className="input-icon">
//               ♧
//             </span>

//             <input
//               type="password"
//               placeholder="password"
//             />

//           </div>


//           {/* Login Button */}
//           <button className="login-button">
//             Login
//           </button>

//           <button className="signup-button">
//             Sign Up
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// } 

// export default App;

// import InteractiveButton from './components/InteractiveButton'; 
// import KeyboardDemo from './components/KeyboardDemo';
// import ContactForm from './components/ContactForm';
// import DynamicList from './components/DynamicList';
// import ImageGallery from './components/ImageGallery';
// function App() {
//   return (
//     <div>
//       <h1>Interactive Button Example</h1>
//       <InteractiveButton />
//       <h1>Keyboard Event Demo</h1>
//       <KeyboardDemo />
//       <h1>Contact Form</h1>
//       <ContactForm />
//       <h1>Dynamic List</h1>
//       <DynamicList />
//       <h1>Image Gallery</h1>
//       <ImageGallery />
//     </div>
//   );
// }

// export default App;


// import Dashboard from './components/Dashboard'; 
// function App() {
//   return (
//     <div className="App">
//       <Dashboard />
//     </div>
//   );
// }

// export default App;

import UserManagement from './components/UserManagement';
import NewsAggregator from './components/NewsAggregator';

function App() {
  return (
    <div className="App">
      <UserManagement />
      <NewsAggregator />
    </div>
  );
}

export default App;

