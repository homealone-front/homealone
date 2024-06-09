import { useNavigate, generatePath, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { Client } from '@stomp/stompjs';
import { useUserStore } from '@/store/useUserStore';
import { Appbar } from '@/components/Appbar';
import { Footer } from '@/components/Footer';
import { Layout } from '@/layout';

interface Message {
  id: number;
  content: string;
  sendDate: string;
  sendTime: string;
  memberId: number;
  chatRoomId: number;
  sender: string | null;
  chatting: string | null;
}


const Chatting = () => {

    const { id } = useParams<{ id: string }>();
    const chatroomId = parseInt(id, 10);

    const [chatroomName, setChatroomName] = useState<string>('');
    const [senderName, setSenderName] = useState<string>('');
    const [receiverName, setReceiverName] = useState<string>('');
    const [memberMessages, setMemberMessages] = useState<Message[]>([]);
    const [senderId, setSenderId] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [currentMemberId, setCurrentMemberId] = useState('');

    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [newMessage, setNewMessage] = useState<string>('');

    const [rightUser, setRightUser] = useState('');
    const [leftUser, setLeftUser] = useState('');


    useEffect(() => {

        const loadChatHistory = async () => {
        axios.get(`http://localhost:8080/api/chatting/${chatroomId}`)
            .then(response => {
                setChatroomName(response.data.chatroomName);
                setSenderName(response.data.senderName);
                setReceiverName(response.data.receiverName);
                setMemberMessages(response.data.messages || []);
                setSenderId(response.data.senderId || null);
                setReceiverId(response.data.receiverId || null);
                setCurrentMemberId(response.data.currentId);
                console.log("채팅방 정보 가져오기 성공");
                console.log("채팅방 제목 : " + response.data.chatroomName);
            })
            .catch(error => console.log("채팅방 정보 가져오기 실패! : " + error));
        };

        if(currentMemberId == senderId) {
            setRightUser(senderName);
            setLeftUser(receiverName);
        } else if (currentMemberId == receiverId) {
            setRightUser(receiverName);
            setLeftUser(senderName);
        }

        loadChatHistory();
        const client = new Client({
            brokerURL : "ws://localhost:8080/ws/websocket",
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe(`/topic/public/${chatroomId}`, (message: IMessage) => {

                });
            },
        });
        client.activate();
        setStompClient(client);
        return () => {
            client.deactivate();
        };
    }, [chatroomId]);

    const sendMessage = () => {
        if(stompClient && newMessage) {
            const chatMessage = {
                memberId: currentMemberId,
                content: newMessage,
                chatroomId: chatroomId,
                type: 'CHAT'
            };
            stompClient.publish({
                destination: `/app/chat-sendMessage/${chatroomId}`,
                body: JSON.stringify(chatMessage),
            });
            console.log(newMessage);
            setNewMessage("");
        }
    };

    const exitChatroom = () => {
        axios.delete(`http://localhost:8080/api/chatting/${chatroomId}`)
            .then()
            .catch(error => console.log("채팅방 나가기 실패! : " + error));
    };

    return (
        <>
            <Appbar />
            <Layout>
                <div>
                    <div className="chatPage" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width : '100%', height: '750px'}} >
                        <div className="chatContainer" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width : '50%', height: '630px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0.1, 0, 0.3, 0.5)', backgroundColor: '#F4FFFF'}}>
                            <div className="chat-title-area" >
                                <div style={{color: '#424242', fontSize: '22px', fontWeight: 'bold', textAlign: 'center', width : '100%', height: '50px', padding : '5px', borderRadius: '10px', backgroundColor: '#F4FFFF', color: '#988DB3'}}>{chatroomName}</div>
                                <div className="name-area" style={{display: 'flex', width: '100%', height: '30px', textAlign: 'center', fontWeight: 'bold', color: '#988DB3'}}>
                                    <div style={{flex: '1'}}>{leftUser}</div>
                                    <div style={{flex: '8'}}></div>
                                    <div style={{flex: '1'}}>{rightUser}</div>
                                </div>
                            </div>

                            <div className="chat-message-page" style={{width : '100%', height: '500px', backgroundColor: '#E0EBFF'}}>
                                <div className="message-area" style={{ height: '500px', overflowY: 'auto' }}>
                                    {(memberMessages || []).map((message) => (

                                        <div key={message.id}
                                           style={{display: 'flex', padding: '5px'}}
                                        >
                                            <div style={{marginLeft: '10px',
                                                    marginLeft: message.memberId === currentMemberId ? 'auto' : '0',
                                                    marginRight: message.memberId === currentMemberId ? '0' : 'auto'}} >
                                                <div style={{padding : '10px', fontSize: '14px', color:'#000000', backgroundColor : '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px'}} >{message.content}</div>
                                                <div style={{fontSize: '10px'}} >{message.sendTime}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <form className="message-form" style={{borderTop: '1px solid #c0c0c0', display: 'flex', alignItems: 'center', justifyContent: 'center', width : '100%', height : '50px'}}>
                                <div className="form-group" style={{width : '100%'}}>
                                    <div className="input-group" style={{display: 'flex', width : '100%'}}>
                                        <input type="text"
                                               placeholder="Type a message..."
                                               value={newMessage}
                                               autoComplete="off"
                                               className="form-control"
                                               style={{flex: '8', marginLeft: '10px'}}
                                               onChange={(e) => setNewMessage(e.target.value)}
                                        />
                                        <button
                                               type="submit"
                                               className="sendBtn"
                                               style={{margin: '10px', flex: '2', border: '1px solid #c0c0c0', borderRadius: '10px', backgroundColor: '#FFFFFF'}}
                                               onClick={sendMessage}>
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="chatroom-exit-area" style={{marginTop: "20px", display: 'flex'}}>
                            <div type="button"
                                 style={{cursor: 'pointer', height: '30px', width: '150px', border: '1px solid #c0c0c0', borderRadius: '10px', textAlign: 'center', alignItems: 'center', backgroundColor: '#708090', color: '#FFFFFF', fontWeight: 'bold' }}
                                 onClick={exitChatroom}>대화 종료</div>
                        </div>
                    </div>

                </div>
            </Layout>
            <Footer />
        </>
    );
};

export default Chatting;
