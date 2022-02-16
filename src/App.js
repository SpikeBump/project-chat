// import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

import {StreamChat} from 'stream-chat';
import {Chat, Channel, Window, ChannelHeader, ChannelList, MessageInput, MessageList, } from 'stream-chat-react';
import { ChannelInner } from './components/ChannelInner/ChannelInner';
import 'stream-chat-react/dist/css/index.css'; 
import styled from 'styled-components'




//from streamCode
import {
  CreateChannel,
  CustomMessage,
  MessagingChannelList,
  MessagingChannelPreview,
  MessagingInput,
  MessagingThreadHeader,
} from './components';
//
//from streamCode
export const GiphyContext = React.createContext({});
//
//from streamCode
const urlParams = new URLSearchParams(window.location.search);
//
// const path = require('path');
// const express = require('express');
// const app = express();
// const publicPath = path.join(__dirname, '..', 'public');
// app.use(express.static(publicPath));

// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;

// const Container = styled.div`
//  display: flex;
//  .left-column {
//    width: 300px;
//  }
//   rigth-column{
//     flex: 1;
//   }
// `
const API_KEY=process.env.React_APP_STREAM_API_KEY

//from streamCode
const noChannelNameFilter = urlParams.get('no_channel_name_filter') || false; 
const skipNameImageSet = urlParams.get('skip_name_image_set') || false;

const options = { state: true, watch: true, presence: true, limit: 8 };

const sort = {
  last_message_at: -1,
  updated_at: -1,
  cid: 1,
};
 //

const client1 = {
   id:"user1",
   name: "Alpha1",
   image: "https://picsum.photos/id/1003/200/300",
};

const client2 = {
  id:"user2",
  name: "Beta2",
  image: "https://picsum.photos/id/1025/200/300",
};

const client3 = {
  id:"user3",
  name: "Charlie3",
  image: "https://picsum.photos/id/1014/200/300",
};

const client4 = {
  id:"user4",
  name: "Delta4",
  image: "https://picsum.photos/id/1012/200/300",
};

const users = [client1,client2,client3,client4];

const getRandomUser = () => {
 const randomIndex = Math.floor(Math.random() * 1);
 return users[randomIndex];
};

const filters = noChannelNameFilter
  ? { type: 'messaging', members: { $in: [users] } }
  : { type: 'messaging', name: 'Miscellaneous', demo: 'misc' };

function App() {

 const [chatClient, setChatClient] = useState (null);
 const [channel, setChannel] = useState(null); //keep track of channel states
 //from streamCode
 const [giphyState, setGiphyState] = useState(false);
 const [isCreating, setIsCreating] = useState(false);
 const [isMobileNavVisible, setMobileNav] = useState(false);
 const [theme, setTheme] = useState('light');
//

 useEffect(() => {
   async function initChat() {
     const client = StreamChat.getInstance(API_KEY);
    
     const user = getRandomUser()
    
     //get token via API KEY
     client.connectUser(user, client.devToken(user.id))
    
     //create channel
     const channel = client.channel("team", "general", {
       name: "Projectchat",
       image: "https://picsum.photos/id/0/200",
     })
    
     //will create channel if channel isn't created
    await channel.create();
    //add member
    channel.addMembers([user.id]);
    setChannel(channel);

     setChatClient(client);
    }

     initChat();
     

     //clean up function
     //once this component mounts, you disconnect the user
     return() => {
      if(chatClient) chatClient.disconnectUser(); //
     }
 }, {})
  
 const toggleMobile = () => setMobileNav(!isMobileNavVisible);

 const giphyContextValue = { giphyState, setGiphyState };

  if(!chatClient || !channel) return <> <p>loading</p></>

  return (
    <div>
       <Chat client = {chatClient} theme = {"messaging light"}>
         <ChannelList  

                List={(props) => (
                  <MessagingChannelList {...props} onCreateChannel={() => setIsCreating(!isCreating)} />
                )}
                
         />
         <Channel
         Input={MessagingInput}
         maxNumberOfFiles={10}
          Message={CustomMessage}
          multipleUploads={true}
          ThreadHeader={MessagingThreadHeader}
          TypingIndicator={() => null}
         >
           {isCreating && (
            <CreateChannel toggleMobile={toggleMobile} onClose={() => setIsCreating(false)} />
          )}
          <GiphyContext.Provider value={giphyContextValue}>
            <ChannelInner theme={theme} toggleMobile={toggleMobile} />
          </GiphyContext.Provider>
           
      
      
      </Channel>
       </Chat>
       
    </div>
  );
}

export default App;


// {/* <ChannelList theme = {"messaging dark"} /> 
// {/* ChannelList will handle Channels context originally set by channal={channel} */}
// <Channel>
//    <Window>
//      <ChannelHeader />
//      <MessageList />
//      <MessageInput />
//    </Window>
//   </Channel> */}