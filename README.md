
<h1 align="center">ChatterBox is a MERN based chatiing web application made with socket.io</h1>


<h3 align="center"><a href="https://chatterbox-o03k.onrender.com/"><strong>Want to see live preview »</strong></a></h3>





![1](./ScreenShots/New_Preview.png)

  <br />
<br />

##  Features
- Login/Signup for Users
- Search Users via name and email
- One on One chat
- Creation of group
- Add people in group
- Remove people from group
- Rename Group
- PWA
  <br />
## Glimpses of ChatterBox:

 <table>
  <tr>
     <td><img src="./ScreenShots/Login.jpg" alt="Login" /></td>
    <td><img src="./ScreenShots/SignUp.jpg" alt="Signup" /></td>
  </tr>
  <tr>
  <td><img src="./ScreenShots/SearchUsers.jpg" alt="Serach_User" /></td>
    <td><img src="./ScreenShots/OwnProfile.jpg" alt="Own_Profile" /></td>
  </tr>
  <tr>
  <td><img src="./ScreenShots/GroupManipulation.jpg" alt="Group_Manipulation" /></td>
    <td><img src="./ScreenShots/CreateGroup.jpg" alt="Create_Group" /></td>
  </tr>
  <tr>
    <td><img src="./ScreenShots/Chatting.jpg" alt="Chatting" /></td>
    <td><img src="./ScreenShots/ChatPage.jpg" alt="ChatPage" /></td>
  </tr>
  <tr>
    <td><img src="./ScreenShots/ErrorPage.png" alt="ErrorPage" /></td>
  </tr>
 </table>

<br />


## ALl Backend Routes:
  - HealthCheck : localhost:3000/api [GET]
  - User Register : localhost:3000/api/user/ [POST]
  - User Login : localhost:3000/api/user/login [POST]
  - Get All Users : localhost:3000/api/user/ [GET]
  - Access Chat : localhost:3000/api/chat/ [POST]
  - Fetch Chat : localhost:3000/api/chat/ [GET]
  - Create Group : localhost:3000/api/chat/group [POST]
  - Rename Group : localhost:3000/api/chat/rename [PUT]
  - Add To Group : localhost:3000/api/chat/groupadd [PUT]
  - Remove From Group : localhost:3000/api/chat/groupremove [PUT]
  - Send Message : localhost:3000/api/message/ [POST]
  - All Messages : localhost:3000/api/message/:chatId [GET]
