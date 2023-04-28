import ChatPage from "../../components/ChatPage/ChatPage";
import { Routes, Route, Link } from 'react-router-dom';
import './Connections.css';
import Invitations from "../../components/Invitations/Invitations";
import ChatListPage from "../../components/ChatListPage/ChatListPage";
import React, { useState, useEffect, useRef } from "react";
import { myChats } from "../../utilities/chat-api";

export default function Connections({user}) {  
    const [chatOpen, setChatOpen] = useState(false)

    const [chats, setChats] = useState(null);

    const [chatID, setChatID] = useState(null);

    function handleChat(evt) {
      chatOpen ?
        setChatOpen(false)
        :
        setChatOpen(true)
        setChatID(evt.target.value)
        console.log('this', evt.target)
    }

    useEffect(function() {
      async function effectFunction() {
        const chats = await myChats()
        setChats(chats)
      }
      effectFunction()
    }, []);


    console.log('chats', chats)
    return (
      <div className="connections">
        <h1>Connections</h1>
        <div className="connections-links">
            <Link className="connections-link" to="chat/">Chat</Link>
            &nbsp; | &nbsp;
            <Link className="connections-link" to="invitations/">Invitations</Link>
        </div>
        <div className="connections-routes">
          <div className="connections-page">
            <Routes>
              {!chatOpen ?
                <Route path="/chat" element={< ChatListPage chats={chats} user={user} handleChat={handleChat}/>}></Route>
                :
                <Route path="/chat" element={< ChatPage chatID={chatID} user={user} handleChat={handleChat}/>}></Route>
              }
              <Route path="/invitations" element={< Invitations user={user} />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    );
  }